let balance = 0;
let state = "q0";

function updateDisplay() {
    document.getElementById("balance").innerText = balance;
    document.getElementById("state").innerText = state;
}

function insertMoney(value) {
    balance += value;

    if (balance >= 8) {
        state = "q8";
    } else {
        state = "q" + balance;
    }

    document.getElementById("message").innerText = "Dinheiro inserido 💰";
    updateDisplay();
}

function buyCandy(price, type) {

    if (balance < price) {
        document.getElementById("message").innerText = "Saldo insuficiente ❌";
        return;
    }

    let change = balance - price;
    let candyEmoji = "";

    if (type === "A") candyEmoji = "🍬";
    if (type === "B") candyEmoji = "🍭";
    if (type === "C") candyEmoji = "🍫";

    animateCandy(candyEmoji);

    if (change === 0) {
        document.getElementById("message").innerText =
            "Doce " + type + " liberado SEM troco 🎉";
    } else {
        document.getElementById("message").innerText =
            "Doce " + type + " liberado! Troco: R$" + change + " 💵";
    }

    state = "FINAL";
    updateDisplay();
}

function animateCandy(emoji) {
    let candy = document.getElementById("candyDrop");
    candy.innerHTML = emoji;
    candy.classList.remove("drop-animation");
    void candy.offsetWidth;
    candy.classList.add("drop-animation");
}

function resetMachine() {
    balance = 0;
    state = "q0";
    document.getElementById("message").innerText = "Máquina reiniciada 🔄";
    document.getElementById("candyDrop").innerHTML = "";
    updateDisplay();
}