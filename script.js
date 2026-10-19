function tb8_makeArray(n){
this.length = n;
return this.length;
}
tb8_messages = new tb8_makeArray(3);
tb8_messages[0] = "typing.......";
tb8_messages[1] = "This is OtterOS!";
tb8_messages[2] = "Have fun!!";
tb8_rptType = 'infinite';
tb8_rptNbr = 5;
tb8_speed = 100;
tb8_delay = 2000;
var tb8_counter=1;
var tb8_currMsg=0;
var tb8_tekst ="";
var tb8_i=0;
var tb8_TID = null;
function tb8_pisi(){
tb8_tekst = tb8_tekst + tb8_messages[tb8_currMsg].substring(tb8_i, tb8_i+1);
document.title = tb8_tekst;
tb8_sp=tb8_speed;
tb8_i++;
if (tb8_i==tb8_messages[tb8_currMsg].length){
tb8_currMsg++; tb8_i=0; tb8_tekst="";tb8_sp=tb8_delay;
}
if (tb8_currMsg == tb8_messages.length){
if ((tb8_rptType == 'finite') && (tb8_counter==tb8_rptNbr)){
clearTimeout(tb8_TID);
return;
}
tb8_counter++;
tb8_currMsg = 0;
}
tb8_TID = setTimeout("tb8_pisi()", tb8_sp);
}
tb8_pisi()

var trailLength = 11 
var path = "images/cursor.png"

var i, d = 0
var images, storage, divs

function initTrail() { 
	images = new Array()
  divs = new Array()
	for (i = 0; i < parseInt(trailLength); i++) {
		images[i] = new Image()
		images[i].src = path
    images[i].style.width = "34px"
	}
	storage = new Array() 
	for (i = 0; i < images.length*3; i++) {
		storage[i] = 0
	}
	for (i = 0; i < images.length; i++) { 
    divs[i] = document.createElement("div")
	  divs[i].style.cssText = "position:absolute;z-index:999999;height:0;width:0;pointer-events:none"
	  divs[i].appendChild(images[i])
	  document.body.appendChild(divs[i])
	}
	trail()
}
function trail() { 
	for (i = 0; i < images.length; i++) { 
		divs[i].style.top = storage[d] + "px" 
    divs[i].style.left = storage[d+1] + "px"
		d = d+2
	}
	for (i = storage.length; i >= 2; i--) { 
		storage[i] = storage[i-2]
	}
	d = 0
	setTimeout( trail , 10 )  
}
function processEvent(e) { // catches and processes the mousemove event 
  storage[0] = e.pageY+12
  storage[1] = e.pageX+12
}
document.addEventListener("mousemove", processEvent) // start capturing
if (document.body) {
	initTrail()
} else {
	document.addEventListener("DOMContentLoaded", initTrail)
}

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
initializeWindow("clicker");
initializeWindow("JSpaint")

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

//for calculator

var calculatorScreen = document.querySelector("#calculator")
var calculatorScreenClose = document.querySelector("#close-calculator")
calculatorScreenClose.addEventListener("click", () => closeWindow(calculatorScreen));

var calculatorScreenOpen = document.querySelector("#calculator-app");
calculatorScreenOpen.addEventListener("click", () => openWindow(calculatorScreen));

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

//for clicker

var clickerScreen = document.querySelector("#clicker")
var clickerScreenClose = document.querySelector("#close-clicker")
clickerScreenClose.addEventListener("click", () => closeWindow(clickerScreen));

var clickerScreenOpen = document.querySelector("#clicker-app");
clickerScreenOpen.addEventListener("click", () => openWindow(clickerScreen));

let shell= document.querySelector('.shell-cost');
let parsedShell = parseFloat(shell.innerHTML);

spc = 1

function incrementShell() {
  parsedShell += spc;
  shell.innerHTML = parsedShell;
}

let rockCost = document.querySelector('.rock-cost');
let parsedRockCost = parseFloat(rockCost.innerHTML);

let rockIncrease = document.querySelector('.rock-increase');
let parsedRockIncrease = parseFloat(rockIncrease.innerHTML);

function buyRock() {
  if (parsedShell >= parsedRockCost) {
    parsedShell -= parsedRockCost;
    shell.innerHTML = parsedShell;
    spc += parsedRockIncrease;
  }
}

let kelpCost = document.querySelector('.kelp-cost');
let parsedKelpCost = parseFloat(kelpCost.innerHTML);

function buyKelp() {
  if (parsedShell >= parsedKelpCost) {
    parsedShell -= parsedKelpCost;
    shell.innerHTML = parsedShell;
    spc += 1;
  }
}

let fishCost = document.querySelector('.fish-cost');
let parsedFishCost = parseFloat(fishCost.innerHTML);

function buyFish() {
  if (parsedShell >= parsedFishCost) {
    parsedShell -= parsedFishCost;
    shell.innerHTML = parsedShell;
    spc += 2;
  }
}

let crabCost = document.querySelector('.crab-cost');
let parsedCrabCost = parseFloat(crabCost.innerHTML);

function buyCrab() {
  if (parsedShell >= parsedCrabCost) {
    parsedShell -= parsedCrabCost;
    shell.innerHTML = parsedShell;
    spc += 2;
  }
}

let urchinCost = document.querySelector('.urchin-cost');
let parsedUrchinCost = parseFloat(urchinCost.innerHTML);

function buyUrchin() {
  if (parsedShell >= parsedUrchinCost) {
    parsedShell -= parsedUrchinCost;
    shell.innerHTML = parsedShell;
    spc += 3;
  }
}

let otterCost = document.querySelector('.otter-cost');
let parsedOtterCost = parseFloat(otterCost.innerHTML);

function buyOtter() {
  if (parsedShell >= parsedOtterCost) {
    parsedShell -= parsedOtterCost;
    shell.innerHTML = parsedShell;
    spc += 5;
  }
}

//for JSpaint

var jspaintScreen = document.querySelector("#JSpaint")
var jspaintScreenClose = document.querySelector("#close-jspaint")
jspaintScreenClose.addEventListener("click", () => closeWindow(jspaintScreen));

var jspaintScreenOpen = document.querySelector("#JSpaint-app");
jspaintScreenOpen.addEventListener("click", () => openWindow(jspaintScreen));