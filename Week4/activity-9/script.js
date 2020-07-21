var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var poem = "Some say the world will end in 🔥, Some say in ice. From what I’ve tasted of desire, I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate. To say that for destruction ice, Is also great, And would suffice.";

var h1Tag = document.createElement("h1");
h1Tag.createElement secondsLeft + " countdown seconds.";
document.body.appendChild(h1Tag);

var secondsLeft = 5;

  // Create the countdown timer.
  function speedRead() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " countdown seconds.";
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000);
  }
}

function speedRead() {
  // Print words to the screen one at a time.
  timeEl.textContent = " ";
  
  
}
setTimeout();
