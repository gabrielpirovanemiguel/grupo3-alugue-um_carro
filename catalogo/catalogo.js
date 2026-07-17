import { obterCarrosPaginado } from '/templates/js/funcoes_api.js';
import {
    fazerCard,
    adicionarBotoesPaginacao,
    pesquisarPagina

} from '/templates/js/funcoes_util.js'

const sessaoCards = document.querySelector('.sessao_cards');
const sessaoPagina = document.querySelector('.paginas');
const btnPaginas = document.querySelector('.btn_paginas');
const btnSetas = document.querySelectorAll('.seta');
const btnNumeros = document.querySelectorAll('.btn_numero');
var paginaAtual;

document.addEventListener('DOMContentLoaded', async function () {
    paginaAtual = 1;
    const response = await obterCarrosPaginado(1);
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, 1,  btnSetas[0], btnSetas[1]);
})

btnPaginas.addEventListener('click', async function (event) {
    if (!event.target.classList.contains('btn_numero')) return;
    event.preventDefault();
    paginaAtual = parseInt(event.target.textContent);
    await injetar(paginaAtual);
})


sessaoPagina.addEventListener('click', async function(event) {
    if (event.target.classList.contains('desativado')) return;
    console.log(paginaAtual)
    if (event.target.classList.contains('btn_voltar')) {
        paginaAtual --;
        await injetar(paginaAtual);
    } else if(event.target.classList.contains('btn_avancar')) {
        paginaAtual ++;
        await injetar(paginaAtual);
    } else return;
})

console.log(paginaAtual)

async function injetar(pagina) {
    const response = await obterCarrosPaginado(pagina);
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, pagina, btnSetas[0], btnSetas[1]);
}