let workTime = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;

let timer = workTime;
let interval;
let isRunning = false;
let sessionCount = 0;
let mode = 'work'; // work, short break, long break

const timerDisplay = document.getElementById('timer');
const statusText = document.getElementById('status');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const buttons = document.getElementById('buttons');
const alarmSound = new Audio('assets/alarm/alarm.wav');
function updateDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchMode() {

    alarmSound.play();

    setTimeout(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 3000);


    if (mode === 'work') {
        sessionCount++;
        if (sessionCount % 4 === 0) {
            mode = 'long';
            timer = longBreak;
            statusText.textContent = 'Long Break';
        } else {
            mode = 'short';
            timer = shortBreak;
            statusText.textContent = 'Short Break';
        }
    } else {
        mode = 'work';
        timer = workTime;
        statusText.textContent = 'Focus Time';
    }
    updateDisplay();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            timer--;
            updateDisplay();

            if (timer <= 0) {
                clearInterval(interval);
                isRunning = false;
                switchMode();
                startTimer(); // auto start next cycle
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    if (mode === 'work') timer = workTime;
    else if (mode === 'short') timer = shortBreak;
    else timer = longBreak;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initial display
updateDisplay();
