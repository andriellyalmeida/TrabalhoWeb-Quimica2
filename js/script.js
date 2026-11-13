const menu = document.querySelector(".menu-toggle");
const navegacao = document.querySelector(".main-nav");
if (menu && navegacao) {
    menu.addEventListener("click", function() {
        navegacao.classList.toggle("open");
    });
}

const botaoTema = document.querySelector(".theme-toggle");

if (botaoTema) {
    botaoTema.addEventListener("click", function() {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            botaoTema.textContent = "☀";
        } else {
            botaoTema.textContent = "☾";
        }
    });
}

const pesquisa = document.getElementById("searchInput");
const cartoes = document.querySelectorAll(".topic-card");

if (pesquisa) {
    pesquisa.addEventListener("input", function() {
        const palavra = pesquisa.value.toLowerCase();
        cartoes.forEach(function(cartao) {
            const texto = cartao.innerText.toLowerCase();

            if (texto.includes(palavra)) {
                cartao.style.display = "block";
            } else {
                cartao.style.display = "none";
            }
        });

    });
}

const filtros = document.querySelectorAll(".filter-btn");
filtros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        filtros.forEach(function(item) {
            item.classList.remove("selected");
        });

        botao.classList.add("selected");

        const categoria = botao.dataset.filter;

        cartoes.forEach(function(cartao) {

            if (categoria === "todos" ||
                cartao.dataset.category.includes(categoria)) {

                cartao.style.display = "block";

            } else {
                cartao.style.display = "none";
            }

        });

    });

});

const botoesExpandir = document.querySelectorAll(".expand-btn");

botoesExpandir.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const conteudo = botao.nextElementSibling;
        if (conteudo.hidden) {
            conteudo.hidden = false;
            botao.textContent = "Ver menos";
        } else {
            conteudo.hidden = true;
            botao.textContent = "Ver mais";
        }
    });
});
const abrirModal = document.getElementById("openModal");
const fecharModal = document.getElementById("closeModal");
const modal = document.getElementById("infoModal");
const botaoOk = document.getElementById("modalOk");

if (abrirModal && modal) {
    abrirModal.addEventListener("click", function() {
        modal.hidden = false;
    });
}

if (fecharModal && modal) {
    fecharModal.addEventListener("click", function() {
        modal.hidden = true;
    });
}

if (botaoOk && modal) {
    botaoOk.addEventListener("click", function() {
        modal.hidden = true;
    });
}

const abas = document.querySelectorAll(".tab-btn");
const paineis = document.querySelectorAll(".tab-panel");

abas.forEach(function(aba) {
    aba.addEventListener("click", function() {

        abas.forEach(function(item) {
            item.classList.remove("active");
        });

        paineis.forEach(function(painel) {
            painel.hidden = true;
        });

        aba.classList.add("active");

        const nome = aba.dataset.tab;
        const painelAtivo = document.getElementById("tab-" + nome);

        if (painelAtivo) {
            painelAtivo.hidden = false;
        }
    });
});

const perguntas = [
    {
        pergunta: "Qual é a menor unidade que forma um polímero?",
        opcoes: ["Nucleotídeos", "Monômeros", "Proteínas", "Lipídios"],
        correta: 1
    },
    {
        pergunta: "Qual é uma das funções dos lipídios?",
        opcoes: ["Armazenar energia", "Guardar DNA", "Produzir oxigênio", "Formar proteínas"],
        correta: 0
    },
    {
        pergunta: "Qual carboidrato funciona como reserva energética das plantas?",
        opcoes: ["Celulose", "Lactose", "Amido", "Frutose"],
        correta: 2
    },
    {
        pergunta: "Qual ligação une os aminoácidos?",
        opcoes: ["Iônica", "Peptídica", "Metálica", "Covalente dupla"],
        correta: 1
    },
    {
        pergunta: "Qual base nitrogenada existe no RNA no lugar da timina?",
        opcoes: ["Citosina", "Guanina", "Adenina", "Uracila"],
        correta: 3
    }
];

const perguntaTexto = document.getElementById("questionText");
const alternativas = document.getElementById("answerList");
const contador = document.getElementById("quizCount");
const proxima = document.getElementById("nextQuestion");
const feedback = document.getElementById("quizFeedback");

let numeroPergunta = 0;
let pontos = 0;
let respondeu = false;
function mostrarPergunta() {
    if (!perguntaTexto) {
        return;
    }
    respondeu = false;
    perguntaTexto.textContent = perguntas[numeroPergunta].pergunta;
    contador.textContent = "Pergunta " +
        (numeroPergunta + 1) + " de " + perguntas.length;
    alternativas.innerHTML = "";
    feedback.textContent = "";
    proxima.disabled = true;
    perguntas[numeroPergunta].opcoes.forEach(function(opcao, indice) {
        const botao = document.createElement("button");
        botao.classList.add("answer-option");
        botao.textContent = String.fromCharCode(65 + indice) + " - " + opcao;
        botao.addEventListener("click", function() {
            verificarResposta(indice, botao);
        });
        alternativas.appendChild(botao);
    });
}

function verificarResposta(indice, botao) {
    if (respondeu) {
        return;
    }
    respondeu = true;
    const respostaCorreta = perguntas[numeroPergunta].correta;
    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach(function(item, i) {

        item.disabled = true;

        if (i === respostaCorreta) {
            item.classList.add("correct");
        }

    });

    if (indice === respostaCorreta) {
        pontos++;
        feedback.textContent = "Muito bem! Você acertou!";

    } else {
        botao.classList.add("wrong");
        feedback.textContent = "Resposta incorreta! Tente estudar mais esse conteúdo.";

    }

    proxima.disabled = false;

}

if (proxima) {

    proxima.addEventListener("click", function() {

        numeroPergunta++;

        if (numeroPergunta < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    });
}

function mostrarResultado() {

    document.getElementById("quizArea").hidden = true;
    document.getElementById("quizResult").hidden = false;
    document.getElementById("scoreValue").textContent =
        pontos + "/" + perguntas.length
    document.getElementById("resultTitle").textContent =
        pontos >= 4 ? "Muito bem!" : "Continue estudando!";
    document.getElementById("resultText").textContent =
        "Você acertou " + pontos + " de " + perguntas.length + " perguntas.";

}

const reiniciar = document.getElementById("restartQuiz");

if (reiniciar) {

    reiniciar.addEventListener("click", function() {

        numeroPergunta = 0;
        pontos = 0;

        document.getElementById("quizArea").hidden = false;

        document.getElementById("quizResult").hidden = true;

        mostrarPergunta();

    });

}
mostrarPergunta();
