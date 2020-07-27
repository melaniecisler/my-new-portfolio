var counter = document.querySelector("h1");
var word = document.querySelector("h2");

var poem = "Some say the world will end in 🔥, Some say in ice. From what I’ve tasted of desire, I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate. To say that for destruction ice, Is also great, And would suffice.";

var seconds = 5;

  // Create the countdown timer.
  function prepareRead() {
    var interval = setInterval(function () {
      seconds--;
      counter.textContent = seconds;
    var wordSeconds = 0;
  
    speedRead(seconds);
    if (seconds === 0) {
        counter.textContent = ' ';
    }
  }, 1000);
}


function speedRead(seconds) {
    var word = 5 - seconds - 1;
  // Print words to the screen one at a time.
  var wordArray = poem.split(' ');
  console.log(wordArray);

  wordEl.textContent = wordArray[word]
  
  }
prepareRead();
