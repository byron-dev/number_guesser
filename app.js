/*
GAME FUNCTIONALITY
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = 1,
    max = 10,
    winningNumber = getWinningNumber(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');        
    }

    // Check if won
    if (guess === winningNumber) {
        gameOver(true, `${winningNumber} is correct, you win!`);
        guessBtn.value = 'Play Again!';
        guessBtn.className = 'play-again';
    } else {
        // wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            gameOver(true, `Game over, you lost. The correct answer was: ${winningNumber}`);
            guessBtn.value = 'Play Again!';
            guessBtn.className = 'play-again';
        } else {
            // Game continues - wrong answer
            // Clear input
            guessInput.value = '';
            // Changer border color
            gameOver(false, `${guess} is not correct, you have ${guessesLeft} guesses left`);
        }
    }
});

// Set Message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}

// Game over
function gameOver (won, msg) {
    // Disable input
    guessInput.disabled = won;
    // Change border color
    guessInput.style.borderColor = won ? 'green' : 'red';
    setMessage(msg, won ? 'green' : 'red');
}

// Get Winning Number
function getWinningNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}