// Game state variables
export let order = [];
export let playerOrder = [];
export let flash;
export let turn;
export let good;
export let compTurn;
export let intervalId;
export let noise = true;
export let win;
export let isGameInProgress = false;
let canClick = true; // Prevents players from spamming clicks

// Import necessary functions from other modules
import { resetNormalIndicators, resetIndicator2, updateIndicator2 } from "./indicators.js";
import { clearColor, playSoundAndLight, flashColor } from "./soundAndColor.js";
import { startConfetti } from "./confetti.js";


// Sets whether the player can click on buttons
export function setCanClick(value) {
    canClick = value;
}


// Gets the current state of player click ability
export function getCanClick() {
    return canClick;
}


// Starts a new game round
export function play(turnCounter) {
    // If a game is already in progress, don't start a new one
    if (isGameInProgress) {
        console.log("Game already in progress");
        return;
    }

    isGameInProgress = true;
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    resetNormalIndicators();
    resetIndicator2();
    setCanClick(false); // Prevent clicks during computer turn

    // Generate a random sequence for the game
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 9) + 1);
    }
    compTurn = true;
    intervalId = setInterval(() => gameTurn(turnCounter), 800);
}


// Handles the current game turn
export function gameTurn(turnCounter) {
    if (flash === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        updateIndicator2(turn);
        resetNormalIndicators();
        setCanClick(true); // Enable clicks immediately after computer's turn
    } else if (compTurn) {
        clearColor();
        setTimeout(() => {
            playSoundAndLight(order[flash]);
            flash++;
        }, 200);
    }
}


// Checks if the player's input matches the expected sequence
export function check(turnCounter) {
    if (!good || !isGameInProgress) {
        return;
    }

    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        good = false;
        setCanClick(false);
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();
            isGameInProgress = false;
            play(turnCounter);
        }, 800);
        noise = false;
        return;
    }

    if (playerOrder.length === 5 && good) {
        setCanClick(false);
        winGame();
        flashColor();
        isGameInProgress = false;
        return;
    }

    if (turn === playerOrder.length && good && !win) {
        setCanClick(false);
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(() => gameTurn(turnCounter), 800);
    }
}


// Handles the win state, displaying confetti and resetting indicators
function winGame() {
    flashColor();
    win = true;
    let winText = document.getElementById("winText");
    winText.style.display = "block";
    setTimeout(() => {
        winText.style.opacity = "1";
    }, 100);
    startConfetti();
    setTimeout(() => {
        winText.style.opacity = "0";
        setTimeout(() => {
            winText.style.display = "none";
            resetNormalIndicators();
            resetIndicator2();
            isGameInProgress = false; // Reset game state after win animation
        }, 1000);
    }, 5000);
    winSounds();
}
function winSounds() {
    let winSound2 = new Audio("sounds/fireworks.mp3");
    winSound2.play();

}
