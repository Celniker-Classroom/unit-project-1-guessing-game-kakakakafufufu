let answer = 0
let guessCount = 0
let totalwin = 0
let totalGuess = 0
let range = 3
let scores = []
let interval = null
let times = []
let startTime = 0
//date
function time(){
let now = new Date()
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthNow = months[now.getMonth()]
let year = now.getFullYear()
let date = now.getDate()
let dateName = ""
let hours = now.getHours()
let minutes = now.getMinutes()
let seconds = now.getSeconds()
if (date == 1||date == 21||date == 31){
    dateName = date + "st"
}else if(date == 2||date == 22){
    dateName = date + "nd"
}else if(date == 3||date == 23){
    dateName = date + "rd"
}else{
    dateName = date + "th"
}

document.getElementById("date").textContent = hours+":"+minutes+":"+seconds+"  "+dateName+"/"+monthNow+"/"+year
}
time()
setInterval(time, 1000)
//player name 
let playname = prompt("input your name")
playname = playname.charAt(0).toUpperCase() + playname.slice(1).toLocaleLowerCase();
//Select Level
document.getElementById("playBtn").addEventListener("click", function(){
    let radios = document.getElementsByName("level")
    for (let i=0;i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value)
        }
    }
    answer = Math.floor(Math.random() * range)+1;
    startTime = new Date().getTime();
    guessCount = 0;

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
    guessCount++;

    //judge part 
    while (guess != answer) {
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
    document.getElementById("msg").textContent = "Correct,"+playname+",you win this game in "+guessCount+" tries.";
    document.getElementById("guessBtn").disabled = true
    document.getElementById("giveUpBtn").disabled = true
    document.getElementById("playBtn").disabled = false
        let radios = document.getElementsByName("level")
        for (let i=0;i < radios.length; i++){
        radios[i].disabled = false}
    updateScore(guessCount)
    end()
})
//reset part
    document.getElementById("giveUpBtn").addEventListener("click", function reset(){
            document.getElementById("msg").textContent = "GG"
        guessCount = 0
        let radios = document.getElementsByName("level")
        for (let i=0;i < radios.length; i++){
        radios[i].disabled = false}
        document.getElementById("guessBtn").disabled = true
        document.getElementById("giveUpBtn").disabled = true
        document.getElementById("playBtn").disabled = false
        updateScore(range)
        end()
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

function end(){
    let now = new Date().getTime();
    let elapsed = (now - startTime) / 1000

    times.push(elapsed)
    updateTime()
}

function updateTime(){
    if(times.length === 0){return}

    let fastest = times[0]
    let timeSum = 0


    for (let i=0;i < times.length; i++){
       timeSum += times[i]
       if (times[i] < fastest){
           fastest = times[i]
       }
    }
    let averageTime = timeSum/times.length

    document.getElementById("fastest").textContent = "Fastest Game: "+fastest.toFixed(2)
    document.getElementById("avgTime").textContent = "Average Time: "+averageTime.toFixed(2)
}
