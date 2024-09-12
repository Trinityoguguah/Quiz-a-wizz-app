const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const  scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull'); 
const  timer = document.getElementById('time')

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avialiableQuestions = [];
let timeLeft = 60;
let questions = [
    {
        question: "Inside which HTML element do we put the Javascript File ??",
        choice1: "<srcipt>",  
        choice2: "<Javasrcipt>",  
        choice3: "<js>"  ,
        choice4: "<srcipting>",
        answer: 1
    },
    {
        question: "Who is The Father of Computer??",
        choice1: "Mark Zuckerberg",  
        choice2: "Blaise Pascal",  
        choice3: "Gotfried willheim Lebniz"  ,
        choice4: "Charles Babbage",
        answer: 4
    },
    {
        question: "What is Full Meaning of RAM??",
        choice1: "Read-Allow-Memory",  
        choice2: "Random-Access-Memory",  
        choice3: "Random-Access-Memornadum" ,
        choice4: "Rice-And-MeatMemory",
        answer: 2
    },
    {
        question: " How do you write 'Hello World' in an alert Box??",
        choice1: "msgbox('Hello world');",  
        choice2: "alertBox('Hello World');",  
        choice3: "alert('Hello World');",
        choice4: "allert('Hello World');",
        answer: 3
    },   
    {
        question: " What is Mr Adedoyin's Full Name??",
        choice1: " Oguniyi Adedoyin",  
        choice2: " Oseni Adedoyin",  
        choice3: "Slyvester Adedoyin",
        choice4: "Soladele Adedoyin",
        answer: 2
    },
]

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0;
    score = 0;
    avialiableQuestions =[...questions];
    timeLeft = 0; 
    startTime = Date.now(); 
    timer.innerText = `${timeLeft}s`;
    getNewQuestion();
    startTimer();
};


startTimer = () => {
    setInterval(() => {
    const currentTime = Date.now();        
    const timeElapsed = (currentTime - startTime) / 1000; 
    timeLeft = 60 - timeElapsed; 
        if (timeLeft <= 0) {
            localStorage.setItem("mostRecentScore", score);
            localStorage.setItem("timeLeft", timeLeft); 
            window.location.assign("/end.html");
        }
        timer.innerText = ` ${timeElapsed.toFixed(0)}s`;
    }, 1000); 
};


getNewQuestion= () => {
    if(avialiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
        localStorage.setItem("mostRecentScore", score); 

        return window.location.assign("/end.html"); 
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

   
   progressBarFull.style.width = `${( questionCounter / MAX_QUESTIONS) * 100} % `;

    const questionIndex = Math.floor(Math.random() * avialiableQuestions.length);
    currentQuestion = avialiableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
      });
    
    avialiableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener( "click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnwswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnwswer == currentQuestion.answer ? "correct"  :  "incorrect";

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply);  
         

        setTimeout( ()=> {
            selectedChoice.parentElement.classList.remove(classToApply);  
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score +=num ;
    scoreText.innerText = score;
};

startGame();
