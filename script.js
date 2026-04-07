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
    answer = Math.floor(Math.random()*range)+1;

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

