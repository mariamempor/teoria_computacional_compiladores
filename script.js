const candyPrices = { A: 6, B: 7, C: 8 };
const candyEmoji = { MoranGlow: '🍓', ChocoMiau: '🍫', MelCookie: '🍪' };

let balance = 0;
let state = 'q0';
let activeCase = null;

const floorNames = ['Térreo', '1º andar', '2º andar', '3º andar'];
const floorToBottom = [14, 104, 194, 284];

const elevator = {
    currentFloor: 0,
    targetFloor: null,
    lastFloor: 0,
    doorsOpen: true,
    moving: false,
    state: 'q0'
};

function renderAfd() {
    const afdContainer = document.getElementById('afdStates');
    afdContainer.innerHTML = '';

    for (let i = 0; i <= 9; i += 1) {
        const node = document.createElement('span');
        node.className = 'afd-node';
        node.textContent = `q${i}`;

        if (state === `q${i}` || (state === 'q9+' && i === 9)) {
            node.classList.add('active');
        }

        afdContainer.appendChild(node);
    }
}

function renderElevatorAfd() {
    const container = document.getElementById('elevatorAfdStates');
    container.innerHTML = '';

    for (let i = 0; i <= 7; i += 1) {
        const node = document.createElement('span');
        node.className = 'afd-node';
        node.textContent = `q${i}`;

        if (elevator.state === `q${i}`) {
            node.classList.add('active');
        }

        container.appendChild(node);
    }
}

function formatMoney(value) {
    return `R$${value},00`;
}

function updateDisplay() {
    document.getElementById('balance').innerText = formatMoney(balance);
    document.getElementById('state').innerText = state;

    const missingA = Math.max(candyPrices.A - balance, 0);
    const missingB = Math.max(candyPrices.B - balance, 0);
    const missingC = Math.max(candyPrices.C - balance, 0);

    document.getElementById('missing').innerText =
        `Falta: ${formatMoney(missingA)} / ${formatMoney(missingB)} / ${formatMoney(missingC)}`;

    renderAfd();
}

function updateElevatorDisplay() {
    document.getElementById('elevatorState').innerText = elevator.state;
    document.getElementById('doorStatus').innerText = elevator.doorsOpen ? 'Abertas' : 'Fechadas';
    document.getElementById('currentFloor').innerText = floorNames[elevator.currentFloor];

    const targetLabel = elevator.targetFloor === null
        ? 'Nenhuma'
        : floorNames[elevator.targetFloor];

    document.getElementById('targetFloor').innerText = targetLabel;

    const car = document.getElementById('elevatorCar');
    car.style.bottom = `${floorToBottom[elevator.currentFloor]}px`;
    car.classList.toggle('door-open', elevator.doorsOpen);

    const direction = document.getElementById('elevatorDirection');
    if (elevator.moving) {
        if (elevator.targetFloor > elevator.lastFloor) {
            direction.innerText = '⬆ Subindo';
        } else if (elevator.targetFloor < elevator.lastFloor) {
            direction.innerText = '⬇ Descendo';
        }
    } else {
        direction.innerText = '⏺ Parado';
    }

    renderElevatorAfd();
}

function setMessage(text) {
    document.getElementById('message').innerText = text;
}

function setElevatorMessage(text) {
    document.getElementById('elevatorMessage').innerText = text;
}

function insertMoney(value) {

    if (balance + value > 9) {
        document.getElementById('errorSound').play();
        setMessage('⚠️ Limite máximo é R$9,00!');
        shakeMachine();
        return;
    }

    balance += value;

    document.getElementById('coinSound').play();

    state = balance >= 9 ? 'q9+' : `q${balance}`;

    setMessage(`Você inseriu ${formatMoney(value)} 💰`);
    updateDisplay();
}

function animateCandy(type) {
    const candyDrop = document.getElementById('candyDrop');
    candyDrop.innerText = candyEmoji[type];
    candyDrop.classList.remove('drop-animation');
    void candyDrop.offsetWidth;
    candyDrop.classList.add('drop-animation');
}

function shakeMachine() {
    const machine = document.getElementById('machine');
    machine.classList.remove('shake');
    void machine.offsetWidth;
    machine.classList.add('shake');
}

function buyCandy(price, type) {

    if (balance < price) {
        document.getElementById('errorSound').play();
        setMessage(`Saldo insuficiente para Doce ${type} ❌`);
        shakeMachine();
        return;
    }

    const change = balance - price;

    animateCandy(type);
    document.getElementById('dispenseSound').play();

    const machine = document.getElementById('machine');
    machine.classList.add('led-win');

    setTimeout(() => {
        machine.classList.remove('led-win');
    }, 1200);

    if (change > 0) {
        setMessage(`Doce ${type} liberado! Troco: ${formatMoney(change)} 🎉`);
    } else {
        setMessage(`Doce ${type} liberado sem troco! 🎉`);
    }

    balance = 0;
    state = 'q0';
    updateDisplay();
}

function resetMachine() {
    balance = 0;
    state = 'q0';
    document.getElementById('candyDrop').innerText = '🐾';
    setMessage('Máquina reiniciada. Insira dinheiro para começar 💰');
    updateDisplay();
}

function getElevatorStateFor(floor, doorsOpen) {
    return `q${(floor * 2) + (doorsOpen ? 0 : 1)}`;
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestFloor(targetFloor) {
    if (elevator.moving) {
        document.getElementById('errorSound').play();
        setElevatorMessage('Aguarde! O elevador já está em movimento.');
        return;
    }

    if (targetFloor === elevator.currentFloor) {
        setElevatorMessage(`Você já está no ${floorNames[targetFloor]} 😺`);
        return;
    }

    elevator.targetFloor = targetFloor;
    elevator.lastFloor = elevator.currentFloor;
    elevator.doorsOpen = false;
    elevator.moving = true;
    elevator.state = getElevatorStateFor(elevator.currentFloor, false);
    setElevatorMessage(`Portas fechando... indo para ${floorNames[targetFloor]}.`);
    updateElevatorDisplay();

    await sleep(450);

    while (elevator.currentFloor !== targetFloor) {
        const direction = targetFloor > elevator.currentFloor ? 1 : -1;
        elevator.currentFloor += direction;
        elevator.state = getElevatorStateFor(elevator.currentFloor, false);
        updateElevatorDisplay();
        await sleep(1200);
    }

    elevator.moving = false;
    elevator.doorsOpen = true;
    elevator.state = getElevatorStateFor(elevator.currentFloor, true);
    setElevatorMessage(`Chegamos ao ${floorNames[elevator.currentFloor]}! Portas abertas. 🐾`);
    elevator.targetFloor = null;
    document.getElementById('dispenseSound').play();
    updateElevatorDisplay();
}

function resetElevator() {
    elevator.currentFloor = 0;
    elevator.targetFloor = null;
    elevator.doorsOpen = true;
    elevator.moving = false;
    elevator.state = 'q0';
    setElevatorMessage('Elevador reiniciado no térreo com portas abertas.');
    updateElevatorDisplay();
}

function hideAllCases() {
    document.getElementById('machine').style.display = 'none';
    document.getElementById('elevatorCase').style.display = 'none';
}

function startCase(option) {
    const menu = document.getElementById('menuScreen');
    const machine = document.getElementById('machine');
    const elevatorCase = document.getElementById('elevatorCase');

    menu.classList.add('arcade-out');

    setTimeout(() => {
        menu.style.display = 'none';
        menu.classList.remove('arcade-out');

        hideAllCases();

        if (option === 1) {
            activeCase = 'machine';
            machine.style.display = 'block';
            machine.classList.add('arcade-in');
        }

        if (option === 2) {
            activeCase = 'elevator';
            elevatorCase.style.display = 'block';
            elevatorCase.classList.add('arcade-in');
            resetElevator();
        }
    }, 500);
}

function goToMenu() {
    const menu = document.getElementById('menuScreen');
    const machine = document.getElementById('machine');
    const elevatorCase = document.getElementById('elevatorCase');

    const visibleCase = activeCase === 'elevator' ? elevatorCase : machine;

    visibleCase.classList.add('arcade-out');

    setTimeout(() => {
        visibleCase.style.display = 'none';
        visibleCase.classList.remove('arcade-out');

        menu.style.display = 'grid';
        menu.classList.add('arcade-in');
        activeCase = null;
    }, 500);
}

updateDisplay();
updateElevatorDisplay();

window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');
    music.volume = 0.25;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.addEventListener('click', () => {
                music.play();
            }, { once: true });
        });
    }
});