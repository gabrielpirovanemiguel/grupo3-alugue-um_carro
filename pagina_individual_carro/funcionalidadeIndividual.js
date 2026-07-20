let estaDisponivel;

document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const carroId = urlParams.get("id");

    if (!carroId) {
        console.warn("Nenhum ID de carro foi especificado na URL. Carregando ID 21 por padrão.");
        carregarDadosDoCarro(21);
        return;
    }

    carregarDadosDoCarro(carroId);
});

async function carregarDadosDoCarro(id) {
    try {

        const resposta = await fetch(`http://localhost:3001/carros/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possível encontrar este veículo no banco de dados.");
        }

        const carro = await resposta.json();
        estaDisponivel = carro.status_disponibilidade;

        atualizarInterface(carro);

    } catch (erro) {
        console.error("Erro ao sincronizar dados do carro:", erro);
        alert("Erro ao carregar as especificações deste veículo.");
    }
}

function atualizarInterface(carro) {

    document.title = `${carro.nome} - Detalhes do Veículo`;
    document.getElementById("index_carro").textContent = carro.nome;
    document.getElementById("nome_carro").textContent = carro.nome;

    document.getElementById("subtitulo_carro").textContent = `${carro.universo_origem} (${carro.ano_obra})`;

    const descricaoElemento = document.getElementById("descricao_carro");
    if (carro.descricao) {
        descricaoElemento.text
    } else {
        descricaoElemento.textContent = `Acelere direto para a nostalgia! O lendário ${carro.nome} veio diretamente do universo de ${carro.universo_origem} para a nossa frota. Uma oportunidade única de sentir o poder e a magia de um verdadeiro ícone da ficção. Garanta sua reserva e viva essa experiência cinematográfica.`;
    }

    const fotoCarro = document.getElementById("foto_carro");
    fotoCarro.src = carro.url_imagem;
    fotoCarro.alt = `Foto do veículo ${carro.nome}`;

    const marcacaoCategoria = document.getElementById("marcação_categoria");
    marcacaoCategoria.textContent = carro.categoria.charAt(0).toUpperCase() + carro.categoria.slice(1);

    const valorFormatado = carro.valor_aluguel_dia.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    document.getElementById("preco_carro").textContent = valorFormatado;

    const badgesStatus = document.querySelectorAll(".status_carro");
    let textoStatus = "Disponível";

    if (carro.status_disponibilidade === "alugado") {
        textoStatus = "Alugado";
    } else if (carro.status_disponibilidade === "manutencao") {
        textoStatus = "Em Manutenção";
    }

    badgesStatus.forEach(badge => {

        const icone = badge.querySelector("span");
        badge.innerHTML = "";
        if (icone) badge.appendChild(icone);
        badge.appendChild(document.createTextNode(` ${textoStatus}`));

        badge.setAttribute("data-status", carro.status_disponibilidade);
    });

    document.getElementById("espec-origem").textContent = carro.universo_origem;
    document.getElementById("espec-ano").textContent = carro.ano_obra;
    document.getElementById("espec-categoria").textContent = carro.categoria.charAt(0).toUpperCase() + carro.categoria.slice(1);
    document.getElementById("espec-modificacoes").textContent = "Nenhum";
    document.getElementById("espec-estilo").textContent = "Original da Obra";
    document.getElementById("espec-transmissao").textContent = "Padrão";
}

document.addEventListener("DOMContentLoaded", () => {
    const botaoReservar = document.getElementById("botao_reservar");
    if(estaDisponivel !== 'disponivel') {
        botaoReservar.classList.add('desativado');
        botaoReservar.textContent = 'Indisponível';
        return;
    }

    if (botaoReservar) {
        botaoReservar.addEventListener("click", () => {

            const urlParams = new URLSearchParams(window.location.search);
            const carroId = urlParams.get("id");

            if (carroId) {

                window.location.href = `../pagina_alugar_carro/alugar_carro.html?id=${carroId}`;
            } else {
                alert("Erro: Não foi possível identificar o veículo para reserva.");
            }
        });
    }
});

