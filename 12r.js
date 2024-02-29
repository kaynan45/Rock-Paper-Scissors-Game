let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
/*
               if (!score) {
                 score = {
                   wins: 0,
                   losses: 0,
                   ties: 0
                 };
               }
               */

updateScoreElement();

const autoPlayButton = document.querySelector(".js-auto-play");
autoPlayButton.addEventListener("click", () => {
  autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlayButton.classList.add("AutoPlaying");
    autoPlayButton.innerHTML = "Stop";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    autoPlayButton.classList.remove("AutoPlaying");
    autoPlayButton.innerHTML = "Auto play";
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    resetScore();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  const rockImage = document.querySelector(".rockImage");

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  showMoves(playerMove, computerMove);
  showResult(result);
  updateScoreElement();
}

function showMoves(playerMove, computerMove) {
  document.querySelector(".moves").innerHTML = `You
          <img class="moveIcon" src="images/${playerMove}-emoji.png">
          Computer
          <img class="moveIcon" src="images/${computerMove}-emoji.png">`;
}

function showResult(result) {
  let moveResult;

  if (result === "You win.") {
    moveResult = "You win.";
  } else if (result === "You lose.") {
    moveResult = "You lose.";
  } else if (result === "Tie.") {
    moveResult = "Tie.";
  }

  document.querySelector(".result").innerHTML = moveResult;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},
          Ties: ${score.ties};`;
}

document.querySelector(".js-reset-button").addEventListener("click", () => {
  resetScore();
});

const alertMessage = document.querySelector(".alertMessage");

function resetScore() {
  alertMessage.innerHTML = '<p class = "alertText" > Are you sure you want to reset the score? <button class = "yesButton choiceButtons" >Yes</button> <button class = "noButton choiceButtons">No</button> </p>'
  const yesButton = document.querySelector(".yesButton");
  const noButton= document.querySelector(".noButton");
  yesButton.addEventListener('click', () => {
    score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},
          Ties: ${score.ties};`
          alertMessage.innerHTML = '';
  })
  noButton.addEventListener('click', () => {
    alertMessage.innerHTML = '';
  })
};

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
