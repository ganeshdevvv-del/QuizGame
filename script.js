
const questions = [
    {
        question: "Which is used to declare a constant?",
        answer: [
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "const", correct: true },
            { text: "static", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable that can be reassigned?",
        answer: [
            { text: "const", correct: false },
            { text: "let", correct: true },
            { text: "static", correct: false },
            { text: "fixed", correct: false }
        ]
    },
    {
        question: "Which method displays a message in the browser console?",
        answer: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "display()", correct: false },
            { text: "show()", correct: false }
        ]
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answer: [
            { text: "<!--", correct: false },
            { text: "//", correct: true },
            { text: "**", correct: false },
            { text: "##", correct: false }
        ]
    },
    {
        question: "Which method adds an element to the end of an array?",
        answer: [
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "push()", correct: true },
            { text: "unshift()", correct: false }
        ]
    },
    {
        question: "Which operator compares both value and data type?",
        answer: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    }
];

const quizContainer = document.getElementById("quiz-continer");
const questionElement = document.getElementById("question");
const answersBtn = document.getElementById("answers");
const nextButton = document.getElementById("nxt-btn");
const results = document.getElementById("results");

let currIndex = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
    currIndex = 0;
    score = 0;
    userAnswers = [];

    quizContainer.style.display = "block";
    results.replaceChildren();

    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currIndex];

    questionElement.textContent =
        `${currIndex + 1}. ${currentQuestion.question}`;

    answersBtn.replaceChildren();

    currentQuestion.answer.forEach(function (ans) {
        const button = document.createElement("button");

        button.textContent = ans.text;
        button.classList.add("btn");

        button.addEventListener("click", function () {
            selectAnswer(button, ans);
        });

        answersBtn.appendChild(button);
    });

    nextButton.textContent =
        currIndex === questions.length - 1
            ? "Show Results"
            : "Next";

    nextButton.disabled = true;
}

function selectAnswer(selectedButton, selectedAnswer) {
    userAnswers[currIndex] = selectedAnswer.text;

    if (selectedAnswer.correct) {
        score++;
    }

    selectedButton.classList.add("selected");

    Array.from(answersBtn.children).forEach(function (button) {
        button.disabled = true;
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
    if (nextButton.disabled) {
        return;
    }

    currIndex++;

    if (currIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.style.display = "none";
    results.replaceChildren();

    const scoreTitle = document.createElement("h2");
    scoreTitle.textContent =
        `Your Score: ${score} out of ${questions.length}`;

    results.appendChild(scoreTitle);

    const reviewTitle = document.createElement("h3");
    reviewTitle.textContent = "Answer Review";
    results.appendChild(reviewTitle);

    questions.forEach(function (question, index) {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const questionTitle = document.createElement("h4");
        questionTitle.textContent =
            `${index + 1}. ${question.question}`;

        reviewCard.appendChild(questionTitle);

        const selectedAnswer = userAnswers[index];

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent =
            `Your Answer: ${selectedAnswer ?? "Not answered"}`;

        if (
            question.answer.some(function (answer) {
                return answer.text === selectedAnswer && answer.correct;
            })
        ) {
            yourAnswer.classList.add("answer-correct");
        } else {
            yourAnswer.classList.add("answer-incorrect");
        }

        reviewCard.appendChild(yourAnswer);

        const correctAnswer = question.answer.find(function (answer) {
            return answer.correct;
        });

        const correctText = document.createElement("p");
        correctText.textContent =
            `Correct Answer: ${correctAnswer.text}`;
        correctText.classList.add("answer-correct");

        reviewCard.appendChild(correctText);

        results.appendChild(reviewCard);
    });

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("restart-btn");

    restartButton.addEventListener("click", startQuiz);

    results.appendChild(restartButton);
}

startQuiz();
