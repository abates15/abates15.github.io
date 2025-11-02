// --- GAME DATA (Facts from the Daily Nebraskan article) ---
const BOARD_SPACES = [
    { name: "START", type: "Safe", icon: "🏡", text: "Welcome to 'Halloweekend Quest'!", action: 0 },
    { name: "FACT 1", type: "Fact", icon: "🧠", text: "College students celebrate 'Halloweekend' on the weekend before or after Halloween." },
    { name: "FACT 2", type: "Fact", icon: "🧠", text: "The 'Kiss, Marry, Kill' trio costume is considered a one-year trend that is now 'overdone' since 2022." },
    { name: "SAFE 1", type: "Safe", icon: "✨", text: "It's a spooky safe spot! Take a breather." },
    { name: "BACK 1", type: "Penalty", icon: "💀", text: "A ghost tripped you! Move back 1 space. 👻", action: -1 },
    { name: "FACT 3", type: "Fact", icon: "🧠", text: "The classic devil and angel duo costume is also considered overdone by 2025." },
    { name: "SAFE 2", type: "Safe", icon: "✨", text: "You found a secret passage. All clear!" },
    { name: "FACT 4", type: "Fact", icon: "🧠", text: "To elevate a pirate costume, accessorize with a bandana, body jewelry, hair gems, and fishnet tights." },
    { name: "BACK 2", type: "Penalty", icon: "💀", text: "You stepped on a cursed patch of grass. Move back 1 space. 🕸️", action: -1 },
    { name: "FACT 5", type: "Fact", icon: "🧠", text: "For a sustainable Playboy Bunny costume, the Goodwill off of Apples Way in South Lincoln is suggested for accessories." },
    { name: "FACT 6", type: "Fact", icon: "🧠", text: "A key to elevating makeup is to add highlighter on top of the blush on the eyebrow bone." },
    { name: "FINISH", type: "Win", icon: "🏆", text: "CONGRATULATIONS! You won the 'Halloweekend Quest' and are now a Daily Nebraskan costume expert!" }
];

// --- GAME STATE VARIABLES ---
let playerPos = 0;
let tttBoard = Array(9).fill('');
const PLAYER_TTT = 'X';
const COMPUTER_TTT = 'O';
let isTttLocked = false;

// --- DOM ELEMENTS ---
const boardEl = document.getElementById('board');
const messageEl = document.getElementById('message');
const statusEl = document.getElementById('player-status');
const rollButton = document.getElementById('rollButton');
const tttAreaEl = document.getElementById('ttt-area');
const tttBoardEl = document.getElementById('ttt-board');
const startButton = document.getElementById('startButton');

// --- TIC-TAC-TOE LOGIC ---

const WIN_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin(board, player) {
    for (let combo of WIN_COMBOS) {
        if (board[combo[0]] === player && board[combo[1]] === player && board[combo[2]] === player) {
            return combo;
        }
    }
    return null;
}

function getAvailableMoves(board) {
    return board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
}

function computerMove() {
    let availableMoves = getAvailableMoves(tttBoard);
    if (availableMoves.length === 0) return;

    // Simple AI: pick a random spot
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    tttBoard[move] = COMPUTER_TTT;
    updateTttBoardDisplay();
    
    // Check for Computer win
    const winCombo = checkWin(tttBoard, COMPUTER_TTT);
    if (winCombo) {
        endTttGame(false, winCombo);
    } else if (getAvailableMoves(tttBoard).length === 0) {
        endTttGame(null); // Draw
    }
}

function handleTttClick(index) {
    if (isTttLocked || tttBoard[index] !== '') return;

    // Player move
    tttBoard[index] = PLAYER_TTT;
    updateTttBoardDisplay();
    isTttLocked = true; // Lock controls while computer moves

    // Check for Player win
    const winCombo = checkWin(tttBoard, PLAYER_TTT);
    if (winCombo) {
        endTttGame(true, winCombo);
        return;
    }
    
    // Check for Draw
    if (getAvailableMoves(tttBoard).length === 0) {
        endTttGame(null);
        return;
    }

    // Computer move after a short delay
    setTimeout(() => {
        computerMove();
        isTttLocked = false; // Unlock only after computer move (if game continues)
    }, 800);
}

function endTttGame(playerWon, combo = null) {
    isTttLocked = true;
    rollButton.disabled = false;
    
    if (playerWon === true) {
        messageEl.textContent = "🎉 YOU WON the Tic-Tac-Toe Gate! Roll the dice!";
        rollButton.classList.remove('hidden');
        tttAreaEl.classList.add('hidden');
        if (combo) {
            combo.forEach(i => tttBoardEl.children[i].classList.add('win-cell'));
        }
    } else if (playerWon === false) {
        messageEl.textContent = "❌ The computer won! You must try again to roll. New game starting...";
        setTimeout(startTttGame, 2000);
    } else { // Draw
        messageEl.textContent = "🔀 It's a draw! You need a win. New game starting...";
        setTimeout(startTttGame, 2000);
    }
}

function startTttGame() {
    tttBoard = Array(9).fill('');
    isTttLocked = false;
    tttAreaEl.classList.remove('hidden');
    rollButton.classList.add('hidden');
    messageEl.textContent = "Win the Tic-Tac-Toe Gate to roll the dice!";
    updateTttBoardDisplay();
}

function updateTttBoardDisplay() {
    tttBoardEl.innerHTML = '';
    tttBoard.forEach((cell, index) => {
        const cellEl = document.createElement('div');
        cellEl.classList.add('ttt-cell');
        cellEl.textContent = cell;
        cellEl.dataset.index = index;
        if (cell === PLAYER_TTT) cellEl.classList.add('x');
        if (cell === COMPUTER_TTT) cellEl.classList.add('o');
        
        cellEl.onclick = () => handleTttClick(index);
        tttBoardEl.appendChild(cellEl);
    });
}


// --- BOARD GAME LOGIC ---

function rollDice() {
    if (isTttLocked) return;

    rollButton.disabled = true;
    
    const diceRoll = Math.floor(Math.random() * 3) + 1; // Roll 1-3
    messageEl.textContent = `The dice rolled a... ${diceRoll}! Moving ${diceRoll} spaces.`;

    // Move player position
    let newPosition = playerPos + diceRoll;
    
    // Check for overshoot (win)
    if (newPosition >= BOARD_SPACES.length - 1) {
        playerPos = BOARD_SPACES.length - 1;
        updateBoardDisplay();
        resolveSpaceAction();
        return; // Game over
    }

    playerPos = newPosition;
    
    setTimeout(() => {
        updateBoardDisplay();
        resolveSpaceAction();
    }, 1000);
}

function resolveSpaceAction() {
    const currentSpace = BOARD_SPACES[playerPos];
    
    if (currentSpace.type === 'Win') {
        messageEl.textContent = currentSpace.text;
        statusEl.textContent = "GAME OVER!";
        rollButton.classList.add('hidden');
        return;
    }

    if (currentSpace.type === 'Penalty') {
        messageEl.textContent = `OH NO! ${currentSpace.text}`;
        
        // Apply penalty, ensuring player doesn't go below Start (index 0)
        playerPos = Math.max(0, playerPos + currentSpace.action);
        
        setTimeout(() => {
            messageEl.textContent = `Penalty applied. New spot: ${BOARD_SPACES[playerPos].name}.`;
            updateBoardDisplay();
            setTimeout(startTurn, 1500); // Start next turn after penalty is resolved
        }, 1500);

    } else if (currentSpace.type === 'Fact') {
        messageEl.textContent = `FACT LEARNED: ${currentSpace.text} ✅`;
        setTimeout(startTurn, 1500);

    } else { // Safe Space
        messageEl.textContent = `SAFE SPACE: ${currentSpace.text}`;
        setTimeout(startTurn, 1500);
    }
}

function updateBoardDisplay() {
    boardEl.innerHTML = ''; // Clear board
    BOARD_SPACES.forEach((space, index) => {
        const spaceEl = document.createElement('div');
        spaceEl.classList.add('board-space', space.type.toLowerCase());
        spaceEl.innerHTML = `${space.icon} <br>${space.name}`;
        
        if (index === playerPos) {
            spaceEl.classList.add('player-here');
        }
        
        boardEl.appendChild(spaceEl);
    });
    
    statusEl.textContent = `Current Position: Space ${playerPos + 1} / ${BOARD_SPACES.length}`;
}

function startTurn() {
    messageEl.textContent = "Your turn! Time to face the Tic-Tac-Toe Gate.";
    rollButton.disabled = true;
    rollButton.classList.add('hidden');
    startTttGame();
}

// --- INITIALIZATION ---

function initializeGame() {
    startButton.classList.add('hidden');
    updateBoardDisplay();
    startTurn();
}

// Ensure the board is visually set up on page load
document.addEventListener('DOMContentLoaded', updateBoardDisplay);
