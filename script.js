let answer = 0
let GuessCount = 0
let totalwin = 0
let totalGuess = 0
let scores = []
let playname = prompt("input your name")

//Select Level
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level")
    let range = 3
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

    //guess part
    document.getElementById("guessBtn").addEventListener("click", function guess(){
    let guess = document.getElementById("guess").value
    let temp = ""
    if (guess < 1 || guess > range || isNaN(guess)) {
    document.getElementById("msg").textContent = "Pls give a number between 1 and "+range;
    document.getElementById("guess").value = ""
    return;
    }
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
    totalGuess++;
    totalwin++;
    document.getElementById("wins").textContent = "Total wins: "+ totalwin
    document.getElementById("avgScore").textContent = "Average Score: "+ totalGuess/totalwin
    document.getElementById("msg").textContent = "Correct,you win this game!";
    document.getElementById("guessBtn").disabled = true
})
    //reset part
    document.getElementById("giveUpBtn").addEventListener("click", function reset(){
            document.getElementById("msg").textContent = "GG"
        for (let i=0;i < levelRadios.length; i++){
        levelRadios[i].disabled = false
    }
        document.getElementById("guess").value = 0
        document.getElementById("guessBtn").disabled = true
        document.getElementById("giveUpBtn").disabled = true
        document.getElementById("playBtn").disabled = false
})
})

