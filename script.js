const candyPrices = { A: 6, B: 7, C: 8 };
const candyEmoji = { MoranGlow: '🍓', ChocoMiau: '🍫', MelCookie: '🍪' };

let balance = 0;
let state = 'q0';
let activeCase = null;
let lexerAnimationTimeout = null;

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
    document.getElementById('lexerCase').style.display = 'none';
}

function startCase(option) {
    const menu = document.getElementById('menuScreen');
    const machine = document.getElementById('machine');
    const elevatorCase = document.getElementById('elevatorCase');
    const lexerCase = document.getElementById('lexerCase');

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

        if (option === 3) {
            activeCase = 'lexer';
            lexerCase.style.display = 'block';
            lexerCase.classList.add('arcade-in');
            resetLexer();
        }
    }, 500);
}

function goToMenu() {
    const menu = document.getElementById('menuScreen');
    const machine = document.getElementById('machine');
    const elevatorCase = document.getElementById('elevatorCase');
    const lexerCase = document.getElementById('lexerCase');
    let visibleCase = machine;

    if (activeCase === 'elevator') visibleCase = elevatorCase;
    if (activeCase === 'lexer') visibleCase = lexerCase;

    visibleCase.classList.add('arcade-out');

    setTimeout(() => {
        visibleCase.style.display = 'none';
        visibleCase.classList.remove('arcade-out');

        menu.style.display = 'grid';
        menu.classList.add('arcade-in');
        activeCase = null;
    }, 500);
}

function tokenizeLine(line) {
    const tokens = [];
    const operators = ['==', '!=', '+', '-', '*', '/', '=', '<', '>'];
    const delimiters = [';', ',', '(', ')', '{', '}'];
    let i = 0;

    while (i < line.length) {
        const char = line[i];

        if (/\s/.test(char)) {
            i += 1;
            continue;
        }

        const twoChars = line.slice(i, i + 2);
        if (operators.includes(twoChars)) {
            tokens.push({ lexeme: twoChars, type: 'OPERADOR' });
            i += 2;
            continue;
        }

        if (operators.includes(char)) {
            tokens.push({ lexeme: char, type: 'OPERADOR' });
            i += 1;
            continue;
        }

        if (delimiters.includes(char)) {
            tokens.push({ lexeme: char, type: 'DELIMITADOR' });
            i += 1;
            continue;
        }

        const numberMatch = line.slice(i).match(/^\d+(\.\d+)?/);
        if (numberMatch) {
            tokens.push({ lexeme: numberMatch[0], type: 'NUMERO' });
            i += numberMatch[0].length;
            continue;
        }

        const idMatch = line.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
        if (idMatch) {
            const reserved = ['int', 'float', 'if', 'else', 'while', 'return'];
            const word = idMatch[0];
            tokens.push({
                lexeme: word,
                type: reserved.includes(word) ? 'PALAVRA_RESERVADA' : 'IDENTIFICADOR'
            });
            i += word.length;
            continue;
        }

        tokens.push({ lexeme: char, type: 'DESCONHECIDO' });
        i += 1;
    }

    return tokens;
}

function appendStep(message) {
    const steps = document.getElementById('lexerSteps');
    const li = document.createElement('li');
    li.textContent = message;
    steps.appendChild(li);
    steps.scrollTop = steps.scrollHeight;
}

function renderSymbolTable(identifiersSet) {
    const tbody = document.getElementById('symbolTableBody');
    tbody.innerHTML = '';

    if (identifiersSet.size === 0) {
        tbody.innerHTML = '<tr><td colspan="2">Sem identificadores no momento.</td></tr>';
        return;
    }

    identifiersSet.forEach((identifier) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${identifier}</td><td>Identificador</td>`;
        tbody.appendChild(row);
    });
}

function getTokenClass(type) {
    return `tk-${type.toLowerCase()}`;
}

function resetLexer() {
    if (lexerAnimationTimeout) {
        clearTimeout(lexerAnimationTimeout);
        lexerAnimationTimeout = null;
    }

    const defaultCode = `int x = 10;
float y = x + 2.5;
// comentário`;

    const input = document.getElementById('sourceCodeInput');
    input.value = defaultCode;

    document.getElementById('lexerOriginalCode').textContent = 'Aguardando análise...';
    document.getElementById('lexerCleanCode').textContent = 'Aguardando análise...';
    document.getElementById('lexerTokens').innerHTML = '';
    document.getElementById('lexerSteps').innerHTML = '<li>Digite o código e clique em Analisar.</li>';
    renderSymbolTable(new Set());
}

function analyzeLexical() {
    const lexerCase = document.getElementById('lexerCase');
    const source = document.getElementById('sourceCodeInput').value;
    const originalOutput = document.getElementById('lexerOriginalCode');
    const cleanOutput = document.getElementById('lexerCleanCode');
    const tokensContainer = document.getElementById('lexerTokens');
    const steps = document.getElementById('lexerSteps');

    if (!source.trim()) {
        originalOutput.textContent = '⚠️ Digite algum código para analisar.';
        return;
    }

    lexerCase.classList.add('lexer-running');
    steps.innerHTML = '';
    tokensContainer.innerHTML = '';

    originalOutput.textContent = source;
    appendStep('Código original carregado.');

    const lines = source.split('\n');
    const identifiers = new Set();
    const allTokens = [];
    const cleanedLines = [];

    lines.forEach((line, index) => {
        const lineWithoutComment = line.replace(/\/\/.*$/, '');
        const compactLine = lineWithoutComment.replace(/\s+/g, ' ').trim();

        if (lineWithoutComment !== line) {
            appendStep(`Linha ${index + 1}: comentário removido.`);
        }

        if (compactLine.length > 0) {
            cleanedLines.push(compactLine);
            appendStep(`Linha ${index + 1}: espaços extras removidos.`);
        }

        const tokens = tokenizeLine(lineWithoutComment);
        tokens.forEach((token) => {
            if (token.type !== 'DESCONHECIDO') {
                allTokens.push(token);
            }

            if (token.type === 'IDENTIFICADOR') {
                identifiers.add(token.lexeme);
            }
        });
    });

    const cleanCode = cleanedLines.join('\n');
    cleanOutput.textContent = cleanCode || '(vazio após limpeza)';
    appendStep('Código limpo gerado.');

    allTokens.forEach((token, index) => {
        lexerAnimationTimeout = setTimeout(() => {
            const chip = document.createElement('span');
            chip.className = `token-chip ${getTokenClass(token.type)}`;
            chip.textContent = `<${token.lexeme}, ${token.type}>`;
            tokensContainer.appendChild(chip);
        }, index * 85);
    });

    appendStep(`${allTokens.length} token(s) identificado(s).`);
    renderSymbolTable(identifiers);
    appendStep(`Tabela de símbolos atualizada com ${identifiers.size} identificador(es).`);

    lexerAnimationTimeout = setTimeout(() => {
        lexerCase.classList.remove('lexer-running');
    }, (allTokens.length * 85) + 220);
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
