// Quiz.js

import React, { Component } from 'react';
import axios from 'axios';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            answers: {}
        };
    }

    componentDidMount() {
        // Fetch quiz questions from server
        axios.get('/api/questions')
            .then(res => {
                this.setState({
                    questions: res.data.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    handleAnswerChange = (questionId, answer) => {
        this.setState({
            answers: {
                ...this.state.answers,
                [questionId]: answer
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // Submit quiz answers to server
        axios.post('/api/submit', { answers: this.state.answers })
            .then(res => {
                alert(`Your score is ${res.data.score}`);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { questions } = this.state;

        return (
            <div>
                <h1>Quiz</h1>
                <form onSubmit={this.handleSubmit}>
                    {Object.values(questions).map(question => (
                        <div key={question.id}>
                            <h3>{question.question}</h3>
                            {question.options.map(option => (
                                <div key={option}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`question-${question.id}`}
                                            value={option}
                                            onChange={() => this.handleAnswerChange(question.id, option)}
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default Quiz;