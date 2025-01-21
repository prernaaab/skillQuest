// Load username and other profile details dynamically (if needed)
window.onload = function() {
    const username = localStorage.getItem('username') || 'Player One'; // You can set this dynamically
    document.getElementById('username').innerText = username;
};

// Animation for badges hover effect
document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('mouseover', () => {
        badge.classList.add('animated');
    });

    badge.addEventListener('mouseout', () => {
        badge.classList.remove('animated');
    });
});
