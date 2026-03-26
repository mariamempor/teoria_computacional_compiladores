const candyPrices = { A: 6, B: 7, C: 8 };
const candyEmoji = { MoranGlow: '🍓', ChocoMiau: '🍫', MelCookie: '🍪' };

let balance = 0;
let state = 'q0';

function renderAfd() {
    const afdContainer = document.getElementById('afdStates');
    afdContainer.innerHTML = '';

    for (let i = 0; i <= 10; i += 1) {
        const node = document.createElement('span');
        node.className = 'afd-node';
        node.textContent = `q${i}`;

        if (state === `q${i}` || (state === 'q10+' && i === 10)) {
            node.classList.add('active');
        }

        afdContainer.appendChild(node);
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

function setMessage(text) {
    document.getElementById('message').innerText = text;
}

function insertMoney(value) {

    if (balance + value > 10) {
        document.getElementById("errorSound").play();
        setMessage("⚠️ Limite máximo é R$10,00!");
        shakeMachine();
        return;
    }

    balance += value;

    document.getElementById("coinSound").play();

    state = balance >= 8 ? 'q8+' : `q${balance}`;

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
        document.getElementById("errorSound").play();
        setMessage(`Saldo insuficiente para Doce ${type} ❌`);
        shakeMachine();
        return;
    }

    const change = balance - price;

    animateCandy(type);
    document.getElementById("dispenseSound").play();

    const machine = document.getElementById("machine");
    machine.classList.add("led-win");

    setTimeout(() => {
        machine.classList.remove("led-win");
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

updateDisplay();
function startCase(option) {
    const menu = document.getElementById("menuScreen");
    const machine = document.getElementById("machine");

    if (option === 1) {
        menu.classList.add("arcade-out");

        setTimeout(() => {
            menu.style.display = "none";
            menu.classList.remove("arcade-out");

            machine.style.display = "block";
            machine.classList.add("arcade-in");
        }, 500);
    }

    if (option === 2) {
        alert("🚧 Case 2 ainda está em desenvolvimento!");
    }
}
function goToMenu() {
    const menu = document.getElementById("menuScreen");
    const machine = document.getElementById("machine");

    machine.classList.add("arcade-out");

    setTimeout(() => {
        machine.style.display = "none";
        machine.classList.remove("arcade-out");

        menu.style.display = "grid";
        menu.classList.add("arcade-in");
    }, 500);
}
window.addEventListener("click", () => {
    const music = document.getElementById("bgMusic");
    music.volume = 0.3;
    music.play();
}, { once: true });