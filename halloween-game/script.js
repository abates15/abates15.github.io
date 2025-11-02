const BAD_COSTUMES = [
    "jersey", "devil", "kiss-kill", "labubu", "lifeguard"
];
let currentCostume = [];
const costumeLayer = document.getElementById('costume-layer');
const messageDisplay = document.getElementById('judgement-message');

// --- Visual & Positioning Data ---
// **TODO: You MUST fill this with the correct positioning for your images**
const VISUAL_DATA = {
    "jersey":       { class: 'shirt', style: 'top: 150px; left: 100px; width: 150px; height: 150px; background-image: url("images/jersey.png");' },
    "devil":        { class: 'head', style: 'top: 50px; left: 130px; width: 80px; height: 80px; background-image: url("images/devil_horns.png");' },
    "chappell-roan":{ class: 'full', style: 'top: 150px; left: 100px; width: 150px; height: 250px; background-image: url("images/chappell_roan_dress.png");' },
    "witch":        { class: 'head', style: 'top: 0px; left: 80px; width: 100px; height: 100px; background-image: url("images/witch_hat.png");' },
    "fairy":        { class: 'back', style: 'top: 100px; left: 50px; width: 250px; height: 150px; background-image: url("images/fairy_wings.png");' }
    // Add all other costume IDs here
};


document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.costume-item').forEach(item => {
        item.addEventListener('click', toggleCostume);
    });
    document.getElementById('continue-button').addEventListener('click', checkCostume);
});

// --- Toggle/Select Costume Function ---
function toggleCostume(event) {
    const item = event.target;
    const itemID = item.id;

    if (currentCostume.includes(itemID)) {
        // Deselect
        currentCostume = currentCostume.filter(id => id !== itemID);
        item.classList.remove('selected');
    } else {
        // Select
        currentCostume.push(itemID);
        item.classList.add('selected');
    }

    updateVisuals(); // <-- Call the new function to refresh the character
}


// --- FUNCTION TO REFRESH THE MUMMY'S APPEARANCE ---
function updateVisuals() {
    // 1. Clear the costume layer completely
    costumeLayer.innerHTML = ''; 

    // 2. Loop through all currently selected items
    currentCostume.forEach(itemID => {
        const data = VISUAL_DATA[itemID];
        
        if (data) {
            // 3. Create a new div for the costume piece
            const piece = document.createElement('div');
            
            // 4. Assign necessary classes and styles
            piece.className = `costume-piece ${data.class}`;
            piece.style.cssText = data.style; // Apply the positioning and image
            piece.setAttribute('data-id', itemID); // Keep a reference to the item
            
            // 5. Add the piece to the costume layer
            costumeLayer.appendChild(piece);
        }
    });
}


// --- The Core Win/Lose Logic Function (Same as before) ---
function checkCostume() {
    let hasBadCostume = false;

    // Check if ANY selected item is in the BAD_COSTUMES array
    for (let item of currentCostume) {
        if (BAD_COSTUMES.includes(item)) {
            hasBadCostume = true;
            break;
        }
    }

    if (hasBadCostume) {
        messageDisplay.textContent = "❌ FAIL! 'It’s boring and lazy.' You must choose a better costume to enter the DN party!";
        messageDisplay.style.color = 'red';
    } else if (currentCostume.length === 0) {
        messageDisplay.textContent = "❓ You need to be wearing a costume to enter! Try again.";
        messageDisplay.style.color = 'orange';
    } else {
        messageDisplay.textContent = "✅ SUCCESS! You picked a unique costume that will 'get you lots of praise.' Welcome to the DN party!";
        messageDisplay.style.color = 'green';
    }
}
