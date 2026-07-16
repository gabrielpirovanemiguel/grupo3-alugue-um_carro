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

