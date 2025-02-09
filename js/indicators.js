// Select all normal indicators (small circles tracking player input)
export const normalIndicators = document.querySelectorAll(".indicator");

// Select all progress indicators (small circles tracking game turns)
export const indicator2Elements = document.querySelectorAll(".indicator2");

// Track the index of the next normal indicator to be updated
let normalIndicatorIndex = 0;

//  Updates the progress indicators for the current turn
export function updateIndicator2(turnNumber) {
    if (turnNumber - 1 < indicator2Elements.length) {
        indicator2Elements[turnNumber - 1].style.background = "linear-gradient(#0f0, #080)";
    }
}

// Resets all progress indicators to their default state
export function resetIndicator2() {
    indicator2Elements.forEach(indicator => {
        indicator.style.background = "linear-gradient(#555, #222)";
    });
}


// Resets all normal indicators (for player input tracking)
export function resetNormalIndicators() {
    normalIndicators.forEach(indicator => {
        indicator.style.background = "";
    });
    normalIndicatorIndex = 0;
}
