// --- Game Data ---
// Costume names are sourced from the Daily Nebraskan articles:
const costumeNames = [
    "Witch",
    "Ghost",
    "Devil",
    "Angel",
    "Lifeguard",
    "Pilot",
    "Priscilla Presley", // Based on the movie "Priscilla" reference
    "Happy Gilmore"      // Based on the film of the same name
];
// Duplicate for 8 pairs = 16 cards
const gameCards = [...costumeNames, ...costumeNames];

// --- DOM Elements ---
const landingPage = document.getElementById('landing-page');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const startButton = document.getElementById('start-button');
const playAgainButton = document.getElementById('play-again-button');
const gameBoard = document.getElementById('game-board');

// --- Game State Variables ---
let flippedCards = []; // Stores the two cards currently flipped
let matchCount = 0;    // Tracks the number of pairs found
let canFlip = true;    // Controls card clicking while checking a match

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
    // Clear the board before creating new cards
    gameBoard.innerHTML = '';
    
    // Shuffle the cards
    shuffle(gameCards);

    // Create and append the card elements
    gameCards.forEach((costume, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.costume = costume;
        cardElement.dataset.index = index;
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-back">DN</div>
                <div class="card-front">${costume}</div>
            </div>
        `;
        
        cardElement.addEventListener('click', handleCardClick);
        gameBoard.appendChild(cardElement);
    });
}

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
