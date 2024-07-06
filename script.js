const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        answers: ["China", "Japan", "Thailand", "India"],
        correct: "Japan"
    },
    {
        question: "What is the largest desert in the world?",
        answers: ["Sahara", "Arabian", "Gobi", "Kalahari"],
        correct: "Sahara"
    },
    {
        question: "Which landmark is known as the 'Pearl of the Indian Ocean'?",
        answers: ["Maldives", "Mauritius", "Seychelles", "Sri Lanka"],
        correct: "Sri Lanka"
    },
    {
        question: "Which country has the most UNESCO World Heritage Sites?",
        answers: ["China", "Italy", "India", "Spain"],
        correct: "Italy"
    },
    {
        question: "What is the official language of Brazil?",
        answers: ["Spanish", "Portuguese", "English", "French"],
        correct: "Portuguese"
    },
    {
        question: "Which city is famous for its carnival held before Lent?",
        answers: ["Rio de Janeiro", "Venice", "New Orleans", "Nice"],
        correct: "Rio de Janeiro"
    },
    {
        question: "What is the currency of Switzerland?",
        answers: ["Euro", "Franc", "Pound", "Dollar"],
        correct: "Sri Lanka"
    },
];
let currentQuestionIndex = 0;
let userAnswers = [];

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');

    questionContainer.innerHTML = `<h5>${quizQuestions[currentQuestionIndex].question}</h5>`;
    answersContainer.innerHTML = '';
    quizQuestions[currentQuestionIndex].answers.forEach(answer => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('form-check');
        answerElement.innerHTML = `
            <input class="form-check-input" type="radio" name="answer" value="${answer}" id="${answer}">
            <label class="form-check-label" for="${answer}">${answer}</label>
        `;
        answersContainer.appendChild(answerElement);
    });

    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function calculateScore() {
    let score = 0;
    quizQuestions.forEach((question, index) => {
        if (question.correct === userAnswers[index]) {
            score++;
        }
    });
    return score;
}

function showResults() {
    const score = calculateScore();
    const resultMessage = document.getElementById('result-message');
    resultMessage.innerHTML = `You scored ${score} out of ${quizQuestions.length}.`;
    $('#resultModal').modal('show');
}

document.getElementById('next-btn').addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        }
    } else {
        alert('Please select an answer before proceeding.');
    }
});

document.getElementById('submit-btn').addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        showResults();
    } else {
        alert('Please select an answer before submitting.');
    }
});

window.onload = loadQuestion;
document.getElementById('feedback-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('All fields are required.');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If form is valid, show toast message
    $('#submission-toast').toast('show');

    // Clear form fields
    document.getElementById('feedback-form').reset();
});
