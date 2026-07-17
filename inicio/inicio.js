async function carregarDadosIntroducao() {
    try {
        const resposta = await fetch('http://localhost:3001/carros');
        const veiculos = await resposta.json();

        const introducaoContainer = document.getElementById('introducao_imagens_container');
    
        if (introducaoContainer) {
            introducaoContainer.innerHTML = ''; 
        
            const todosIds = veiculos.map(carro => carro.id); // Mapeia os ids

            const idsrandomizados = todosIds.sort(() => Math.random() - 0.5); // Randomiza os ids (com o - 0.5)

            const idsSorteados = idsrandomizados.slice(0, 4); //Pega apenas os primeiros 4 ids sorteados

            const veiculosBanner = veiculos.filter(carro => idsSorteados.includes(carro.id)); //Pega somente os ids sorteados

            veiculosBanner.forEach(carro => {
                const estaDisponivel = carro.status_disponibilidade === 'disponivel';  // Verifica a disponibilidade
                
                const tagStatus = estaDisponivel 
                    ? `<span class="tag_disponivel">● Disponível</span>` 
                    : `<span class="tag_indisponivel">● Indisponível</span>`;
                
                const bannerCard = `
                    <div class="card_imagem_banner">
                        <img src="${carro.url_imagem}" alt="${carro.nome}">
                        <div class="card_info">
                            <h4>${carro.nome}</h4>
                            ${tagStatus} 
                        </div>
                    </div>
                `; // Mostra no site
                introducaoContainer.innerHTML += bannerCard;
            });
        }

        

    } catch (erro) {
        console.error("Erro ao carregar os veículos:", erro);
    } // Caso de erro
}

carregarDadosIntroducao();


async function carregarDadosDestaques() {
    try{
        const resposta = await fetch('http://localhost:3001/carros');
        const veiculos = await resposta.json();

        const destaques_container = document.getElementById("card_destaques_container");

        const veiculosDestaque = veiculos.slice(0,4);

        let cardDestaques = '';

        veiculosDestaque.forEach((carro,index) => {
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
                        <h4>R$ ${carro.valor_aluguel_dia}</h4>
                    </div>

                    <div>
                        ${botaoAcao}
                        <button><i class="ph-ph-calendar-blank"></i></button>
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