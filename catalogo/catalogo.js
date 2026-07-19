import { obterCarrosPaginado, pesquisarNome } from '/templates/js/api.js';
import {
    fazerCard,
    adicionarBotoesPaginacao,
    pesquisarPagina
} from './catalogo_util.js'

const sessaoCards = document.querySelector('.sessao_cards');
const containerSetas = document.querySelector('.paginas');
const containerNumeros = document.querySelector('.botao_paginas');
const botoesSeta = document.querySelectorAll('.seta');
const botoesNumero = document.querySelectorAll('.botao_numero');
const containerFiltro = document.querySelector('.filtro');
const botoesFiltro = document.querySelectorAll('.botao_filtro');
const inputFiltro = document.querySelector('#nome_filtro');
var paginaAtual;
var termoPesquisa;
var query;

document.addEventListener('DOMContentLoaded', async function () {
    paginaAtual = 1;
    const response = await obterCarrosPaginado(1);
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, containerNumeros, 1, botoesSeta[0], botoesSeta[1]);
});

containerNumeros.addEventListener('click', async function (event) {
    if (!event.target.classList.contains('botao_numero')) return;
    event.preventDefault();
    paginaAtual = parseInt(event.target.textContent);
    await injetar(paginaAtual, query, termoPesquisa);
});

inputFiltro.addEventListener('input', async function (event) {
    const valor = event.target.value.trim();
    valor === '' ? termoPesquisa = null : termoPesquisa = valor;
    await injetar(paginaAtual, query, termoPesquisa);
})

containerFiltro.addEventListener('click', async function (event) {
    if (event.target.classList.contains('categoria')) {
        paginaAtual = 1;
        desfocarBotoes(botoesFiltro);
        query = `categoria=${event.target.value}`;
        await injetar(paginaAtual, query, termoPesquisa);
        event.target.classList.add('ativo');
        return;
    } else if (event.target.classList.contains('botao_filtro')) {
        paginaAtual = 1;
        if (event.target.value === 'indisponivel') {
            desfocarBotoes(botoesFiltro);
            query = 'status_disponibilidade=alugado&status_disponibilidade=manuntencao';
            await injetar(paginaAtual, query, termoPesquisa);
            event.target.classList.add('ativo');
        } else if (event.target.value === 'disponivel') {
            desfocarBotoes(botoesFiltro);
            query = 'status_disponibilidade=disponivel';
            await injetar(paginaAtual, query, termoPesquisa);
            event.target.classList.add('ativo')

        } else {
            desfocarBotoes(botoesFiltro);
            event.target.classList.add('ativo');
            injetar(paginaAtual, query, termoPesquisa);
        }
        return;

    } return;

});

containerSetas.addEventListener('click', async function (event) {
    if (event.target.classList.contains('desativado')) return;
    if (event.target.classList.contains('botao_voltar')) {
        paginaAtual--;
        await injetar(paginaAtual, query, termoPesquisa);
    } else if (event.target.classList.contains('botao_avancar')) {
        paginaAtual++;
        await injetar(paginaAtual, query, termoPesquisa);
    } else return;
})

async function injetar(pagina, query = null, termoPesquisa = null) {
    let response;
    if (termoPesquisa) {
        response = await pesquisarNome(pagina, termoPesquisa, query)
    } else {
        response = await obterCarrosPaginado(pagina, query);
    }
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, containerNumeros, pagina, botoesSeta[0], botoesSeta[1]);
}

function desfocarBotoes(botoes) {
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    })
}

