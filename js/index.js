// Import functions from different modules
import { play, check, playerOrder, setCanClick, getCanClick, isGameInProgress, compTurn } from "./gameLogic.js";
import { normalIndicators } from "./indicators.js";
import { playSoundAndLight, clearColor } from "./soundAndColor.js";

// Select game UI elements
const turnCounter = document.querySelector("#turn");
const buttons = [];
for (let i = 1; i <= 9; i++) {
    buttons.push(document.querySelector(`#button${i}`));
}
const startButton = document.querySelector("#start");

// Track if the game has started
let gameStarted = false;
let lastClickTime = 0;
const CLICK_DELAY = 400; // Minimum time between clicks in milliseconds

// Handles the start button click event
startButton.addEventListener('click', () => {
    console.log("Start button clicked");
    if (!isGameInProgress) { // Only start if no game is in progress
        gameStarted = true;
        play(turnCounter);
    } else {
        console.log("Game already in progress");
    }
});

/**
 * Event listeners for the game buttons (1-9)
 * This allows players to input their choices during their turn
 */
buttons.forEach((button, btnIndex) => {
    button.addEventListener('click', () => {
        // Prevent button clicks before the game starts
        if (!gameStarted) {
            console.log("Game has not started yet");
            return;
        }

        // Check if enough time has passed since last click
        const currentTime = Date.now();
        if (currentTime - lastClickTime < CLICK_DELAY) {
            console.log("Clicking too fast!");
            return;
        }
        lastClickTime = currentTime;

        // Prevent multiple clicks during computer's turn
        if (compTurn || !getCanClick()) {
            console.log("Cannot click right now");
            return;
        }

        // Prevent clicks if the game is over
        if (!isGameInProgress) {
            console.log("Game is not in progress");
            return;
        }

        // Add the player's choice to the order list
        playerOrder.push(btnIndex + 1);
        console.log("Player order:", playerOrder);

        // Update visual indicator for player
        if (normalIndicators.length > playerOrder.length - 1) {
            normalIndicators[playerOrder.length - 1].style.background = "linear-gradient(#0f0, #080)";
        }

        // Play sound and light effect for the selected button
        playSoundAndLight(btnIndex + 1);

        // Check if the player's input matches the expected sequence
        check(turnCounter);

        // Clear button colors after a delay
        setTimeout(() => {
            clearColor();
        }, 300);
    });
});
