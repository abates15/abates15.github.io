// --- Game Data ---
const costumeNames = [
    "Witch",
    "Ghost",
    "Devil",
    "Angel",
    "Lifeguard",
    "Pilot",
    "Priscilla Presley", 
    "Happy Gilmore"      
];
// Duplicate for 8 pairs = 16 cards
const gameCards = [...costumeNames, ...costumeNames];
const halloweenEmojis = ["🎃", "👻", "🦇", "🕸️", "🕷️", "🍬"]; // Emojis for the card backs

// --- DOM Elements ---
const landingPage = document.getElementById('landing-page');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const startButton = document.getElementById('start-button');
const playAgainButton = document.getElementById('play-again-button');
const gameBoard = document.getElementById('game-board');

// --- Game State Variables ---
let flippedCards = []; 
let matchCount = 0;    
let canFlip = true;    

// --- Functions ---

/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Renders the cards onto the game board.
 */
function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(gameCards);

    gameCards.forEach((costume, index) => {
        // Select a random emoji for the card back
        const randomEmoji = halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)];
        
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.costume = costume;
        cardElement.dataset.index = index;
        
        // === UPDATED: Card Back now includes an emoji ===
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-back">${randomEmoji} DN</div>
                <div class="card-front">${costume}</div>
            </div>
        `;
        
        cardElement.addEventListener('click', handleCardClick);
        gameBoard.appendChild(cardElement);
    });
}

// ... (rest of the script.js functions: handleCardClick, checkForMatch, resetGame, showScreen, showGameScreen, showWinScreen)
// The rest of the logic remains the same.

/**
 * Handles the click event on a card.
 * @param {Event} event - The click event.
 */
function handleCardClick(event) {
    const clickedCard = event.currentTarget;

    // Guard clauses: Don't flip if:
    // 1. We are in the middle of checking a pair (canFlip is false)
    // 2. The card is already flipped
    // 3. The card is already matched
    if (!canFlip || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    // Flip the card and add to the flippedCards array
    clickedCard.classList.add('flipped');
    flippedCards.push(clickedCard);

    // Check for a match after the second card is flipped
    if (flippedCards.length === 2) {
        canFlip = false; // Prevent further clicking
        setTimeout(checkForMatch, 1000); // Check after 1 second
    }
}

/**
 * Checks if the two flipped cards are a match.
 */
function checkForMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.costume === card2.dataset.costume) {
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchCount++;

        // Check for win condition
        if (matchCount === costumeNames.length) {
            setTimeout(showWinScreen, 500);
        }
    } else {
        // No match: flip them back over
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    // Reset for the next turn
    flippedCards = [];
    canFlip = true;
}

/**
 * Resets the game state and creates a new board.
 */
function resetGame() {
    flippedCards = [];
    matchCount = 0;
    canFlip = true;
    createBoard();
}

// --- Screen Management ---

function showScreen(screenToShow) {
    // Hide all screens
    landingPage.classList.remove('active');
    gameScreen.classList.remove('active');
    winScreen.classList.remove('active');
    
    // Show the desired screen
    screenToShow.classList.add('active');
}

function showGameScreen() {
    resetGame();
    showScreen(gameScreen);
}

function showWinScreen() {
    showScreen(winScreen);
}

// --- Event Listeners ---

startButton.addEventListener('click', showGameScreen);
playAgainButton.addEventListener('click', showGameScreen);

// Start on the landing page
showScreen(landingPage);
