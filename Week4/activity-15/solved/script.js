var eventType = document.querySelector("#event-type"); 
var mouseEventsEl = document.querySelector("#click-events");
var keyEventsEl = document.querySelector("#key-events");

function toggleDisplay(event) {
  var value = event.target.value;
  if(value === "keydown") {
    mouseEventsEl.classList.add("hide");
    keyEventsEl.classList.remove("hide");
  }
  else {
    mouseEventsEl.classList.remove("hide");
    keyEventsEl.classList.add("hide");
  }
}

function keydown(event) {
  console.log(event.key);
  console.log(event.code)
  /*
  var code = ...
  var key = ...
  var status = ...

  /// now put this in the html 

  */
}

function keyup() {
}

function click(event) {
  console.log("hey guys whats up", event)
/*
x position
y position
text content
*/
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
document.addEventListener("click", click);
eventType.addEventListener("change", toggleDisplay);
