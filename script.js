let secretNumber = Math.floor(Math.random() * 100) + 1;
let guessesLeft = 10;
let timeLeft = 45;
let timer;

const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const feedback = document.getElementById('feedback');
const guessesLeftDisplay = document.getElementById('guesses-left');
const timeLeftDisplay = document.getElementById('time-left');

const successSound = document.getElementById('success-sound');
const errorSound = document.getElementById('error-sound');
const gameOverSound = document.getElementById('game-over-sound');

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function handleGuess() {
    const playerGuess = parseInt(guessInput.value);

    if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 100) {
        feedback.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    guessesLeft--;
    guessesLeftDisplay.textContent = guessesLeft;

    if (playerGuess === secretNumber) {
        successSound.play();
        feedback.textContent = `🎉 Correct! ${secretNumber}. Starting a new game...`;
        resetGame();
    } else if (guessesLeft === 0) {
        endGame(false);
    } else {
        feedback.textContent = playerGuess > secretNumber ? 'Too high! Try again.' : 'Too low! Try again.';
        errorSound.play();
    }

    guessInput.value = '';
}

function endGame(won) {
    clearInterval(timer);
    feedback.textContent = won ? `🎉 You won! ${secretNumber}.` : `💔 You lost! The number was ${secretNumber}.`;
    gameOverSound.play();
    resetGame();
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessesLeft = 10;
    timeLeft = 45;

    guessesLeftDisplay.textContent = guessesLeft;
    timeLeftDisplay.textContent = timeLeft;
    feedback.textContent = '';

    startTimer();
}


guessButton.addEventListener('click', handleGuess);
startTimer();
