<div align="center">

<img src="assets/banner.png" width="100%"/>

</div>
<div align="center">



✨ **Bem-vindo ao Arcade da Teoria da Computação!** ✨  
Escolha seu desafio e veja os autômatos ganharem vida 🎮  

</div>

---

<div align="center">

![Status](https://img.shields.io/badge/status-READY%20TO%20PLAY-00ff88?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML-5-orange?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-blue?style=for-the-badge&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=for-the-badge&logo=javascript)
![AFD](https://img.shields.io/badge/Autômato-AFD-ff9b5e?style=for-the-badge)
![PDA](https://img.shields.io/badge/Autômato-Pilha-7de7ff?style=for-the-badge)

</div>

---

## 👥 Integrantes

- Breno Henrique Ruiz dos Santos — 823131791  
- Maria Eduarda Medeiro Porto — 824144948  
- Matheus Alves Santana — 824144952  

---

# 🎮 Sobre o Projeto

Este projeto é uma **simulação interativa** de autômatos:

🎯 **Case 1 → AFD (Máquina de Doces)**  
🧠 **Case 2 → PDA (Elevador com Pilha)**  

Tudo com interface animada, som e interação em tempo real.

---

# 🍬 Case 1 — Máquina de Doces (AFD)

Simula um:

👉 **Autômato Finito Determinístico**

---

## ⚙️ Regras

- 💰 Aceita: `1 | 2 | 5`
- 🚫 Máximo: `10`

| Doce | Preço |
|------|------|
| MoranGlow | R$6 |
| ChocoMiau | R$7 |
| MelCookie | R$8 |

---

## 🧠 Estrutura

- Estados: `q0 → q10`
- Transição:  
  `δ(qx, valor) → q(x + valor)`

---

## 🎯 Features

✔ Troco automático  
✔ Estados visuais  
✔ Sons  
✔ Animações  

---

# 🛗 Case 2 — Elevador (Autômato de Pilha)

Simula um:

👉 **PDA (Pushdown Automaton)**

---

## 🧠 Conceito

- Usa **pilha (stack)**  
- Guarda múltiplas requisições  
- Resolve em ordem  

---

## ⚙️ Regras

- Move 1 andar por vez  
- Portas:
  - ❌ fechadas em movimento  
  - ✅ abertas ao chegar  

---

## 🔄 Funcionamento

1. Usuário seleciona um andar  
2. O andar é **empilhado (push)**  
3. O elevador:
   - Fecha portas 🚪
   - Move andar por andar ⬆⬇
   - Abre portas ao chegar  
4. Pedido é removido da pilha (**pop**)  

---

## ⚙️ Regras do Elevador

- Move **1 andar por vez**
- Portas:
  - ❌ Fechadas em movimento
  - ✅ Abertas ao chegar
- Pode lidar com múltiplas requisições

---

## 🎯 Funcionalidades

✔ Simulação de movimento realista  
✔ Controle de portas  
✔ Estados do AFD visíveis  
✔ Direção do elevador  
✔ Interface interativa  

---

# 🕹️ Como Usar

## 🎮 Menu Inicial

Ao abrir o projeto:

- Escolha entre:
  - 🍬 Máquina de Doces  
  - 🛗 Elevador  

---

## 🍬 Case 1

1. Insira dinheiro  
2. Escolha um doce  
3. Receba produto + troco  

---

## 🛗 Case 2

1. Clique no andar desejado  
2. Observe o movimento do elevador  
3. Veja os estados e portas funcionando  

---

# 📁 Estrutura do Projeto

```text
teoria_computacional_compiladores/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── fundo.mp4
│   ├── coin.mp3
│   ├── dispense.mp3
│   ├── error.mp3
│   ├── cat-top.png
│   ├── demo.gif
└── README.md

