import { obterCarrosPaginado, obterCarrosPaginadoFiltrado } from '/templates/js/funcoes_api.js';
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
const containerFiltro = document.querySelector('.filtro');
var paginaAtual;

document.addEventListener('DOMContentLoaded', async function () {
    paginaAtual = 1;
    const response = await obterCarrosPaginado(1);
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, 1, btnSetas[0], btnSetas[1]);
});

btnPaginas.addEventListener('click', async function (event) {
    if (!event.target.classList.contains('btn_numero')) return;
    event.preventDefault();
    paginaAtual = parseInt(event.target.textContent);
    await injetar(paginaAtual);
});

containerFiltro.addEventListener('click', async function (event) {
    if (event.target.classList.contains('categoria')) {
        paginaAtual = 1;
        await injetarFiltrado(`categoria=${event.target.value}`);
        return;
    } else if (event.target.classList.contains('botao_filtro')) {
        paginaAtual = 1;
        if(event.target.value === 'indisponivel') {
            await injetarFiltrado('status_disponibilidade=alugado&status_disponibilidade=manuntencao');
            return;
        }
        await injetarFiltrado('status_disponibilidade=disponivel');
        return;
    } return;

});

sessaoPagina.addEventListener('click', async function (event) {
    if (event.target.classList.contains('desativado')) return;
    if (event.target.classList.contains('btn_voltar')) {
        paginaAtual--;
        await injetar(paginaAtual);
    } else if (event.target.classList.contains('btn_avancar')) {
        paginaAtual++;
        await injetar(paginaAtual);
    } else return;
})


async function injetar(pagina) {
    const response = await obterCarrosPaginado(pagina);
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, pagina, btnSetas[0], btnSetas[1]);
}

async function injetarFiltrado(query, pagina) {
    const response = await obterCarrosPaginadoFiltrado(query, pagina);
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, pagina, btnSetas[0], btnSetas[1]);
}