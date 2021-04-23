// "use strict";

const gamePatterns = [];
const userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let gameStart = false;

const nextSequence = function () {
  const randomNumner = Math.trunc(Math.random() * 4);
  return randomNumner;
};

let randomChosenColour = "";

const playSound = function (name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

while (!gameStart) {
  $("body").keypress(function () {
    randomChosenColour = buttonColours[nextSequence()];
    gamePatterns.push(randomChosenColour);

    $(`#${randomChosenColour}`).animate({ opacity: "0" }, "fast", "linear");
    $(`#${randomChosenColour}`).animate({ opacity: "1" }, "fast", "linear");
    gameStart = true;
  });
}

// while (gameStart) {
//   randomChosenColour = buttonColours[nextSequence()];

//   gamePatterns.push(randomChosenColour);

//   $(`#${randomChosenColour}`).animate({ opacity: "0" }, "fast", "linear");
//   $(`#${randomChosenColour}`).animate({ opacity: "1" }, "fast", "linear");
// }

$(".btn").click(function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});
