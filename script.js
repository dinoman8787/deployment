let counter = 0;
const maxCounter = 150;
const minCounter = 0;
const history = [];
let historyIndex = -1;

const counterValueElem = document.getElementById('counterValue');
const progressBarElem = document.getElementById('progressBar');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');

function updateUI() {
  counterValueElem.textContent = counter;
  progressBarElem.style.width = ${(counter / maxCounter) * 100}%;

  undoBtn.disabled = historyIndex < 0;
  redoBtn.disabled = historyIndex >= history.length - 1;
}

function addHistoryEntry(value) {
  // Remove future history if we are in the middle of history
  if (historyIndex < history.length - 1) {
    history.splice(historyIndex + 1);
  }
  history.push(value);
  historyIndex++;
}

function handleUndo() {
  if (historyIndex >= 0) {
    counter = history[historyIndex];
    historyIndex--;
    updateUI();
  }
}

function handleRedo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    counter = history[historyIndex];
    updateUI();
  }
}

function increment() {
  if (counter < maxCounter) {
    addHistoryEntry(counter);
    counter++;
    updateUI();
  }
}

function decrement() {
  if (counter > minCounter) {
    addHistoryEntry(counter);
    counter--;
    updateUI();
  }
}

// Event Listeners
document.getElementById('incrementBtn').addEventListener('click', increment);
document.getElementById('decrementBtn').addEventListener('click', decrement);
undoBtn.addEventListener('click', handleUndo);
redoBtn.addEventListener('click', handleRedo);

// Initialize UI
updateUI();