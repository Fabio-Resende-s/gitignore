const canvas = document.getElementById('jogo');
    const ctx = canvas.getContext('2d');
    const box = 15; // tamanho do bloco
    let pontuacao = 0;

    let snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };

    let comida = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

    let direcao = null;

    document.addEventListener("keydown", direcaoTeclado);

    function direcaoTeclado(event) {
      if (event.keyCode == 37 && direcao != "RIGHT") direcao = "LEFT";
      else if (event.keyCode == 38 && direcao != "DOWN") direcao = "UP";
      else if (event.keyCode == 39 && direcao != "LEFT") direcao = "RIGHT";
      else if (event.keyCode == 40 && direcao != "UP") direcao = "DOWN";
    }

    function mudarDirecao(dir) {
      if (dir === 'LEFT' && direcao != 'RIGHT') direcao = 'LEFT';
      if (dir === 'RIGHT' && direcao != 'LEFT') direcao = 'RIGHT';
      if (dir === 'UP' && direcao != 'DOWN') direcao = 'UP';
      if (dir === 'DOWN' && direcao != 'UP') direcao = 'DOWN';
    }

    function desenhar() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenha a cobrinha
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00ff00" : "#33cc33";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
      }

      // Desenha a comida
      ctx.fillStyle = "red";
      ctx.fillRect(comida.x, comida.y, box, box);

      // Move a cobrinha
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direcao === "LEFT") snakeX -= box;
      if (direcao === "UP") snakeY -= box;
      if (direcao === "RIGHT") snakeX += box;
      if (direcao === "DOWN") snakeY += box;

      // Se comer comida
      if (snakeX === comida.x && snakeY === comida.y) {
        pontuacao++;
        document.getElementById('pontuacao').innerText = "Pontuação: " + pontuacao;
        comida = {
          x: Math.floor(Math.random() * 20) * box,
          y: Math.floor(Math.random() * 20) * box
        };
      } else {
        snake.pop(); // remove a última célula
      }

      const newHead = { x: snakeX, y: snakeY };

      // Game Over
      if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        colisao(newHead, snake)
      ) {
        clearInterval(jogo);
        alert("Game Over! Pontuação final: " + pontuacao);
      }

      snake.unshift(newHead);
    }

    function colisao(head, array) {
      for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
          return true;
        }
      }
      return false;
    }

    const jogo = setInterval(desenhar, 100);