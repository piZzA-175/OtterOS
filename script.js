function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeElement = document.querySelector("#time");
    timeElement.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

// Makes the welcome screen draggable
dragElement(document.getElementById("welcome"));

function dragElement(element) {
  //initialX and initialY store the mouse coordinates when dragging starts. currentX and currentY store the distance the mouse has moved during dragging.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  element.onmousedown = startDragging;

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Opening & Closing The Window
var welcomeScreen = document.querySelector("#welcome");

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;
  element.style.zIndex = biggestIndex;
}

var welcomeScreenClose = document.querySelector("#close-welcome");
var welcomeScreenOpen = document.querySelector("#open-welcome");

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});

//---------------------------------------------------------------------------

var selectedIcon = undefined;

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
} 

function deselectIcon(element) {
  if (!element) return; // nothing selected, nothing to do
  element.classList.remove("selected");
  selectedIcon = undefined;
}

function handleIconTap(element,screen) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(screen)
  } else {
    selectIcon(element)
  }
  }

dragElement(document.querySelector("#Otterwiki"));

var otterwikiScreen = document.querySelector("#Otterwiki")
var otterwikiScreenClose = document.querySelector("#close-Otterwiki")
otterwikiScreenClose.addEventListener("click", () => closeWindow(otterwikiScreen));

var otterwikiScreenOpen = document.querySelector("#Otterwiki-app");
otterwikiScreenOpen.addEventListener("click", () => openWindow(otterwikiScreen));

//for making window rise to the top
var biggestIndex = 1;

function handleWindowTap(element) {
  biggestIndex++;
  element.style.zIndex = biggestIndex;
  deselectIcon(selectedIcon)
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () =>
    handleWindowTap(element)
  )
}

addWindowTapHandling(welcomeScreen);
handleWindowTap(welcomeScreen);
addWindowTapHandling(otterwikiScreen);
handleWindowTap(otterwikiScreen);

function initializeIcon(name) {
var icon = document.querySelector("#" + name + "-app")
var screen = document.querySelector("#" + name)
icon.addEventListener("click", () => handleIconTap(icon, screen));
}

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
  if(elementName != "welcome") {
    initializeIcon(elementName)  
  }
}

initializeWindow("welcome");
initializeWindow("Otterwiki");
initializeWindow("calculator");

//to toggle side bar
document.addEventListener("DOMContentLoaded", () => {
 const sidebar = document.getElementById('sidebar');
  const buttons = sidebar.querySelectorAll('.nav-btn');
  const panels = document.querySelectorAll('.content');
 
  sidebar.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-btn');
    if (!link) return;
 
    e.preventDefault(); // stop the browser from jumping/scrolling to the #anchor
 
    const targetId = link.dataset.target;
 
    // swap active link
    buttons.forEach(b => b.classList.toggle('active', b === link));
 
    // swap active panel
    panels.forEach(c => c.classList.toggle('active', c.id === targetId));
  });
});

var calculatorScreen = document.querySelector("#calculator")
var otterwikiScreenClose = document.querySelector("#close-calculator")
otterwikiScreenClose.addEventListener("click", () => closeWindow(calculatorScreen));

var otterwikiScreenOpen = document.querySelector("#calculator-app");
otterwikiScreenOpen.addEventListener("click", () => openWindow(calculatorScreen));

//for calculator 
let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate(); 
    }
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('display').value = `${previousInput} ${currentOperation}`;
}

function calculate() {
  if (previousInput === '' || currentInput === '') return;
  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (currentOperation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
        result = prev / current;
        break;
    default:
      return;
    }

  currentInput = result.toString();
  currentOperation = '';
  previousInput = '';
  document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    document.getElementById('display').value = '';
}