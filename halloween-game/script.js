// --- Game Data based on DN Articles (The costumes to AVOID) ---
const BAD_COSTUMES = [
    [cite_start]"jersey",         // "Boring and lazy" [cite: 25]
    [cite_start]"angel_devil",    // "Overdone" and seen at least 10 times a year [cite: 17, 14]
    [cite_start]"kiss_kill",      // "One-year trend" that should have ended [cite: 13]
    [cite_start]"lifeguard"       // Taking the "easy route" [cite: 26]
];

// --- Main Judgment Function (Triggers when the button is clicked) ---
function getJudgment() {
    const costumeRadios = document.getElementsByName('costume');
    let selectedCostume = null;
    const resultMessage = document.getElementById('result-message');
    
    // 1. Find the selected radio button value
    for (let radio of costumeRadios) {
        if (radio.checked) {
            selectedCostume = radio.value;
            break;
        }
    }

    if (!selectedCostume) {
        resultMessage.innerHTML = "<p style='color: orange;'>❓ You must choose a costume before going to the party!</p>";
        return;
    }

    // 2. Check the judgment
    if (BAD_COSTUMES.includes(selectedCostume)) {
        // LOSE CONDITION
        resultMessage.innerHTML = `
            <p style="color: red; font-weight: bold;">❌ JUDGMENT FAILED!</p>
            <p>The writers have seen that costume too many times. [cite_start]You're told it's **too basic** and to try a more **niche idea** next time. [cite: 8]</p>
            <p><strong>Try again!</strong></p>
        `;
    } else {
        // WIN CONDITION
        resultMessage.innerHTML = `
            <p style="color: green; font-weight: bold;">✅ JUDGMENT PASSED!</p>
            <p>You chose a unique costume! [cite_start]You get **lots of praise** and the writers love that you showed your personality. [cite: 29, 39]</p>
            <p><strong>Welcome to the Halloweekend party!</strong></p>
        `;
    }
}
