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

function closeWindow() {
  welcomeScreen.style.display = "none";
}

function openWindow() {
  welcomeScreen.style.display = "flex";
}

var welcomeScreenClose = document.querySelector("#close-welcome");
var welcomeScreenOpen = document.querySelector("#open-welcome");

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});
