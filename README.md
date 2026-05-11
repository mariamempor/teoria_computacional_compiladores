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

[cite_start]🎯 **Case 3 → Analisador Léxico (Scanner)** [cite: 10]

[cite_start]O sistema processa sequências de comandos para identificar a estrutura atômica da linguagem, separando o "ruído" (espaços e comentários) do conteúdo semântico[cite: 20].

---

# ⚙️ O que ele faz?

[cite_start]O analisador foi desenvolvido para processar uma gramática específica e realizar as seguintes tarefas[cite: 19, 20]:

| Função | Descrição |
|------|------|
| **Tokenização** | [cite_start]Identifica e exibe tokens a partir de sequências de comandos[cite: 20]. |
| **Tabela de Símbolos** | [cite_start]Organiza e mostra os símbolos identificados durante a análise[cite: 20]. |
| **Limpeza de Código** | [cite_start]Realiza a eliminação automática de caracteres em branco[cite: 20]. |
| **Ignorar Comentários** | [cite_start]Remove comentários que não devem ser processados pelo compilador[cite: 20]. |

---

## 🧠 Conceitos Implementados

[cite_start]Para a construção deste case, foram aplicados conceitos fundamentais de compiladores[cite: 16]:

* [cite_start]**Análise Léxica:** Processo de leitura e classificação do código fonte[cite: 16].
* [cite_start]**Mecanismos:** Uso de ferramentas como autômatos e expressões regulares para reconhecimento de padrões[cite: 16].
* [cite_start]**Compilação x Interpretação:** Estudo das diferentes abordagens de execução de código[cite: 16].
* [cite_start]**Tabela de Símbolos:** Estrutura para gerenciamento de identificadores[cite: 16].

---

## 🎯 Funcionalidades Principais

* [cite_start]✔ **Exibição em Tempo Real:** Mostra o código fonte de entrada e a análise léxica sendo realizada simultaneamente[cite: 21].
* [cite_start]✔ **Visualização de Tokens:** Lista detalhada de cada unidade léxica identificada[cite: 20].
* [cite_start]✔ **Interface Interativa:** Mantém a estética visual e a criatividade exigidas pelo projeto[cite: 23].
* [cite_start]✔ **Processamento Dinâmico:** Capaz de processar pedaços de códigos e sequências de comandos[cite: 20].

---

# 🕹️ Como Usar

## 📝 Testando o Analisador

1.  Acesse o menu principal do projeto.
2.  Selecione a opção **Analisador Léxico**.
3.  Insira o código fonte desejado no campo de entrada.
4.  [cite_start]Acompanhe a geração dos tokens e a atualização da Tabela de Símbolos na tela[cite: 21].

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

