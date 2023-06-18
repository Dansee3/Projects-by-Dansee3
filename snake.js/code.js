const App = (() => {
  let canvas;
  let context2d;
  let snake = [];
  let wallSize = 10;
  let dy = 0;
  let dx = 0;
  let pauseGame = true;
  let food = { x: 0, y: 0, color: 'white' };
  let points = 0;

  const clearCanvas = () => {
    context2d.fillStyle = 'black';
    context2d.fillRect(0, 0, canvas.width, canvas.height);
  };

  const makeSnake = (snakeLength) => {
    for (let i = 0; i < snakeLength; i++) {
      let x = canvas.width / 2 + i * wallSize;
      let y = canvas.height / 2;

      snake.push({ x: x, y: y });
    }
  };

  const drawSnake = () => {
    snake.forEach((el) => {
      context2d.strokeStyle = 'red';
      context2d.lineWidth = 3;
      context2d.lineJoin = 'bevel';
      context2d.strokeRect(el.x, el.y, wallSize, wallSize);
    });
  };

  const resetGame = () => {
    snake = [];
    makeSnake(5);
    randomFood();
    pauseGame = true;
  };

  const moveSnake = (dx, dy) => {
    let headX = snake[0].x + dx;
    let headY = snake[0].y + dy;

    snake.unshift({ x: headX, y: headY });
    snake.pop();
  };

  const keyDown = (e) => {
    if (pauseGame) pauseGame = false;

    switch (e.keyCode) {
      case 37: // left
      case 65: // a
        dy = 0;
        dx = -10;
        break;
      case 38: // up
      case 87: // w
        dy = -10;
        dx = 0;
        break;
      case 39: // right
      case 68: // d
        dy = 0;
        dx = 10;
        break;
      case 40: // down
      case 83: // s
        dy = 10;
        dx = 0;
        break;
    }
  };

  const randomFood = () => {
    const randV = (min, max) =>
      Math.floor((Math.random() * (max - min) + min) / wallSize) * wallSize;

    let colors = ['yellow', 'silver', 'white', 'orange'];
    food.color = colors[Math.floor(Math.random() * colors.length)];

    food.x = randV(20, canvas.width - 20);
    food.y = randV(20, canvas.height - 20);
  };

  const drawFood = () => {
    context2d.fillStyle = food.color;
    context2d.fillRect(food.x, food.y, wallSize, wallSize);
  };

  const checkWallsColision = () => {
    snake.forEach((el) => {
      if (el.x > canvas.width || el.x < 0 || el.y > canvas.height || el.y < 0) {
        resetGame();
      }
    });
  };

  const checkFoodCollision = () => {
    if (food.x === snake[0].x && food.y === snake[0].y) {
      snake.push({ ...snake[snake.length - 1] });
      randomFood();
      points++;
    }
  };

  const drawPoints = () => {
    context2d.font = '20px Arial';
    context2d.fillStyle = 'white';
    context2d.fillText(`Points: ${points}`, 10, 20);
  };

  const startApp = () => {
    canvas = document.getElementById('canvas');
    context2d = canvas.getContext('2d');
    document.addEventListener('keydown', keyDown);

    resetGame();

    setInterval(() => {
      clearCanvas();
      checkWallsColision();
      checkFoodCollision();
      if (!pauseGame) moveSnake(dx, dy);
      drawPoints();
      drawSnake();
      drawFood();
    }, 100);
  };

  window.onload = startApp;
})();
