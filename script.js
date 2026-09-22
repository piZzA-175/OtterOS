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

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
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

function initializeWindow(elementName) {
  var screen = document.querySelector("#" + elementName)
  addWindowTapHandling(screen)
  dragElement(screen)
}

initializeWindow("welcome");
initializeWindow("Otterwiki");

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