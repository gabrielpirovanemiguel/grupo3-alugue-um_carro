async function carregarDadosIntroducao() {
    try {
        // Aponta para a porta do seu json-server e busca o nó "carros"
        const resposta = await fetch('http://localhost:3000/carros');
        const carros = await resposta.json();

        // Seleciona o container do banner
        const introducaoContainer = document.querySelector('.introducao_imagens');
        introducaoContainer.innerHTML = ''; // Limpa o container antigo

        // Pega os 4 primeiros carros para o mosaico (ex: McQueen, Mate, Doc, Sally)
        const veiculosBanner = carros.slice(0, 4);

        veiculosBanner.forEach(carro => {
            const estaDisponivel = carro.status_disponibilidade === 'disponivel';
            const tagStatus = estaDisponivel
                ? `<span class="tag_disponivel">● Disponível</span>`
                : `<span class="tag_indisponivel">● Ocupado</span>`;

            const bannerCard = `
                <a href="../pagina_individual_carro/PaginaIndividual.html?id=${carro.id}" class="card_imagem_banner">
                    <img src="${carro.url_imagem}" alt="${carro.nome}">
                    <div class="card_info">
                        <h4>${carro.nome}</h4>
                        ${tagStatus}
                    </div>
                </a>
            `;
            introducaoContainer.innerHTML += bannerCard;
        });

    } catch (erro) {
        console.error("Erro ao carregar os carros do banco de dados:", erro);
    }
}

carregarDadosIntroducao();


async function carregarDadosDestaques() {
    try{
        const resposta = await fetch('http://localhost:3000/carros');
        const veiculos = await resposta.json();

        const destaques_container = document.getElementById("card_destaques_container");

        const veiculosDestaque = veiculos.slice(3,7);

        let cardDestaques = '';

        veiculosDestaque.forEach((carro,index) => {
            
            const precoFormatado = Number(carro.valor_aluguel_dia).toLocaleString       ('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
            
            let iconeCategoria = 'ph-video-camera'; 
            let nomeCategoria = 'Filme';
            let classeCorCategoria = 'tag_filme';

            if (carro.categoria === 'desenho') {
                iconeCategoria = 'ph-star'; 
                nomeCategoria = 'Desenho';
                classeCorCategoria = 'tag_desenho'; 
            } else if (carro.categoria === 'série') {
                iconeCategoria = 'ph-television'; 
                nomeCategoria = 'Série';
                classeCorCategoria = 'tag_serie'; 
            }

            const estaDisponivel = carro.status_disponibilidade === 'disponivel';  
                
                const tagStatus = estaDisponivel 
                    ? `<span class="tag_disponivel">● Disponível</span>` 
                    : `<span class="tag_indisponivel">● Indisponível</span>`;

                const botaoAcao = estaDisponivel
                    ? `<button class="botao_alugar">Alugar</button>`
                    : `<button class="botao_indisponivel" disabled>Indisponível</button>` // desativar
        

        cardDestaques += `
            <div class="card_veiculos">
                <div class="card_imagem_destaques"> 
                    <img src="${carro.url_imagem}" alt="${carro.nome}">
                    <div class="tag_destaques">
                        <i class="ph-fill ph-star"></i> #${index + 1} da semana
                    </div>
                    <div class = "card_destaques_topo">
                        <span class="tag_categoria ${classeCorCategoria}"><i class="ph ${iconeCategoria}"></i> ${nomeCategoria}</span> 
                        ${tagStatus}
                    </div>
                </div>
                
                <div class="veiculos_destaques_info">
                    <div class="texto_veiculos">
                        <h3>${carro.nome}</h3>
                        <p>${carro.universo_origem} </p>
                    </div>
                    <div class="preco_veiculo">
                        <span>por dia</span>
                        <h4>${precoFormatado}</h4>
                    </div>

                    <div class="botoes_destaques">
                        ${botaoAcao}
                        <button class="botao_calendario"><i class="ph ph-calendar-blank"></i></button>
                    </div>
                
                </div>
            </div>
        `;
            
        });
        destaques_container.innerHTML=cardDestaques
    
    } catch (error) {
        console.error("Erro ao carregar os veículos:", erro);
        
    }
}

carregarDadosDestaques();

async function carregarDadosProcurados(){
    try {
        const resposta = await fetch('http://localhost:3000/carros');
        const veiculos = await resposta.json();

        const procuradosContainer = document.getElementById('container_cards_procurados');

        const veiculosProcurados  = veiculos.slice(3,8);

        let cardProcurados  = '';

        veiculosProcurados.forEach((carro,index) =>{
            const precoFormatado = Number(carro.valor_aluguel_dia).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
            const numeroFormatado = String(index +1).padStart(2,'0')
            
            let iconeCategoria = 'ph-video-camera'; 
            let nomeCategoria = 'Filme';
            let classeCorCategoria = 'tag_filme';

            if (carro.categoria === 'desenho') {
            iconeCategoria = 'ph-star'; 
                nomeCategoria = 'Desenho';
                classeCorCategoria = 'tag_desenho'; 
            } else if (carro.categoria === 'série') {
                iconeCategoria = 'ph-television'; 
                nomeCategoria = 'Série';
                classeCorCategoria = 'tag_serie'; 
            }

            const estaDisponivel = carro.status_disponibilidade === 'disponivel';
            const tagStatus = estaDisponivel 
                ? `<span class="tag_disponivel">● Disponível</span>` 
                : `<span class="tag_indisponivel">● Indisponível</span>`;
            
            cardProcurados += `
                <div class="card_procurados">
                    <span class="numero_ranking_procurados">${numeroFormatado}</span>
                    <div class="info_procurados">
                        <img src="${carro.url_imagem}" alt="${carro.nome}">
                        <div class="info_procurados_texto">
                            <h4>${carro.nome}</h4>
                            <p>${carro.universo_origem}</p>
                        </div>
                    </div>
                    <div class="informacoes_direita_procurados">
                        <span class="tag_categoria ${classeCorCategoria}">
                            <i class="ph ${iconeCategoria}"></i> ${nomeCategoria}
                        </span>
                        ${tagStatus}
                        <span class="preco_procurados">${precoFormatado}/dia</span>
                        
                        <a href="#" class="seta_procurados">
                            <i class="ph ph-caret-right"></i>
                        </a>
                    </div>
                </div>
            `  
        });
        procuradosContainer.innerHTML=cardProcurados


    } catch (error){
        console.error("Erro ao carregar os veículos:", error);

    }
}

carregarDadosProcurados();

