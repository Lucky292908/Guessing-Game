
const minRange = 1;
let maxRange = 100;
let secretNumber;
let guessCount = 0;

const startGameBtn = document.getElementById('startGame');
const gameSection = document.getElementById('gameSection');
const instructionsSection = document.getElementById('instructions');

// Audio elements
const correctSound = new Audio('correct.mp3');
const incorrectSound = new Audio('incorrect.mp3');

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('minNum').textContent = minRange;
    document.getElementById('maxNum').textContent = maxRange;
    startGameBtn.addEventListener('click', startGame);
    document.getElementById('submitGuess').addEventListener('click', submitGuess);
    document.getElementById('resetGame').addEventListener('click', resetGame);
});

function startGame() {
    secretNumber = generateRandomNumber();
    guessCount = 0;
    document.getElementById('guessCount').textContent = guessCount;
    instructionsSection.style.display = 'none';
    gameSection.style.display = 'block';
}
function submitGuess() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    const validationMessage = document.getElementById('validationMessage');

    if (!userGuess || userGuess < minRange || userGuess > maxRange) {
        validationMessage.textContent = 'Please enter a valid number within the range.';
        return;
    } else {
        validationMessage.textContent = '';
    }

    guessCount++;
    document.getElementById('guessCount').textContent = guessCount;

    if (userGuess === secretNumber) {
        displayFeedback('🏆 Congratulations! You guessed the correct number.', 'green');
        correctSound.play();
        document.getElementById('submitGuess').disabled = true;
    } else if (userGuess < secretNumber) {
        displayFeedback('Too low. Try again.', 'red');
        incorrectSound.play();
    } else {
        displayFeedback('Too high. Try again.', 'red');
        incorrectSound.play();
    }

    document.getElementById('userGuess').value = '';
    document.getElementById('userGuess').focus();
    updateGuessHistory(userGuess);
}


function resetGame() {
    secretNumber = generateRandomNumber();
    guessCount = 0;
    document.getElementById('guessCount').textContent = guessCount;
    document.getElementById('guessHistory').textContent = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('submitGuess').disabled = false;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
}

function displayFeedback(message, color) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
}

function updateGuessHistory(guess) {
    const guessHistoryElement = document.getElementById('guessHistory');
    const guessItem = document.createElement('p');
    guessItem.textContent = `Guess #${guessCount}: ${guess}`;
    guessHistoryElement.appendChild(guessItem);
}
document.getElementById('difficulty').addEventListener('change', function() {
    const difficulty = parseInt(this.value);
    switch (difficulty) {
        case 1:
            maxRange = 100;
            updateInstructionsText('Please enter a number between 1 and 100:');
            break;
        case 2:
            maxRange = 500;
            updateInstructionsText('Please enter a number between 1 and 500:');
            break;
        case 3:
            maxRange = 1000;
            updateInstructionsText('Please enter a number between 1 and 1000:');
            break;
    }
    resetGame();
});

function updateInstructionsText(text) {
    document.getElementById('instructions').getElementsByTagName('p')[0].textContent = text;
}

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleRules");
    const rulesBox = document.getElementById("additionalInstructions");

    toggleButton.addEventListener("click", function() {
        if (rulesBox.style.display === "none" || !rulesBox.style.display) {
            rulesBox.style.display = "block";
            toggleButton.textContent = "Hide Rules ";
        } else {
            rulesBox.style.display = "none";
            toggleButton.textContent = "Show Rules ";
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    // Other code...

    document.getElementById('homeButton').addEventListener('click', function() {
        resetGame();
        gameSection.style.display = 'none';
        instructionsSection.style.display = 'block';
    });
});



// Add an event listener to check when the game starts
startGameBtn.addEventListener('click', function() {
    startGame();
    document.getElementById('homeButton').style.display = 'block'; // Show home button
});

// Add an event listener to the home button to reset the game and hide the home button
document.getElementById('homeButton').addEventListener('click', function() {
    resetGame();
    gameSection.style.display = 'none';
    instructionsSection.style.display = 'block';
    this.style.display = 'none'; // Hide home button
});
