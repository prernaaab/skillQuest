const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // For making HTTP requests to the Groq API
const app = express();
const PORT = 3000;


// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files

// Helper function to read JSON file
function readJSONFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return filePath.includes('users.json') ? [] : { level: 0 }; // Initialize structure
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : { level: 0 };
}

// Helper function to write to JSON file
function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8'); // Pretty print
}

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/games.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'games.html'));
});

app.get('/flashcards.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'flashcards.html'));
});

app.get('/challenges.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'challenges.html'));
});

// Handle Signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Read existing users from the file
    let users = readJSONFile('users.json');

    // Check if user already exists
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.send('Username already exists. Try a different one.');
    }

    // Add new user
    users.push({ username, password });
    writeJSONFile('users.json', users);

    res.send('Signup successful! You can now <a href="/">login</a>.');
});

// Handle Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read users from the file
    const users = readJSONFile('users.json');

    // Validate user credentials
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.send(`Login successful! Welcome ${username}.`);
    } else {
        res.send('Invalid credentials. Try again.');
    }
});

// Route to get user progress
app.get('/api/progress', (req, res) => {
    try {
        const progressData = readJSONFile('progress.json');
        res.json(progressData);
    } catch (error) {
        console.error('Error reading progress data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update progress
app.post('/api/progress', (req, res) => {
    try {
        const { level } = req.body;

        // Load existing progress or create new
        let progressData = readJSONFile('progress.json');

        // Update the level if the new level is higher
        if (level > progressData.level) {
            progressData.level = level;
        }

        // Save the updated progress
        writeJSONFile('progress.json', progressData);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle fetching users
app.get('/api/users', (req, res) => {
    try {
        const userData = readJSONFile('users.json');
        res.json(userData);
    } catch (error) {
        console.error('Error reading user data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Groq Cloud API Key (replace with your actual key)
const GROQ_API_KEY = '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';

// API Route to evaluate answers using Groq Cloud
// Evaluate the user's input based on the level
app.post('/api/evaluate', (req, res) => {
    const { code, level } = req.body;
    let correct = false;

    switch (level) {
        case 1:
            if (code.trim() === '5') correct = true; // Example: x = 5
            break;
        case 2:
            if (code.trim() === 'float') correct = true; // Example: 12.34 is a float
            break;
        case 3:
            if (code.trim() === '0\n1\n2') correct = true; // Output for range(3)
            break;
        case 4:
            if (code.trim() === 'len') correct = true; // Correct function is len()
            break;
        case 5:
            if (code.trim() === '10 == 10') correct = true; // True statement
            break;
        case 6:
            if (code.trim() === '[1, 2, 3]' || code.trim() === '[1,2,3]') correct = true; // List of integers
            break;
        default:
            correct = false;
    }

    res.json({ correct });
});

// Listen to the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
