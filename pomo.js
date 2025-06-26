let timer;
let totalTime = 25 * 60;
let isRunning = false;
let sessionCount = 0;

const timerDisplay = document.getElementById("timer-display");
const sessionDisplay = document.getElementById("session-count");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(totalTime);
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      sessionCount++;
      sessionDisplay.textContent = sessionCount;
      alert("Time's up! Take a break.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  totalTime = 25 * 60;
  updateDisplay();
}

function switchMode(duration, buttonId) {
  totalTime = duration;
  updateDisplay();
  highlightMode(buttonId);
}

function highlightMode(activeId) {
  ["work-btn", "short-btn", "long-btn"].forEach(id => {
    document.getElementById(id).classList.remove("active-mode");
  });
  document.getElementById(activeId).classList.add("active-mode");
}

// Event Listeners
window.onload = () => {
  updateDisplay();
  document.getElementById("start-btn").addEventListener("click", startTimer);
  document.getElementById("pause-btn").addEventListener("click", pauseTimer);
  document.getElementById("reset-btn").addEventListener("click", resetTimer);
  document.getElementById("work-btn").addEventListener("click", () => switchMode(25 * 60, "work-btn"));
  document.getElementById("short-btn").addEventListener("click", () => switchMode(5 * 60, "short-btn"));
  document.getElementById("long-btn").addEventListener("click", () => switchMode(15 * 60, "long-btn"));
};
