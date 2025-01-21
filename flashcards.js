// Fade-in effect for flashcards on scroll
document.addEventListener("DOMContentLoaded", () => {
    const flashcards = document.querySelectorAll('.flashcard');
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1'; // Fade in
                observer.unobserve(entry.target); // Stop observing once faded in
            }
        });
    }, options);

    flashcards.forEach(flashcard => {
        observer.observe(flashcard);
    });
});
