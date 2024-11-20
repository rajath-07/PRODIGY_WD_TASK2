let timer;
let isRunning = false;
let elapsed = 0;
let startTime;
let lapCount = 1; // To track lap number

// Stopwatch functions
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsed;
        timer = setInterval(updateDisplay, 1000);
    }
}

function updateDisplay() {
    elapsed = Date.now() - startTime;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    document.getElementById('display').textContent =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function pauseStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    elapsed = 0;
    isRunning = false;
    document.getElementById('display').textContent = "00:00:00";
    document.getElementById('laps').innerHTML = ''; // Clear laps
    lapCount = 1; // Reset lap count
}

function recordLap() {
    if (isRunning) {
        const lapTime = document.getElementById('display').textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`; // Display lap number
        document.getElementById('laps').appendChild(lapItem);
        lapCount++; // Increment lap number
    }
}

// Dark Mode Toggle Functionality
const darkModeToggle = document.querySelector('.switch input');  // Get the checkbox input (slider)
const body = document.body;
const stopwatch = document.querySelector('.stopwatch');

// Listen for changes in the checkbox (slider) state
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        stopwatch.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        stopwatch.classList.remove('dark-mode');
    }
});

// Event listeners for stopwatch buttons
document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', recordLap);
