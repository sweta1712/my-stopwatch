let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let interval;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateDisplay, 100); // 100ms precision
        document.getElementById("startStop").textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(interval);
    elapsedTime = 0;
    updateDisplay();
    isRunning = false;
    document.getElementById("startStop").textContent = "Start";
    clearLapList();
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const formattedLapTime = formatTime(lapTime);
        addLap(formattedLapTime);
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const tenths = (date.getUTCMilliseconds() / 100).toFixed(1); // 0.0 to 9.9
    return `${minutes}:${seconds}:${tenths}`;
}

function addLap(lapTime) {
    const lapList = document.getElementById("lapList");
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

function clearLapList() {
    const lapList = document.getElementById("lapList");
    lapList.innerHTML = ""; // Remove all lap items
}
