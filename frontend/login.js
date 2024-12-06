document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Simple username and password check
    if (username === 'admin' && password === 'password') {
        // Set loggedIn status in local storage
        localStorage.setItem('loggedIn', 'true');
        // Redirect to main page
        window.location.href = 'main.html';
    } else {
        message.textContent = 'Invalid username or password.';
        message.style.color = 'red';
    }
});