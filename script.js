const esfera = document.getElementById('minhaEsfera');
const campoPontos = document.getElementById('pontos');
const campoTimer = document.getElementById('timer');
const instrucao = document.getElementById('instrucao');

let pontos = 0;
let tempoRestante = 2.0;
let tempoMaximo = 2.0;
let jogoIniciado = false;
let timerJogo;

// Função para centralizar a bola no início sem quebrar o layout
function centralizarBola() {
    const xMid = (window.innerWidth / 2) - 100;
    const yMid = (window.innerHeight / 2) - 100;
    esfera.style.left = xMid + 'px';
    esfera.style.top = yMid + 'px';
}

function gerarCorAleatoria() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function teleportarEsfera() {
    const margem = 50;
    const maxX = window.innerWidth - 200 - margem;
    const maxY = window.innerHeight - 200 - margem;

    const novoX = Math.max(margem, Math.floor(Math.random() * maxX));
    const novoY = Math.max(margem, Math.floor(Math.random() * maxY));

    esfera.style.left = novoX + 'px';
    esfera.style.top = novoY + 'px';
}

function resetarJogo() {
    jogoIniciado = false;
    clearInterval(timerJogo);
    pontos = 0;
    tempoMaximo = 2.0;
    campoPontos.innerText = pontos;
    campoTimer.innerText = "--";
    instrucao.style.opacity = "1";
    esfera.style.backgroundColor = "#3498db";
    centralizarBola();
}

function atualizarTimer() {
    clearInterval(timerJogo);
    tempoRestante = tempoMaximo;
    campoTimer.innerText = tempoRestante.toFixed(1);

    timerJogo = setInterval(() => {
        tempoRestante -= 0.1;
        if (tempoRestante <= 0) {
            tempoRestante = 0;
            campoTimer.innerText = "0.0";
            clearInterval(timerJogo);
            alert("Fim de jogo! Pontuação: " + pontos);
            resetarJogo();
        } else {
            campoTimer.innerText = tempoRestante.toFixed(1);
        }
    }, 100);
}

esfera.addEventListener('click', () => {
    if (!jogoIniciado) {
        jogoIniciado = true;
        instrucao.style.opacity = "0";
    } else {
        pontos++;
        campoPontos.innerText = pontos;
        // Diminui o tempo progressivamente
        tempoMaximo = Math.max(0.4, tempoMaximo * 0.94); 
    }

    esfera.style.backgroundColor = gerarCorAleatoria();
    teleportarEsfera();
    atualizarTimer();
});

esfera.addEventListener('mouseenter', () => {
    if (!jogoIniciado) {
        esfera.style.backgroundColor = gerarCorAleatoria();
    }
});

// Inicializa a posição centralizada
centralizarBola();

// Ajusta a posição se a janela mudar de tamanho
window.addEventListener('resize', () => {
    if (!jogoIniciado) centralizarBola();
});