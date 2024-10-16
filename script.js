
const dog = document.querySelector('.dog');
const rock = document.querySelector('.rock');
const counter = document.getElementById('txt_counter');
const start = document.getElementById('btn_start');
const restart = document.getElementById('btn_restart');
let selectedDifficulty = null;

let jumpCounter = 0;
let score = 0;
let estado;


const loop = setInterval(() => {
    const rockPosition = rock.offsetLeft;
    const dogPosition = +window.getComputedStyle(dog).bottom.replace('px','');
    console.log(dogPosition);
    if (rockPosition >= 170 && rockPosition <= 300 && rockPosition > 0 && dogPosition < 140) {
        rock.style.animation = 'none';
        rock.style.left = `${rockPosition}px`;
        dog.style.animation = 'none';
        dog.style.bottom = `${dogPosition}px`;
        dog.src = 'imagens/dead.png';
        dog.style.bottom = '62px'
        dog.style.marginLeft = '30px'
        dog.style.width = '70px'
        clearInterval(loop);
        estado = "morto";
        document.getElementById('end').style.visibility = 'visible';
    }
    
}, 10);


function clearButtonEasy() {
    document.getElementById('easy').style.backgroundColor = "#7205ef";
    rock.classList.remove('easy');
}

function clearButtonMedium() {
    document.getElementById('medium').style.backgroundColor = "#7205ef";
    rock.classList.remove('medium');
}

function clearButtonHard() {
    document.getElementById('hard').style.backgroundColor = "#7205ef";
    rock.classList.remove('hard');
}

// Mode selection
function setDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    switch(difficulty) {
        case 'easyMode':
            document.getElementById('easy').style.backgroundColor = '#1ce016';
            clearButtonMedium();
            clearButtonHard();
            break;
        case 'mediumMode':
            document.getElementById('medium').style.backgroundColor = '#dfdb00';
            clearButtonEasy();
            clearButtonHard();
            break;
        case 'hardMode': 
            document.getElementById('hard').style.backgroundColor = '#c21a1a';
            clearButtonEasy();
            clearButtonMedium();
            break;

    }
}

function startGame() {
    if (!selectedDifficulty) {
        alert("Por favor, selecione uma dificuldade antes de iniciar!");
    } else {
        defineGameDifficulty(selectedDifficulty);
        let distanceInterval = 1;
        const scoreLoop = setInterval(() => {
            if(estado != "morto") {
                score += distanceInterval;
                document.getElementById("txt_score").innerHTML = `Pontuação: ${score}`;
            }
          }, 500);
    }
}

function defineGameDifficulty(difficulty) {
    switch(difficulty) {
        case 'easyMode': {
            rock.classList.add('easy');
            document.getElementById('start').style.visibility = 'hidden';
            document.getElementById('txt_selectedDifficulty').innerHTML = `Dificuldade: <span id="span_selectedDifficulty">Fácil</span>`;
            document.getElementById('span_selectedDifficulty').style.backgroundColor = '#1ce016';
            document.getElementById('easy').style.borderColor = '#1ce016';
            break;
        }
        case 'mediumMode': {
            rock.classList.add('medium');
            document.getElementById('start').style.visibility = 'hidden';
            document.getElementById('txt_selectedDifficulty').innerHTML = `Dificuldade: <span id="span_selectedDifficulty">Médio</span>`;
            document.getElementById('span_selectedDifficulty').style.backgroundColor = '#dfdb00 ';
            document.getElementById('medium').style.borderColor = '#dfdb00';
            break;
            }
        case 'hardMode': {
            rock.classList.add('hard');
            document.getElementById('start').style.visibility = 'hidden';
            document.getElementById('txt_selectedDifficulty').innerHTML = `Dificuldade: <span id="span_selectedDifficulty">Difícil</span>`;
            document.getElementById('span_selectedDifficulty').style.backgroundColor = '#c21a1a';
            document.getElementById('hard').style.borderColor = '#c21a1a';
            break;
        }
    }
}



document.addEventListener('keydown', (jump) => {
    if(jump.key === " " || jump.key === "ArrowUp") {
        dog.classList.add('jump');
        setTimeout( () => {dog.classList.remove('jump')}, 700);
        jumpCounter = jumpCounter + 1;
        counter.innerHTML = `Pulos: ${jumpCounter}`
    }
}); // jump action
document.getElementById('easy').onclick = () => setDifficulty('easyMode');
document.getElementById('medium').onclick = () => setDifficulty('mediumMode');
document.getElementById('hard').onclick = () => setDifficulty('hardMode'); 