//variables to keep track of time
var eachQueTimeSec = 15;
var noTimeLeft = 'You have no time left!';

//set question index, interval and remaining time
var quesIndex = 0;
var timeLeft; // remaining time
var timer; // sets interval

//updates array if there's local storage
var highscores = [];
if (localStorage.getItem('highscores') !== null) {
  highscores = JSON.parse(localStorage.getItem('highscores'));
}

// jQuery $ event handler for answer buttons
$('#answers').on('click', '.answer-button', function() {
  quizAnswer($(this).text());
});

$('#view-highscores').on('click', function() {
  viewHighscores();
});

$(document).ready(function() {
  resetTime();
  $('#description').text('Here are the ' + questions.length + ' questions. Click Start Quiz button to begin.');
});


 //Timer
 
//show time left
function showTimeleft() {
  $('#time-left').text('Time: ' + timeLeft);
}

//resets quiz time at 75 seconds
function resetTime() {
  timeLeft = questions.length * eachQueTimeSec;
  showTimeleft();
}

//start timer
function startTime() {
  if (timeLeft > 0) {
    timeLeft--;
    showTimeleft();
  } else {
    clearInterval(timer);
    timeLeft = 0;
    showTimeleft();
    finish(noTimeLeft);
  }
}

// Start quiz
$('#start-quiz').on('click', function() {
  resetTime();
  $('header').removeClass('jumbo'); // change the color of the top bar
  $('#main-prompt').addClass('d-none'); // hide the jumbotron
  $('#main-content').removeClass('d-none'); // unhide the question and answer divs
  quizQuestion();
  timer = setInterval(startTime, 1000); // start the timer
});


 //quiz questions, answers
 function quizQuestion() {
  $('#answers').empty();
  $('#questions').text(questions[quesIndex].que);

  for (var i = 0; i < questions[quesIndex].choices.length; i++) {
    var buttonDiv = $('<div class="form-group">'); // Bootstrap div, class adds space between buttons
    var answerButton = $('<button class="btn btn-primary answer-button">');
    $(answerButton).text((i + 1) + '. ' + questions[quesIndex].choices[i]);
    $(buttonDiv).append(answerButton);
    $('#answers').append(buttonDiv);
  }
}

function quizAnswer(e) {
  // check quiz CORRECT answers
  if (e.substring(3, e.length) === questions[quesIndex].answer) {
    //audioDing.play();
    $('#correct-or-wrong').html('<i class="far fa-check-circle"></i> CORRECT!').css('color', 'green');
    $('#correct-or-wrong').removeClass('d-none');
  } else { // or else WRONG answer
    //audioBuzz.play();
    $('#correct-or-wrong').html('<i class="far fa-times-circle"></i> WRONG!').css('color', 'red');
    $('#correct-or-wrong').removeClass('d-none');
    
    if (timeLeft > 10) {
      timeLeft -= 10;
      showTimeleft();
    } else {
      clearInterval(timer);
      timeLeft = 0;
      showTimeleft();
      finish(noTimeLeft);
    }
  }
  // hide CORRECT/WRONG pop up after 2 seconds
  setTimeout(function() {
    $('#correct-or-wrong').addClass('d-none');
  }, 1000);

  if (quesIndex < questions.length - 2) {
    quesIndex++;
    quizQuestion();
  } else {
    clearInterval(timer);
    finish('Finished!');
  }
}

// finish quiz
function finish(end) {
  $('#answers').empty();
  $('#questions').text(end);
  $('#answers').append($('<p>').text('Final Score: ' + timeLeft + '!'));
  $('#score-form').removeClass('d-none'); // show the form to enter and submit initials
}

// to submit initials
$('#submit-initials').on('click', function(e) {
  e.preventDefault();

  // newScore 
  var newScore = {
    initials: $('#initials').val(),
    score: timeLeft
  }
  
  highscores.push(newScore);
  localStorage.setItem('highscores', JSON.stringify(highscores));

  $('#score-form').addClass('d-none');
  viewHighscores();
});

//highscores
function viewHighscores() {
  clearInterval(timer);
  resetTime();
  $('#answers').empty();
  $('header').addClass('d-none'); // hides viewhighscores, timer row
  $('#score-form').addClass('d-none'); // if view high scores is clicked without entering a time
  
  if (!$('#main-prompt').hasClass('d-none')) {
    $('#main-prompt').addClass('d-none');
    $('#main-content').removeClass('d-none');
  }

  $('#highscore-buttons').removeClass('d-none');
  $('#questions').addClass('pt-3');
  $('#questions').text('Highscores');

  if (highscores.length === 0) {
    $('#answers').append('<p>No Highscores. Go Back and Start Quiz!</p>');
  } else {
    for (var i = 0; i < highscores.length; i++) {
      var newScore = $('<p class="jumbo">').text((i + 1) + '. ' + highscores[i].initials + ' - ' + highscores[i].score);;
      $('#answers').append(newScore);
    }
  }
}

//buttons to clear the highscores and go back to home page
$('#clear-highscores-button').on('click', function() {
  highscores = [];
  localStorage.clear();
  viewHighscores();
});

$('#go-back-button').on('click', function() {
  quesIndex = 0;
  $('#questions').removeClass('pt-3');
  $('#main-prompt').removeClass('d-none');
  $('#main-content').addClass('d-none');
  $('header').addClass('jumbo');
  $('header').removeClass('d-none');
  $('#highscore-buttons').addClass('d-none');
});