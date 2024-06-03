document.addEventListener("DOMContentLoaded", function() {
    const userList = document.getElementById('user-list');
    const photoList = document.getElementById('photo-list');

    if (userList) {
        fetch('user.json')
            .then(response => response.json())
            .then(users => {
                users.forEach(user => {
                    const userCard = document.createElement('div');
                    userCard.className = 'col-md-4';

                    userCard.innerHTML = `
                        <div class="fh5co-blog animate-box">
                            <a href="#" class="blog-bg" style="background-image: url(images/logo.png);"></a>
                            <div class="blog-text">
                                <h3>${user.name}</h3>
                                <p><strong>Email:</strong> ${user.email}</p>
                                <p><strong>Phone:</strong> ${user.phone}</p>
                                <p><strong>Website:</strong> ${user.website}</p>
                                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                            </div>
                        </div>
                    `;

                    userList.appendChild(userCard);
                });
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                userList.innerHTML = '<p>Error loading user data.</p>';
            });
    }

    if (photoList) {
        fetch('photos.json')  // Replace this with the correct path to your JSON file if necessary
            .then(response => response.json())
            .then(photos => {
                photos.forEach(photo => {
                    const photoCard = document.createElement('div');
                    photoCard.className = 'col-md-4';

                    photoCard.innerHTML = `
                        <div class="fh5co-blog animate-box">
                            <a href="${photo.url}" class="blog-bg" style="background-image: url(${photo.thumbnailUrl});"></a>
                            <div class="blog-text">
                                <h3>${photo.title}</h3>
                            </div>
                        </div>
                    `;

                    photoList.appendChild(photoCard);
                });
            })
            .catch(error => {
                console.error('Error fetching photo data:', error);
                photoList.innerHTML = '<p>Error loading photo data.</p>';
            });
    }
});
