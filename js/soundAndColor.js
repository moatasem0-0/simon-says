
// Plays sound and changes color for the button when clicked or activated
export function playSoundAndLight(buttonNumber) {
    let audio = document.getElementById(`clip${buttonNumber}`);
    if (audio) {
        audio.play();
    }

    // Change button and screen button color temporarily
    document.querySelector(`#button${buttonNumber}`).style.backgroundColor = "#2666A0";
    document.querySelector(`#screen-button${buttonNumber}`).style.backgroundColor = "#2666A0";
}


// Clears the color of all buttons after they are activated
export function clearColor() {
    for (let i = 1; i <= 9; i++) {
        document.querySelector(`#button${i}`).style.backgroundColor = "#2666A0";
        document.querySelector(`#screen-button${i}`).style.backgroundColor = "black";
    }
}


// Flashes all buttons in the same color, used for game errors or wins
export function flashColor() {
    for (let i = 1; i <= 9; i++) {
        document.querySelector(`#button${i}`).style.backgroundColor = "#2666A0";
        document.querySelector(`#screen-button${i}`).style.backgroundColor = "#2666A0";
    }
}
