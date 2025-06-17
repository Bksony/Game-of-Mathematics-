// Mind Reading Game JavaScript - Created by Your Name
// This game uses mathematical tricks to predict user's final number

let currentStep = 0;
let currentNumber = 9; // After step 3, this is always 9
let currentInstructions = [];

// Different ways to say the same first 3 steps
// I spent time figuring out these variations to keep it interesting
const firstThreeSteps = [
    [
        "Choose your lucky number between 1 and 10! 🍀",
        "Multiply your number by 9 🔢",
        "Add both digits of your result together 📊"
    ],
    [
        "Pick any number from 1 to 10 🎲",
        "Times your number by 9 ✖️",
        "Sum the digits of your answer 🧮"
    ],
    [
        "Select a number between 1-10 that feels right! 💫",
        "Multiply by 9 📈",
        "Add the two digits together 🔢"
    ],
    [
        "Think of your favorite number 1-10 💭",
        "Multiply it by 9 🎯",
        "Combine both digits by adding them ➕"
    ]
];

// Different instruction sets for steps 4-7 (all starting with number 9)
// Each sequence gives a different final answer but all work with 9
const remainingSteps = [
    {
        steps: [
            "Multiply your result by 8 🔄",
            "Add 15 to your number ➕",
            "Divide by 3 ➗",
            "Subtract 5 for your final answer! 🎪"
        ],
        buttons: ["Multiplied!", "Added!", "Divided!", "Show My Number!"],
        // Backend calculation: (9*8+15)/3-5 = (72+15)/3-5 = 87/3-5 = 29-5 = 24
        calculate: function () { return Math.floor((9 * 8 + 15) / 3 - 5); }
    },
    {
        steps: [
            "Square your number (multiply by itself) 📊",
            "Subtract 12 from the result ➖",
            "Divide by 4 ➗",
            "Add 7 to get your magical number! ✨"
        ],
        buttons: ["Squared!", "Subtracted!", "Divided!", "Reveal Answer!"],
        // Backend calculation: (9*9-12)/4+7 = (81-12)/4+7 = 69/4+7 = 17.25+7 = 24.25 -> 24
        calculate: function () { return Math.floor((9 * 9 - 12) / 4 + 7); }
    },
    {
        steps: [
            "Add 6 to your current number ➕",
            "Multiply the result by 4 📈",
            "Subtract 18 ➖",
            "Divide by 2 for the final magic number! 🎭"
        ],
        buttons: ["Added!", "Multiplied!", "Subtracted!", "Final Result!"],
        // Backend calculation: ((9+6)*4-18)/2 = (15*4-18)/2 = (60-18)/2 = 42/2 = 21
        calculate: function () { return Math.floor(((9 + 6) * 4 - 18) / 2); }
    },
    {
        steps: [
            "Multiply by 5 🔢",
            "Add 23 to your answer ➕",
            "Subtract 8 ➖",
            "Divide by 3 to complete the mystery! 🔮"
        ],
        buttons: ["Times 5!", "Plus 23!", "Minus 8!", "What's My Number?"],
        // Backend calculation: (9*5+23-8)/3 = (45+23-8)/3 = 60/3 = 20
        calculate: function () { return Math.floor((9 * 5 + 23 - 8) / 3); }
    },
    {
        steps: [
            "Double your number ✖️2",
            "Add 27 ➕",
            "Subtract 9 ➖",
            "Divide by 3 for your destiny number! 🌟"
        ],
        buttons: ["Doubled!", "Added 27!", "Subtracted!", "Show Destiny!"],
        // Backend calculation: (9*2+27-9)/3 = (18+27-9)/3 = 36/3 = 12
        calculate: function () { return Math.floor((9 * 2 + 27 - 9) / 3); }
    }
];

// Button text for first 3 steps - matching the different instruction styles
const firstThreeButtons = [
    ["I Got My Number!", "Calculated!", "Added Digits!"],
    ["Number Picked!", "Multiplied!", "Digits Summed!"],
    ["Selected!", "Times 9 Done!", "Combined!"],
    ["Got It!", "Multiplied!", "Added Together!"]
];

// Initialize game with random instruction set
// This function runs when game starts or restarts
function initializeGame() {
    const randomFirst = Math.floor(Math.random() * firstThreeSteps.length);
    const randomRest = Math.floor(Math.random() * remainingSteps.length);

    // Combine first 3 steps with remaining steps
    currentInstructions = {
        steps: [...firstThreeSteps[randomFirst], ...remainingSteps[randomRest].steps],
        buttons: [...firstThreeButtons[randomFirst], ...remainingSteps[randomRest].buttons],
        finalAnswer: remainingSteps[randomRest].calculate()
    };

    currentStep = 0;
    currentNumber = 9; // We know after step 3 it's always 9
    updateDisplay();
}

// Update the display with current step info
function updateDisplay() {
    document.getElementById('instructionText').textContent = currentInstructions.steps[currentStep];
    document.getElementById('nextBtn').textContent = currentInstructions.buttons[currentStep];
    document.getElementById('stepCounter').textContent = currentStep + 1;

    // Calculate and update progress bar
    const progressPercent = ((currentStep + 1) / currentInstructions.steps.length) * 100;
    document.getElementById('progressBar').style.width = progressPercent + '%';
}

// Move to next step in the game
function nextStep() {
    currentStep++;

    if (currentStep < currentInstructions.steps.length) {
        updateDisplay();
    } else {
        showResult();
    }
}

// Show the final result to user
function showResult() {
    document.getElementById('instructionBox').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('resultBox').style.display = 'block';
    document.getElementById('restartBtn').style.display = 'inline-block';
    document.getElementById('finalResult').textContent = currentInstructions.finalAnswer;

    // Complete the progress bar
    document.getElementById('progressBar').style.width = '100%';
}

// Restart the game with new random instructions
function restartGame() {
    // Reset display elements
    document.getElementById('instructionBox').style.display = 'flex';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'none';

    // Initialize new game
    initializeGame();
}

// Start game when page loads
document.addEventListener('DOMContentLoaded', function () {
    initializeGame();
});

// The secret behind the magic:
// - First 3 steps always result in 9 (any number 1-10 * 9, then add digits = 9)
// - Then each sequence performs different operations on 9
// - This gives different final answers: 24, 21, 20, 12 etc.
// - User never realizes all paths lead through 9 because instructions look different!
// - I figured this out through trial and error with different mathematical sequences