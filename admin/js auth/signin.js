document.addEventListener('DOMContentLoaded', function () {
    // Login form click event listener
    const loginForm = document.getElementById('loginButton1');
    loginForm.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Reset previous error messages
        // resetErrors();

        // Collect login form data
        const loginEmail = document.getElementById('user').value.trim();
        const loginPassword = document.getElementById('password').value.trim();

        // Validate input fields
        if (!loginEmail || !isValidEmail(loginEmail)) {
            alert('Please enter a valid email address.');
            if (!loginPassword) {
                alert('Please enter your password.');
                return;
            }
            return;
        }

        if (!loginPassword) {
            alert('Please enter your password.');
            if (!loginEmail || !isValidEmail(loginEmail)) {
                alert('Please enter a valid email address.');
                return;
            }
            return;
        }
        

        fetch('https://nysc-api.willerssolutions.com/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Include credentials such as cookies or authorization headers
            body: JSON.stringify({ email: loginEmail, password: loginPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('auth', 'true');
                window.location.href = data.dashboard;
            } else {
                showError('customerPasswodInput', 'Invalid email or password.');
            }
        })
        .catch(error => console.error('Error:', error));

    });

});

// Utility function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
