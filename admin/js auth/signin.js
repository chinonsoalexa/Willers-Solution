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
        

        fetch('https://willers-solutions-backend.onrender.com/sign-in', {
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

    // Reset password form click event listener
    // const resetForm = document.getElementById('resetButton');
    // resetForm.addEventListener('click', function (event) {
    //     event.preventDefault(); // Prevent the form from submitting traditionally

    //     // Reset previous error messages
    //     resetErrors();

    //     // Collect reset password form data
    //     const resetEmail = document.getElementById('user-9eb6130').value.trim();

    //     // Validate input fields
    //     if (!resetEmail || !isValidEmail(resetEmail)) {
    //         showError('customerEmailRegisterInput', 'Please enter a valid email address.');
    //         return;
    //     }

    //     // Perform the reset password action (e.g., send a request to your server)
    //     console.log('Reset Password Data:', { email: resetEmail });

    //     fetch('https://willers-solutions-backend.onrender.com/forgotten-password-email', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'include', // Include credentials such as cookies or authorization headers
    //         body: JSON.stringify({ Email: resetEmail })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.success) {
    //             swal("Email sent successfully", {
    //                 icon: "success",
    //                 buttons: {
    //                     confirm: true,
    //                 },
    //                 }).then(() => {
                    
    //                 });
    //         } else {
    //             showError('customerEmailRegisterInput', 'Invalid email');
    //         }
    //     })
    //     .catch(error => console.error('Error:', error));
    // });
});

// Utility function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to show error messages
// function showError(fieldId, message) {
//     const field = document.getElementById(fieldId);
//     field.style.borderColor = "red"; // Highlight the field in red

//     // Create or update the error message element
//     let errorElement = field.nextElementSibling;
//     if (!errorElement || !errorElement.classList.contains('error-message')) {
//         errorElement = document.createElement("div");
//         errorElement.className = "error-message";
//         errorElement.style.color = "red";
//         errorElement.style.marginTop = "5px";
//         field.parentNode.insertBefore(errorElement, field.nextSibling);
//     }
//     errorElement.innerText = message;
// }

// // Utility function to reset error messages
// function resetErrors() {
//     const errorFields = document.querySelectorAll('.form-control');
//     errorFields.forEach(function(field) {
//         field.style.borderColor = ""; // Reset border color to default
//         const errorElement = field.nextElementSibling;
//         if (errorElement && errorElement.classList.contains('error-message')) {
//             errorElement.remove(); // Remove the error message element
//         }
//     });
// }
