let answer = 0
let GuessCount = 0
let totalwin = 0
let totalGuess = 0
let range = 3
let scores = []
let playname = prompt("input your name")
//player name 
playname = playname.charAt(0).toUpperCase() + playname.slice(1);
//Select Level
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level")
    for (let i=0;i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value)
        }
    }
    answer = Math.floor(Math.random() * range)+1;

    document.getElementById("msg").textContent = playname + ", guess a number between 1 and "+ range
    document.getElementById("guess").value = 0
    document.getElementById("guessBtn").disabled = false
    document.getElementById("giveUpBtn").disabled = false
    document.getElementById("playBtn").disabled = true

    let levelRadios = document.getElementsByName("level")
    for (let i=0;i < levelRadios.length; i++){
        levelRadios[i].disabled = true
    }
})
//guess part
document.getElementById("guessBtn").addEventListener("click", function guess(){
    let input = document.getElementById("guess").value
    let guess = parseInt(input)
    let temp = ""
    //if it's a number in range
    if (guess < 1 || guess > range || isNaN(guess)) {
    document.getElementById("msg").textContent = "Pls give a number between 1 and "+range;
    document.getElementById("guess").value = ""
    return;
    }
    GuessCount++;

    //judge part 
    while (guess != answer) {
        totalGuess++;
        if(Math.abs(guess - answer) <= 2){
            temp = "hot"
        }else if(Math.abs(guess - answer) <= 5){
            temp = "warm"
        }else{
            temp = "cold"
        }
        if (guess > answer) {
        document.getElementById("msg").textContent = "high but it's "+temp;
        } else {
        document.getElementById("msg").textContent = "low but it's "+temp;
        }
        return;
    }    
    document.getElementById("msg").textContent = "Correct,you win this game in "+totalGuess+" tries.";
    document.getElementById("guessBtn").disabled = true

    updateScore(totalGuess)
})

//reset part
    document.getElementById("giveUpBtn").addEventListener("click", function reset(){
            document.getElementById("msg").textContent = "GG"
        let radios = document.getElementsByName("level")
        for (let i=0;i < radios.length; i++){
        radios[i].disabled = false}
        document.getElementById("guessBtn").disabled = true
        document.getElementById("giveUpBtn").disabled = true
        document.getElementById("playBtn").disabled = false
})

function updateScore(score){
    totalGuess += score;
    totalwin++;
    document.getElementById("wins").textContent = "Total wins: "+ totalwin
    document.getElementById("avgScore").textContent = "Average Score: "+ (totalGuess/totalwin).toFixed(1)
    //leader board
    scores.push(score)
    scores.sort(function(a,b){return a-b})

    let leaderboard = document.getElementsByName("leaderboard")
    for (let i=0;i < leaderboard.length; i++){
        if (i < scores.length){
        leaderboard[i].textContent = scores[i]
        }else{
        leaderboard[i].textContent = "--"
        }
    }
}