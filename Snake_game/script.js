const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timerIntervalId = null;
const startButton = document.querySelector(".btn-start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const reStartButton = document.querySelector(".btn-restart");

//for selctiing score,time highscore

const scoreEle = document.querySelector("#score") || 0;
const highScoreEle =  document.querySelector("#high-score");
const timeEle = document.querySelector("#Time")


let highScore = localStorage.getItem("highScore");
let score = 0;
let time = `00-00`;

highScoreEle.innerText = highScore;

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

//creating 1D Array

const blocks = [];
let snake = [
  {
    x: 1,
    y: 3,
  },
];
// },{x:1,y:4},{x:1,y:5}];
let direction = "down";

//to make the grid layout

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row},${col}`;
    blocks[`${row},${col}`] = block;
  }
}

function render() {
  let head = null;

  //rnederinjg food

  blocks[`${food.x},${food.y}`].classList.add("food");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // alert("Game Over");
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }

  //food consume logic
  if (head.x == food.x && head.y == food.y) {
    // food ko khate hi food gayab ho jaye aur kahi dusri jagah spawn ho jaye
    blocks[`${food.x},${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x},${food.y}`].classList.add("food");

    //snake ki length bhd jaye food khane ke baad
    snake.push(head);
    //now i not only want to increase the size of snake but the increase the count of score as well
    
  score+=10;
  scoreEle.innerText = score;

  
    if(score > highScore){
      highScore = score;
      localStorage.setItem("highScore",highScore.toString());//local storage saves data/read data in string format only

    }
  }

  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.add("fill");
  });
}


addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  }
});

//start game
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 150);
  timerIntervalId = setInterval(() => {
    let [min,sec] = time.split("-").map(Number)//destructuring
    if(sec == 59){
      min+=1;
      sec = 0;
    }
    else{
      sec+=1;
    }
    time = `${min}-${sec}`;
    timeEle.innerText = time;
  },1000)
});

reStartButton.addEventListener("click", reStartGame);

function reStartGame() {
 
  blocks[`${food.x},${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.remove("fill");
  });
  score = 0;
  time = `00-00`;
  scoreEle.innerText = score;
  timeEle.innerText = time;
  highScoreEle.innerText = highScore;
  modal.style.display = "none";
  direction = "down";

  snake = [
    {
      x: 1,
      y: 3,
    },
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => {
    render();
  }, 150);
}


