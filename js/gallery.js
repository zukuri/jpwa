document.addEventListener("DOMContentLoaded", function() {
    const photoGallery = document.getElementById('photo-gallery');

    fetch('photos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(photos => {
            if (photos.length === 0) {
                photoGallery.innerHTML = '<p>No photos found.</p>';
                return;
            }
            
            // Group photos by albumId
            const albums = {};
            photos.forEach(photo => {
                if (!albums[photo.albumId]) {
                    albums[photo.albumId] = [];
                }
                albums[photo.albumId].push(photo);
            });

            // Create album divs
            for (const albumId in albums) {
                const albumDiv = document.createElement('div');
                albumDiv.className = 'album';
                albumDiv.dataset.albumId = albumId;
                albumDiv.innerHTML = `<h3>Album ${albumId}</h3>`;
                photoGallery.appendChild(albumDiv);
            }

            // Add event listener to each album
            const albumDivs = document.querySelectorAll('.album');
            albumDivs.forEach(albumDiv => {
                albumDiv.addEventListener('click', function() {
                    const albumId = this.dataset.albumId;
                    const albumPhotos = albums[albumId];
                    renderAlbumPhotos(albumPhotos);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching photo data:', error);
            photoGallery.innerHTML = '<p>Error loading photo data.</p>';
        });

    function renderAlbumPhotos(photos) {
        photoGallery.innerHTML = ''; // Clear previous content
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'col-md-4';
            photoCard.innerHTML = `
                <div class="fh5co-blog animate-box">
                    <a href="${photo.url}" target="_blank" class="blog-bg" style="background-image: url(${photo.thumbnailUrl});"></a>
                    <div class="blog-text">
                        <h3>${photo.title}</h3>
                    </div>
                </div>
            `;
            photoGallery.appendChild(photoCard);
        });
    }
});
