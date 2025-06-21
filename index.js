var btncol = ["red", "blue", "green", "yellow"];
var x = [];
var y = [];
var level = 0;
var started = false;

// Start game on keypress
$(document).keypress(function () {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  y = []; // Reset user input for this level
  level++;
  $("h1").text("Level - " + level);

  var rand = btncol[Math.floor(Math.random() * 4)];
  x.push(rand);
  animateBtn(rand);
  Sound(rand);
}

function Sound(k) {
  var audio = new Audio("sounds/" + k + ".mp3");
  audio.play();
}

function animateBtn(q) {
  $("#" + q).fadeOut(100).fadeIn(100);
}

$(".btn").click(function () {
  var userColor = $(this).attr("id");
  y.push(userColor);

  animatePress(userColor);
  Sound(userColor);
  checkAns(y.length - 1);
});

function animatePress(q) {
  $("#" + q).addClass("pressed");
  setTimeout(function () {
    $("#" + q).removeClass("pressed");
  }, 100);
}

function checkAns(currIndex) {
  if (x[currIndex] === y[currIndex]) {
    if (y.length === x.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    Sound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over! Press A Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  x = [];
  y = [];
  level = 0;
  started = false;
}
