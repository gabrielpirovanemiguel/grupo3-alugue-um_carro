import { obterCarrosPaginado, pesquisarNome } from '../templates/js/api.js';
import {
    fazerCard,
    adicionarBotoesPaginacao,
    pesquisarPagina,
    desfocarBotoes,
    atualizarCatalogo,
    ativarFiltro
} from './catalogo_util.js'

const containerSetas = document.querySelector('.paginas');
const containerBotaoPaginas = document.querySelector('.botao_paginas');
const botoesNumero = document.querySelectorAll('.botao_numero');
const containerFiltro = document.querySelector('.filtro');
const botoesFiltro = document.querySelectorAll('.botao_filtro');
const inputFiltro = document.querySelector('#nome_filtro');
var paginaAtual;
var termoPesquisa;
var query;

document.addEventListener('DOMContentLoaded', async function () {
    paginaAtual = 1;
    atualizarCatalogo(paginaAtual);
});

containerBotaoPaginas.addEventListener('click', async function (evento) {
    if (!evento.target.classList.contains('botao_numero')) return;
    evento.preventDefault();
    paginaAtual = parseInt(evento.target.textContent);
    await atualizarCatalogo(paginaAtual, query, termoPesquisa);
});

inputFiltro.addEventListener('input', async function (evento) {
    const valor = evento.target.value.trim();
    valor === '' ? termoPesquisa = null : termoPesquisa = valor;
    await atualizarCatalogo(paginaAtual, query, termoPesquisa);
})

containerFiltro.addEventListener('click', async function (evento) {
    if (!evento.target.classList.contains('botao_filtro')) return;
    const botaoAtual = evento.target.value;
    paginaAtual = 1;
    desfocarBotoes(botoesFiltro);
    switch (botaoAtual) {
        case "disponivel":
            query = 'status_disponibilidade=disponivel';
            break
        case "indisponivel":
            query = 'status_disponibilidade=alugado';
            break
        case "todos":
            query = null;
            break
        default:
            query = `categoria=${botaoAtual}`;
    }
    ativarFiltro(query, evento.target, paginaAtual, termoPesquisa);
});

containerSetas.addEventListener('click', async function (evento) {
    if (evento.target.classList.contains('desativado')) return;
    if (evento.target.classList.contains('botao_voltar')) {
        paginaAtual--;
        await atualizarCatalogo(paginaAtual, query, termoPesquisa);
    } else if (evento.target.classList.contains('botao_avancar')) {
        paginaAtual++;
        await atualizarCatalogo(paginaAtual, query, termoPesquisa);
    } else return;
})