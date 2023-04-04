// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data for quiz questions
const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: ["Paris", "Madrid", "Berlin", "London"],
        answer: "Paris"
    },
    {
        id: 2,
        question: "What is the largest country in the world by area?",
        options: ["Russia", "China", "United States", "Canada"],
        answer: "Russia"
    },
    {
        id: 3,
        question: "What is the tallest mammal?",
        options: ["Elephant", "Giraffe", "Horse", "Rhino"],
        answer: "Giraffe"
    }
];

// GET route for getting quiz questions
app.get('/api/questions', (req, res) => {
    res.send(questions);
});

// POST route for submitting quiz answers
app.post('/api/submit', (req, res) => {
    const answers = req.body.answers;
    let score = 0;

    questions.forEach(question => {
        const answer = answers[question.id];
        if (answer === question.answer) {
            score++;
        }
    });

    res.send({ score });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
