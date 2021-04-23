"use restrict";

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let gamePatternTemp = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;
let numClick = 0;
let highScore = 0;

// play sound for any random color choosen by system or user clicked
const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

// animate button clicked by user
const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

// create next color sequence
const nextSequence = function () {
  randomNumber = Math.trunc(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  gamePatternTemp = [...gamePattern];
  console.log(gamePattern);

  $(`#${randomChosenColour}`).animate({ opacity: "0" }, "fast", "linear");
  $(`#${randomChosenColour}`).animate({ opacity: "1" }, "fast", "linear");
  playSound(randomChosenColour);
  $("#level-title").text(`Level ${level}`);
  level++;
  numClick = level;
  //   console.log(`level is ${level}`);
};

// start the game with keypress event
$("body").keypress(function () {
  if (!gameStart) {
    nextSequence();
    gameStart = true;
    highScore = 0;
  }
});

// user clicked button handler
$(".btn").click(function () {
  const wrongAudio = new Audio(`sounds/wrong.mp3`);
  let userChosenColour = this.id;
  //   numClick++;
  //   userClickedPattern.push(userChosenColour);
  //   console.log(`click is ${numClick}`);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  let colourTemp = gamePatternTemp.shift();

  if (userChosenColour === colourTemp) {
    // console.log(`click is ${numClick}`);
    numClick--;
  } else {
    // console.log("game end");
    $("#level-title").text(
      `Game Over, Press Any Key to Restart! HighScore : ${highScore}`
    );
    gameStart = false;
    level = 0;
    gamePattern = [];
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
  }
  //   console.log(`click is ${numClick}`);
  if (!numClick) {
    setTimeout(function () {
      nextSequence();
    }, 800);
    highScore = level;
  }
});
