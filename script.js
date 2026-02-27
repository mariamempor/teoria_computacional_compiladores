const candyPrices = { A: 6, B: 7, C: 8 };
const candyEmoji = { A: '🍬', B: '🍭', C: '🍫' };

let balance = 0;
let state = 'q0';

function renderAfd() {
    const afdContainer = document.getElementById('afdStates');
    afdContainer.innerHTML = '';

    for (let i = 0; i <= 8; i += 1) {
        const node = document.createElement('span');
        node.className = 'afd-node';
        node.textContent = `q${i}`;

        if (state === `q${i}` || (state === 'q8+' && i === 8)) {
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
    balance += value;
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
        setMessage(`Saldo insuficiente para Doce ${type} ❌`);
        shakeMachine();
        return;
    }

    const change = balance - price;
    animateCandy(type);

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
