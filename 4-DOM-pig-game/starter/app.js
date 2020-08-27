/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const totalPlayers = 2;
const winningScore = 10;
var scores, roundScore, activePlayer, gamePlaying;

const diceImage = document.querySelector("img.dice");
const rollButton = document.querySelector(".btn-roll");
const holdButton = document.querySelector(".btn-hold");
const newGameButton = document.querySelector(".btn-new");

init();

rollButton.addEventListener("click", function () {
    if (gamePlaying) {
        diceImage.style.display = "block";
        var dice = Math.floor(Math.random() * 6) + 1;
        diceImage.src = `dice-${dice}.png`;
        if (dice !== 1) {
            roundScore += dice;
            displayRoundScore();
        } else {
            roundScore = 0;
            displayRoundScore();
            nextPlayer();
        }
    }
});

holdButton.addEventListener("click", function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        activePlayerScoreDisplay().textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningScore) {
            //win
            document.querySelector(`#name-${activePlayer}`).textContent =
                "WINNER!";
            activePlayerPanel().classList.add("winner");
            activePlayerPanel().classList.remove("active");
            gamePlaying = false;
            diceImage.style.display = "none";
        } else {
            nextPlayer();
        }
    }
});

newGameButton.addEventListener("click", init);

function init() {
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.querySelector(`#name-0`).textContent = "Player 1";
    document.querySelector(`#name-1`).textContent = "Player 2";
    document.querySelector(`#current-0`).textContent = "0";
    document.querySelector(`#current-1`).textContent = "0";
    document.querySelector(`.player-0-panel`).classList.add("active");
    document.querySelector(`.player-1-panel`).classList.remove("active");
    document.querySelector(`.player-0-panel`).classList.remove("winner");
    document.querySelector(`.player-1-panel`).classList.remove("winner");
    diceImage.style.display = "none";
    activePlayer = 0;
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = true;
}
function displayRoundScore() {
    activePlayerCurrentScore().textContent = roundScore;
}
function nextPlayer() {
    diceImage.style.display = "none";
    activePlayerPanel().classList.toggle("active");
    activePlayer = (activePlayer + 1) % totalPlayers;
    activePlayerPanel().classList.toggle("active");
    roundScore = 0;
}
var activePlayerCurrentScore = function () {
    return document.querySelector(`#current-${activePlayer}`);
};
var activePlayerPanel = function () {
    return document.querySelector(`.player-${activePlayer}-panel`);
};
var activePlayerScoreDisplay = function () {
    return document.querySelector(`#score-${activePlayer}`);
};
