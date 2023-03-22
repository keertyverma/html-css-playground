var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Detect when a keyboard key has been pressed and start the game by calling nextSequence
$("body").on("keydown", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // play sounds for each user chosen colors
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern.
  console.log("current level = ", level);
  console.log("gamePattern = ", gamePattern);
  console.log("userClickedPattern = ", userClickedPattern);

  console.log("gamePattern[currentLevel]", gamePattern[currentLevel]);
  console.log(
    "userClickedPattern[currentLevel]",
    userClickedPattern[currentLevel]
  );

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Update Level
  level += 1;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); // 0-3
  var randomChosenColor = buttonColours[randomNumber];

  gamePattern.push(randomChosenColor);

  // Flash selected color button
  var chosenbutton = $("#" + randomChosenColor);
  chosenbutton.fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sounds for each random colors
  // Autoplay is disabled in chrome browser, below link wil give an error
  playSound(randomChosenColor);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  // Reset
  level = 0;
  gamePattern = [];
  started = false;
}
