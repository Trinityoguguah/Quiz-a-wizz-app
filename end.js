const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById("finalScore") 
const mostRecentScore = localStorage.getItem("mostRecentScore");
const timeLeft = document.getElementById("Time");

const highScores =  JSON.parse(localStorage.getItem("highScores")) || [];

const  MAX_HIGH_SCORES = 5;

let startTime; 
startTime = Date.now();
finalScore.innerText = mostRecentScore;


username.addEventListener('keyup' , ()=> {
    saveScoreBtn.disabled = !username.value;
});


saveHighScore = e => {
    console.log("clicked the save button")
    e.preventDefault(); 

    const endTime = Date.now(); 
    const timeTaken = (endTime - startTime) / 1000; 

    const score = {
        score: mostRecentScore,
        name: username.value,
        time: timeTaken 
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);   
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores)); 
    window.location.assign("/"); 


    timeLeft.innerText = `Time taken: ${timeTaken.toFixed(2)} seconds`;
};