import {obterCarrosPaginado} from '/templates/js/funcoes_api.js';
import {fazerCard} from '/templates/js/funcoes_util.js'

const sessaoCards = document.querySelector('.sessao_cards');

document.addEventListener('DOMContentLoaded', async function() {
    const response = await obterCarrosPaginado(1);
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });

})

// 8 veículos encontrados