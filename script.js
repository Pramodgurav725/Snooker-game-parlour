document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get input values
    const emailOrUsername = document.getElementById("login-username-email").value;
    const password = document.getElementById("login-passwd").value;

    // Basic validation for email/username and password
    if ((validateEmail(emailOrUsername) || validateUsername(emailOrUsername)) && validatePassword(password)) {
        // Perform the login logic, such as sending data to a server or proceeding with a local login
        alert("Login successful!");

        // Redirect to the game page
        window.location.href = "game.html";
    } else {
        alert("Please enter a valid email/username and password.");
    }
});

// Simple email validation function
function validateEmail(input) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(input).toLowerCase());
}

// Simple username validation function
function validateUsername(input) {
    // Example: Username should be at least 3 characters long and only contain letters and numbers
    const re = /^[a-zA-Z0-9]{3,}$/;
    return re.test(String(input));
}

// Simple password validation function
function validatePassword(password) {
    // Example: Password should be at least 6 characters long
    return password.length >= 6;
}