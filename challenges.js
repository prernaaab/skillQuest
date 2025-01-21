// Sample Game Data for Levels 1 to 6
const games = [
    {
        question: "Level 1: What is the correct syntax to output 'Hello World' in Python?",
        options: [
            "print('Hello World')",
            "echo('Hello World')",
            "console.log('Hello World')"
        ],
        answer: "print('Hello World')"
    },
    {
        question: "Level 2: How do you create a variable with the numeric value 5?",
        options: [
            "x = 5",
            "5 = x",
            "x := 5"
        ],
        answer: "x = 5"
    },
    {
        question: "Level 3: What is the output of the following code: x = [1, 2, 3]; print(x[1])?",
        options: [
            "1",
            "2",
            "3"
        ],
        answer: "2"
    },
    {
        question: "Level 4: Which of the following is a valid way to create a function in Python?",
        options: [
            "def myFunction():",
            "function myFunction() {}",
            "create myFunction()"
        ],
        answer: "def myFunction():"
    },
    {
        question: "Level 5: What will be the output of this code: print(type(3.14))?",
        options: [
            "<class 'int'>",
            "<class 'float'>",
            "<class 'str'>"
        ],
        answer: "float"
    },
    {
        question: "Level 6: Which of the following keywords is used to handle exceptions in Python?",
        options: [
            "try",
            "catch",
            "exception"
        ],
        answer: "try"
    }
];

// Function to render the game level
function renderGame(level) {
    const gameContent = document.getElementById("game-content");

    // Clear previous content for animation effect
    gameContent.innerHTML = '';
    gameContent.classList.remove('fade-in'); // Remove fade-in class for reset
    void gameContent.offsetWidth; // Trigger reflow to restart the animation
    gameContent.classList.add('fade-in'); // Add fade-in class

    if (level < games.length) {
        gameContent.innerHTML = `
            <h2>${games[level].question}</h2>
            <input type="text" id="user-answer" placeholder="Type your answer here...">
            <button id="submit-answer">Submit Answer</button>
            <div id="feedback"></div>
        `;

        // Handle answer submission
        document.getElementById("submit-answer").addEventListener("click", () => {
            const userAnswer = document.getElementById("user-answer").value.trim();
            const feedback = document.getElementById("feedback");
            feedback.classList.remove('fade-in'); // Remove fade-in class for reset
            void feedback.offsetWidth; // Trigger reflow to restart the animation
            
            if (userAnswer === games[level].answer) {
                feedback.innerText = "Correct!";
                feedback.classList.add('fade-in'); // Add fade-in class for effect
                // Move to next level after a delay
                setTimeout(() => {
                    renderGame(level + 1);
                }, 1000);
            } else {
                feedback.innerText = "Incorrect. Try again.";
                feedback.classList.add('fade-in'); // Add fade-in class for effect
            }
        });
    } else {
        gameContent.innerHTML = `
            <div id="completion-message" class="fade-in">
                <h2>Congratulations! You've completed all levels!</h2>
                <button id="resume-button">View my Gamer's Resume</button>
            </div>
        `;

        // Redirect to profile.html on button click
        document.getElementById("resume-button").addEventListener("click", () => {
            window.location.href = "profile.html"; // Change this to the actual path of your profile page
        });
    }
}

// Start the game immediately
renderGame(0);
