 const simbolos = ['🐯', '🍍', '💎', '🍒', '🍀', '💰'];
    let moedas = 100;

    function atualizarMoedas() {
      document.getElementById('moedas').innerText = `Moedas: ${moedas} 🪙`;
    }

    function girar() {
      const resultado = document.getElementById('resultado');
      const som = document.getElementById('somGiro');

      if (moedas <= 0) {
        resultado.innerText = '💥 Sem moedas! Recarga necessária.';
        resultado.style.color = 'red';
        return;
      }

      moedas -= 10;
      atualizarMoedas();
      resultado.innerText = 'Girando... 🎲';
      resultado.style.color = '#000';

      som.currentTime = 0;
      som.play();

      let rodadas = 0;
      const tempoTotal = 2000; // gira por 2 segundos
      const intervalo = 100;   // troca símbolos a cada 100ms

      const interval = setInterval(() => {
        // Simula a roleta girando
        document.getElementById('reel1').innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        document.getElementById('reel2').innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        document.getElementById('reel3').innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
        rodadas += intervalo;

        if (rodadas >= tempoTotal) {
          clearInterval(interval);
          som.pause();

          // 30% de chance de vitória
          const chanceVitoria = Math.random() < 0.1; 

          let r1, r2, r3;
          if (chanceVitoria) {
            r1 = r2 = r3 = simbolos[Math.floor(Math.random() * simbolos.length)];
          } else {
            r1 = simbolos[Math.floor(Math.random() * simbolos.length)];
            r2 = simbolos[Math.floor(Math.random() * simbolos.length)];
            r3 = simbolos[Math.floor(Math.random() * simbolos.length)];
          }

          document.getElementById('reel1').innerText = r1;
          document.getElementById('reel2').innerText = r2;
          document.getElementById('reel3').innerText = r3;

          if (r1 === r2 && r2 === r3) {
            resultado.innerText = '🎉 Você ganhou 50 moedas! 🎉';
            resultado.style.color = 'green';
            moedas += 50;
          } else {
            resultado.innerText = 'Tente novamente!';
            resultado.style.color = 'red';
          }

          atualizarMoedas();
        }
      }, intervalo);
    }