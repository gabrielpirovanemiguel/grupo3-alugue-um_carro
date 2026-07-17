import { obterCarrosPaginado } from '/templates/js/funcoes_api.js';
import {
    fazerCard,
    adicionarBotoesPaginacao,
    pesquisarPagina

} from '/templates/js/funcoes_util.js'

const sessaoCards = document.querySelector('.sessao_cards');
const btnPaginas = document.querySelector('.btn_paginas');
const btnSetas = document.querySelectorAll('.seta');
const btnNumeros = document.querySelectorAll('.btn_numero');

document.addEventListener('DOMContentLoaded', async function () {
    const response = await obterCarrosPaginado(1);
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    if (adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, 1)) {
        btnSetas.forEach(btn => {
            btn.disabled = true;
        })
    };

})

btnPaginas.addEventListener('click', async function (event) {
    if (!event.target.classList.contains('btn_numero')) return;
    event.preventDefault();
    console.log(event.target.textContent);
    await injetar(event.target.textContent);
})


async function injetar(pagina) {
    const response = await obterCarrosPaginado(pagina);
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    if (adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, pagina)) {
        btnSetas.forEach(btn => {
            btn.disabled = true;
        })
    };

}


// 8 veículos encontrados