// Open popup based on type ('login' or 'signup')
function openPopup(type) {
    const loginPopup = document.getElementById('login-popup');
    const signupPopup = document.getElementById('signup-popup');

    if (type === 'login') {
        loginPopup.style.display = 'flex';  // Show login popup
        signupPopup.style.display = 'none'; // Hide signup popup
    } else if (type === 'signup') {
        signupPopup.style.display = 'flex'; // Show signup popup
        loginPopup.style.display = 'none';  // Hide login popup
    }
}

// Close popup
function closePopup() {
    const loginPopup = document.getElementById('login-popup');
    const signupPopup = document.getElementById('signup-popup');

    loginPopup.style.display = 'none';
    signupPopup.style.display = 'none';
}

// Switch between login and signup forms
function switchForm(type) {
    openPopup(type);
}

// Close popup when clicking outside of it
window.onclick = function(event) {
    const loginPopup = document.getElementById('login-popup');
    const signupPopup = document.getElementById('signup-popup');
    
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none';
    } else if (event.target === signupPopup) {
        signupPopup.style.display = 'none';
    }
}
