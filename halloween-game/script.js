// --- 1. Define the 'Bad Costumes' that make the player lose ---
const BAD_COSTUMES = [
    [cite_start]"jersey",         // Guys in a sports jersey [cite: 23, 24, 25]
    [cite_start]"devil",          // Devil/Angel duo [cite: 14]
    [cite_start]"kiss-kill",      // Kiss, Marry, Kill trio [cite: 9]
    [cite_start]"labubu",         // Labubus [cite: 21, 22]
    [cite_start]"lifeguard"       // Lifeguard [cite: 26]
    // Note: You would add 'lifeguard' and 'labubu' as items in the HTML
];

// Variable to track the IDs of the costume items the player has selected
let currentCostume = [];

// --- 2. Set up Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Listen for clicks on all costume items
    document.querySelectorAll('.costume-item').forEach(item => {
        item.addEventListener('click', toggleCostume);
    });

    // Listen for the 'Continue' button click
    document.getElementById('continue-button').addEventListener('click', checkCostume);
});

// --- 3. Toggle/Select Costume Function ---
function toggleCostume(event) {
    const item = event.target;
    const itemID = item.id;

    if (currentCostume.includes(itemID)) {
        // Deselect the item
        currentCostume = currentCostume.filter(id => id !== itemID);
        item.classList.remove('selected');
        // You would also remove the visual costume image layer here
    } else {
        // Select the item
        currentCostume.push(itemID);
        item.classList.add('selected');
        // You would add the visual costume image layer here
    }

    // Optional: Log the current selection for testing
    console.log("Current Selection:", currentCostume);
}

// --- 4. The Core Win/Lose Logic Function ---
function checkCostume() {
    let hasBadCostume = false;
    const messageDisplay = document.getElementById('judgement-message');

    // 4a. Check if ANY selected item is in the BAD_COSTUMES array
    for (let item of currentCostume) {
        if (BAD_COSTUMES.includes(item)) {
            hasBadCostume = true;
            break;
        }
    }

    // 4b. Determine and display the outcome
    if (hasBadCostume) {
        // LOSE CONDITION: Player selected a hated costume
        messageDisplay.textContent = "❌ FAIL! 'It’s boring and lazy.' You must choose a better costume to enter the DN party!";
        messageDisplay.style.color = 'red';
    } else if (currentCostume.length === 0) {
        // Player needs to wear *something*
        messageDisplay.textContent = "❓ You need to be wearing a costume to enter! Try again.";
        messageDisplay.style.color = 'orange';
    } else {
        // WIN CONDITION: Player selected an approved costume
        messageDisplay.textContent = "✅ SUCCESS! You picked a unique costume that will 'get you lots of praise.' Welcome to the DN party!";
        messageDisplay.style.color = 'green';
    }
}
