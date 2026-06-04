document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================================================
    // 1. LÓGICA DO CARROSSEL
    // ==========================================================================
    const slides = document.querySelectorAll(".carousel-slide");
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    if (totalSlides === 0) return;

    function updateCarousel(nextIndex) {
        slides[currentSlide].classList.remove("active");

        if (nextIndex >= totalSlides) {
            currentSlide = 0;
        } else if (nextIndex < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = nextIndex;
        }

        slides[currentSlide].classList.add("active");
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(function() {
            updateCarousel(currentSlide + 1);
        }, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    if (btnNext) {
        btnNext.addEventListener("click", function() {
            updateCarousel(currentSlide + 1);
            resetAutoPlay();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", function() {
            updateCarousel(currentSlide - 1);
            resetAutoPlay();
        });
    }

    startAutoPlay();

    // ==========================================================================
    // 2. LÓGICA DO FORMULÁRIO PARA O WHATSAPP
    // ==========================================================================
    const formDoacao = document.getElementById("formDoacao");

    if (formDoacao) {
        formDoacao.addEventListener("submit", function (e) {
            e.preventDefault();

            const numeroWhatsApp = "5579998078987"; 

            const nome = document.getElementById("inputNome").value;
            const telefone = document.getElementById("inputTelefone").value;
            const endereco = document.getElementById("inputEndereco").value;
            const cidade = document.getElementById("inputCidade").value;
            const itens = document.getElementById("inputItens").value;

            const textoMensagem = `Olá! Gostaria de solicitar uma coleta para doação.%0A%0A` +
                `*Nome:* ${nome}%0A` +
                `*Telefone:* ${telefone}%0A` +
                `*Endereço:* ${endereco}%0A` +
                `*Cidade:* ${cidade}%0A` +
                `*Itens para Doação:* ${itens}`;

            const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoMensagem}`;

            window.open(urlWhatsApp, "_blank");
        });
    }

    // ==========================================================================
    // 3. LÓGICA DA CALCULADORA DE IMPACTO
    // ==========================================================================
    const tipoItem = document.getElementById("tipoItem");
    const quantidade = document.getElementById("quantidade");
    const resultadoImpacto = document.getElementById("resultadoImpacto");

    if (tipoItem && quantidade && resultadoImpacto) {
        // Função que faz o cálculo e muda o texto na tela
        function calcularImpacto() {
            const qtd = parseInt(quantidade.value);
            const tipo = tipoItem.value;

            // Se o campo estiver vazio ou for menor/igual a zero
            if (!qtd || qtd <= 0) {
                resultadoImpacto.innerHTML = "Informe uma quantidade válida.";
                return;
            }

            let mensagem = "";

            // Personalize as mensagens de impacto aqui!
            if (tipo === "Roupas") {
                mensagem = `👕 Com <b>${qtd}</b> roupas, você ajudará cerca de <b>${Math.ceil(qtd / 3)}</b> famílias a se agasalharem!`;
            } else if (tipo === "Alimentos") {
                mensagem = `🍲 Com <b>${qtd}</b> itens de alimentos, você garante cerca de <b>${qtd * 2}</b> refeições na mesa de quem precisa!`;
            } else if (tipo === "Brinquedos") {
                mensagem = `🧸 Com <b>${qtd}</b> brinquedos, você vai fazer o dia de <b>${qtd}</b> crianças muito mais feliz!`;
            } else if (tipo === "Higiene") {
                mensagem = `🧼 Com <b>${qtd}</b> itens de higiene, você ajuda <b>${Math.ceil(qtd / 2)}</b> famílias com cuidados básicos de saúde.`;
            }

            resultadoImpacto.innerHTML = mensagem;
        }

        // Executa a função sempre que o usuário digitar um número ou mudar a opção no menu
        quantidade.addEventListener("input", calcularImpacto);
        tipoItem.addEventListener("change", calcularImpacto);
    }

    // ==========================================================================
    // 4. LÓGICA DO BOTÃO COPIAR CHAVE PIX
    // ==========================================================================
    const copiarPixBtn = document.getElementById("copiarPix");
    const chavePixTexto = document.getElementById("chavePix");

    if (copiarPixBtn && chavePixTexto) {
        copiarPixBtn.addEventListener("click", function () {
            // Pega o texto de dentro da tag, removendo espaços extras
            const textoChave = chavePixTexto.innerText.trim();

            // Copia para a área de transferência do sistema
            navigator.clipboard.writeText(textoChave)
                .then(() => {
                    // Muda temporariamente o texto do botão para dar um feedback visual
                    const textoOriginal = copiarPixBtn.innerText;
                    copiarPixBtn.innerText = "Chave Copiada! ✓";
                    copiarPixBtn.style.backgroundColor = "#1B5E20"; // Deixa o verde mais escuro

                    // Volta o botão ao normal depois de 2 segundos
                    setTimeout(() => {
                        copiarPixBtn.innerText = textOriginal;
                        copiarPixBtn.style.backgroundColor = ""; // Volta para a cor padrão do CSS
                    }, 2000);
                })
                .catch(err => {
                    console.error("Erro ao copiar chave: ", err);
                    alert("Não foi possível copiar automaticamente. Copie manualmente: " + textoChave);
                });
        });
    }

    // ==========================================================================
// 5. CARROSSEL DE DEPOIMENTOS
// ==========================================================================
const depSlides = document.querySelectorAll(".depoimento-slide");
const depPrev = document.getElementById("depPrev");
const depNext = document.getElementById("depNext");
const depDotsContainer = document.getElementById("depDots");

let depAtual = 0;
let depInterval;

// Cria os dots
depSlides.forEach(function(_, i) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", function() {
        mudarDepoimento(i);
        resetDepInterval();
    });
    depDotsContainer.appendChild(dot);
});

depSlides[0].classList.add("active");

function mudarDepoimento(index) {
    depSlides[depAtual].classList.remove("active");
    depDotsContainer.children[depAtual].classList.remove("active");

    if (index >= depSlides.length) depAtual = 0;
    else if (index < 0) depAtual = depSlides.length - 1;
    else depAtual = index;

    depSlides[depAtual].classList.add("active");
    depDotsContainer.children[depAtual].classList.add("active");
}

function resetDepInterval() {
    clearInterval(depInterval);
    depInterval = setInterval(function() { mudarDepoimento(depAtual + 1); }, 4000);
}

depNext.addEventListener("click", function() { mudarDepoimento(depAtual + 1); resetDepInterval(); });
depPrev.addEventListener("click", function() { mudarDepoimento(depAtual - 1); resetDepInterval(); });

depInterval = setInterval(function() { mudarDepoimento(depAtual + 1); }, 4000);
});