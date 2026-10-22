const questions = [
    {
        question: "Which is used to declare a constant?",
        answer: [
            { text: "let", correct: false },
            { text: "var", correct: false },
            { text: "const", correct: true },
            { text: "static", correct: false }
        ],
    },

    {
        question: "Which keyword is used to declare a variable that can be reassigned?",
        answer: [
            { text: "const", correct: false },
            { text: "let", correct: true },
            { text: "static", correct: false },
            { text: "fixed", correct: false }
        ],
    },

    {
        question: "Which method displays a message in the browser console?",
        answer: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "display()", correct: false },
            { text: "show()", correct: false }
        ],
    },

    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answer: [
            { text: "<!--", correct: false },
            { text: "//", correct: true },
            { text: "**", correct: false },
            { text: "##", correct: false }
        ],
    },

    {
        question: "Which method adds an element to the end of an array?",
        answer: [
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "push()", correct: true },
            { text: "unshift()", correct: false }
        ],
    },

    {
        question: "Which operator compares both value and data type?",
        answer: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ],
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
        button.dataset.correct = ans.correct;

        button.addEventListener("click", selectAnswer);

        answersBtn.appendChild(button);
    });

    if (currIndex === questions.length - 1) {
        nextButton.textContent = "Show Results";
    } else {
        nextButton.textContent = "Next";
    }

    nextButton.disabled = true;
}

function selectAnswer(e) {
    const selectedButton = e.currentTarget;
    const isCorrect = selectedButton.dataset.correct === "true";

    userAnswers[currIndex] = selectedButton.textContent;

    if (isCorrect) {
        selectedButton.classList.add("selected");
        score++;
    } else {
        selectedButton.classList.add("selected");
    }

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
    scoreTitle.textContent = `Your Score: ${score} out of ${questions.length}`;
    results.appendChild(scoreTitle);

    



    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("restart-btn");

    restartButton.addEventListener("click", startQuiz);

    results.appendChild(restartButton);
}



startQuiz();
