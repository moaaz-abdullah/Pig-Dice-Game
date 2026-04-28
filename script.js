'use strict';

// Helper function to shorten querySelector usage
const $ = selector => document.querySelector(selector);

// Total score elements for both players
const score0El = $("#score--0");
const score1El = $("#score--1");

// Dice image element
const diceEl = $(".dice");

// Buttons
const btnNew = $(".btn--new");
const btnRoll = $(".btn--roll");
const btnHold = $(".btn--hold");

// Current score elements for both players
const current0El = $("#current--0");
const current1El = $("#current--1");
const player0El = $(".player--0");
const player1El = $(".player--1");

let currentScore, activePlayer, gameOver, scores

const init = () => {
    // Reset game state
    currentScore = 0;
    activePlayer = 0;
    gameOver = false;
    scores = [0, 0]

    // Reset UI scores
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // Hide dice at the start
    diceEl.classList.add("hidden");

    // Remove winner styles from both players
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}

init(); // Start the game

// Switch Active Player
const switchPlayer = () => {
    // Reset current score of the active player in UI
    $(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // Switch active player (0 -> 1 or 1 -> 0)
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

// Roll Dice Button Logic
btnRoll.addEventListener("click", () => {
    // Do nothing if the game is over
    if (!gameOver) {
        // Generate a random dice value between 1 and 6
        const dice = Math.trunc(Math.random() * 6) + 1
        // Display the correct dice image
        diceEl.src = `/dice-${dice}.png`;
        diceEl.classList.remove("hidden")
        // If dice is not 1, add to current score
        if (dice !== 1) {
            currentScore += dice;
            $(`#current--${activePlayer}`).textContent = currentScore
        } else {
            // If dice is 1, switch to the other player
            switchPlayer()
        }
    }
})

// Hold Button Logic
btnHold.addEventListener("click", () => {
    // Do nothing if the game is over
    if (!gameOver) {
        scores[activePlayer] += currentScore;
        $(`#score--${activePlayer}`).textContent = scores[activePlayer]
        // Check if the active player has won
        if (scores[activePlayer] >= 100) {
            gameOver = true;
            diceEl.classList.add("hidden")
            // Add winner style and remove active style
            $(`.player--${activePlayer}`).classList.add("player--winner");
            $(`.player--${activePlayer}`).classList.remove("player--active");
        }
        else { switchPlayer() }
    }
})

// New Game Button Logic
btnNew.addEventListener("click", init)
