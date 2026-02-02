// 1. LOCAL STORAGE: Load saved data on startup
let count = parseInt(localStorage.getItem("count")) || 0;
let savedGoal = localStorage.getItem("goal") || "";
let isMuted = false;

const countText = document.getElementById("count");
const goalText = document.getElementById("goal-message");
const goalInput = document.getElementById("goal-input");
const muteBtn = document.getElementById("mute-btn");
const clickSound = new Audio("https://www.fesliyanstudios.com/play-mp3/6");

// Initialize input value
goalInput.value = savedGoal;

function playSound() {
    if (!isMuted) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

function updateDisplay() {
    countText.innerText = count;
    
    // Save to LocalStorage
    localStorage.setItem("count", count);
    localStorage.setItem("goal", goalInput.value);

    // Color Logic
    countText.style.color = (count > 0) ? "#4ee44e" : "#ff4d4d";

    // 2. CONFETTI: Goal Logic
    let userGoal = parseInt(goalInput.value);
    if (userGoal > 0 && count === userGoal) {
        goalText.innerText = "⭐ GOAL REACHED! ⭐";
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); // Celebration!
    } else if (userGoal > 0 && count > userGoal) {
        goalText.innerText = "Target Surpassed!";
    } else {
        goalText.innerText = "";
    }

    // Animation
    countText.style.transform = "scale(1.2)";
    setTimeout(() => { countText.style.transform = "scale(1)"; }, 100);
}

// 3. KEYBOARD SUPPORT
window.addEventListener("keydown", (e) => {
    if (e.key === "+" || e.key === "=") { count++; playSound(); updateDisplay(); }
    if (e.key === "-" || e.key === "_") { if(count > 0) { count--; playSound(); updateDisplay(); } }
    if (e.key.toLowerCase() === "r") { count = 0; playSound(); updateDisplay(); }
});

// Button Clicks
document.getElementById("plus").onclick = () => { count++; playSound(); updateDisplay(); };
document.getElementById("minus").onclick = () => { if(count > 0) { count--; playSound(); updateDisplay(); } };
document.getElementById("reset").onclick = () => { count = 0; playSound(); updateDisplay(); };
muteBtn.onclick = () => { isMuted = !isMuted; muteBtn.innerText = isMuted ? "🔇" : "🔊"; };

// Goal Input Listener (saves goal as you type)
goalInput.oninput = () => updateDisplay();

// Run once on load
updateDisplay();
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('Service Worker Registered!');
    });
  });

}
