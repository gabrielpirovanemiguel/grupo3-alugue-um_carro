document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura o ID do carro que veio pela URL (?id=X)
    const urlParams = new URLSearchParams(window.location.search);
    const carroId = urlParams.get("id");

    // Caso não tenha nenhum ID na URL, podemos redirecionar para o catálogo ou usar o ID 21 (Aston Martin) como padrão de testes
    if (!carroId) {
        console.warn("Nenhum ID de carro foi especificado na URL. Carregando ID 21 por padrão.");
        carregarDadosDoCarro(21);
        return;
    }

    carregarDadosDoCarro(carroId);
});

// 2. Função que faz a requisição para o seu json-server local
async function carregarDadosDoCarro(id) {
    try {
        // Como o json-server roda na porta 3001, acessamos a rota correta para o id do veículo
        const resposta = await fetch(`http://localhost:3001/carros/${id}`);

        if (!resposta.ok) {
            throw new Error("Não foi possível encontrar este veículo no banco de dados.");
        }

        const carro = await resposta.json();

        // 3. Aplica os dados nos elementos HTML da página
        atualizarInterface(carro);

    } catch (erro) {
        console.error("Erro ao sincronizar dados do carro:", erro);
        alert("Erro ao carregar as especificações deste veículo.");
    }
}

// 4. Função que manipula a árvore do DOM e insere os textos/imagens
function atualizarInterface(carro) {
    // Nome e título das páginas
    document.title = `${carro.nome} - Detalhes do Veículo`;
    document.getElementById("index_carro").textContent = carro.nome;
    document.getElementById("nome_carro").textContent = carro.nome;

    // Subtítulo estilizado (Universo + Ano)
    document.getElementById("subtitulo_carro").textContent = `${carro.universo_origem} (${carro.ano_obra})`;

    // Altera a foto do veículo
    const fotoCarro = document.getElementById("foto_carro");
    fotoCarro.src = carro.url_imagem;
    fotoCarro.alt = `Foto do veículo ${carro.nome}`;

    // Tag de Categoria (Deixa a primeira letra maiúscula)
    const marcacaoCategoria = document.getElementById("marcação_categoria");
    marcacaoCategoria.textContent = carro.categoria.charAt(0).toUpperCase() + carro.categoria.slice(1);

    // Formata o valor do aluguel para o padrão brasileiro (R$ X.XXX,XX)
    const valorFormatado = carro.valor_aluguel_dia.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    document.getElementById("preco_carro").textContent = valorFormatado;

    // Atualiza o Status de Disponibilidade em ambos os lugares do HTML
    const badgesStatus = document.querySelectorAll(".status_carro");
    let textoStatus = "Disponível";

    if (carro.status_disponibilidade === "alugado") {
        textoStatus = "Alugado";
    } else if (carro.status_disponibilidade === "manutencao") {
        textoStatus = "Em Manutenção";
    }

    badgesStatus.forEach(badge => {
        // Remove o texto e reconstrói mantendo o nó de ícone caso ele exista
        const icone = badge.querySelector("span");
        badge.innerHTML = "";
        if (icone) badge.appendChild(icone);
        badge.appendChild(document.createTextNode(` ${textoStatus}`));

        // Altera as cores dinamicamente baseado no status para o CSS reconhecer
        badge.setAttribute("data-status", carro.status_disponibilidade);
    });

    // Como o JSON não possui campos internos para motor/câmbio etc.,
    // nós limpamos ou adaptamos dinamicamente os cards de especificações
    document.getElementById("dado_especificacao").textContent = carro.universo_origem;
    document.getElementById("espec-potencia").textContent = `${carro.ano_obra}`;
    document.getElementById("espec-tempo").textContent = carro.categoria;
    document.getElementById("espec-gadgets").textContent = "Nenhum";
    document.getElementById("espec-cor").textContent = "Original da Obra";
    document.getElementById("espec-cambio").textContent = "Automático/Manual";
}

// Aguarda o carregamento do DOM para interceptar o clique no botão de reserva
document.addEventListener("DOMContentLoaded", () => {
    const botaoReservar = document.getElementById("botao_reservar");

    if (botaoReservar) {
        botaoReservar.addEventListener("click", () => {
            // Pega o ID atual que está na URL da página de detalhes
            const urlParams = new URLSearchParams(window.location.search);
            const carroId = urlParams.get("id");

            if (carroId) {
                // Redireciona para a página de reservas passando o ID do carro como parâmetro
                // Certifique-se de ajustar o caminho da pasta se a sua estrutura for diferente (ex: ../reservas/reserva.html)
                window.location.href = `../pagina_reserva/PaginaReserva.html?id=${carroId}`;
            } else {
                alert("Erro: Não foi possível identificar o veículo para reserva.");
            }
        });
    }
});

