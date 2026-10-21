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
        question: "Which method is used to display a message in the browser console?",
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
        question: "Which method is used to add an element to the end of an array?",
        answer: [
            { text: "pop()", correct: false },
            { text: "shift()", correct: false },
            { text: "push()", correct: true },
            { text: "unshift()", correct: false }
        ]
    },
    {
        question: "Which operator is used to compare both value and data type?",
        answer: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false }
        ]
    }
];
const questionElement =document.getElementById("question");
const answersBtn =document.getElementById("answers");
const nextButton =document.getElementById("nxt-btn");

let currIndex =0;
let score =0;
nextButton.disabled =true;

function startQuiz(){
    currIndex=0;
    score=0;
    console.log(nextButton);
    nextButton.textContent ="Next";
    showQuestion();
}

function showQuestion(){
    const currentQuestion = questions[currIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.answer.forEach((ans)=>{
        console.log(ans);
        const button = document.createElement("button");
        button.textContent = ans.text;
        button.classList.add("btn");
        answersBtn.appendChild(button);

        if(ans.correct === true){
            button.dataset.correct = ans.correct;
        }
        button.addEventListener("click",selectAnswer)
    })  
}

function selectAnswer(e){
    const selectbtn =e.target.dataset.correct==="true";
    if(selectbtn){
        score++;
    }
    Array.from(answersBtn.children).forEach(btn =>{
        const isCorrect = btn.dataset.correct;
        if(isCorrect){
            btn.classList.add("correct");
        }
        else{
            btn.classList.add("incorrect");
            btn.disabled = true;
        }
    })
    nextButton.disabled = false;
}

nextButton.addEventListener("click",()=>{
    currIndex++;
    reset();
    if(currIndex < questions.length){
        showQuestion();
    }
    else{
        reset();
        questionElement.textContent=`Score : ${score} out of ${questions.length}`
    }
})

function reset(){
    nextButton.disabled = true;
    while(answersBtn.firstChild){
        answersBtn.removeChild(answersBtn.firstChild);
    }
}

startQuiz();