import { obterCarrosPaginado, pesquisarNome} from '/templates/js/funcoes_api.js';
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
const btnFiltro = document.querySelectorAll('.botao_filtro');
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
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, 1, btnSetas[0], btnSetas[1]);
});

btnPaginas.addEventListener('click', async function (event) {
    if (!event.target.classList.contains('btn_numero')) return;
    event.preventDefault();
    paginaAtual = parseInt(event.target.textContent);
    await injetar(paginaAtual, query, termoPesquisa);
});

inputFiltro.addEventListener('input', async function (event) {
    const valor = event.target.value.trim();
    valor === ''? termoPesquisa = null: termoPesquisa = valor;
    await injetar(paginaAtual, query, termoPesquisa);
})

containerFiltro.addEventListener('click', async function (event) {
    if (event.target.classList.contains('categoria')) {
        paginaAtual = 1;
        desfocarBotoes(btnFiltro);
        query = `categoria=${event.target.value}`;
        await injetar(paginaAtual, query, termoPesquisa);
        event.target.classList.add('ativo');
        return;
    } else if (event.target.classList.contains('botao_filtro')) {
        paginaAtual = 1;
        if (event.target.value === 'indisponivel') {
            desfocarBotoes(btnFiltro);
            query = 'status_disponibilidade=alugado&status_disponibilidade=manuntencao';
            await injetar(paginaAtual, query, termoPesquisa);
            event.target.classList.add('ativo');
        } else if (event.target.value === 'disponivel') {
            desfocarBotoes(btnFiltro);
            query = 'status_disponibilidade=disponivel';
            await injetar(paginaAtual, query, termoPesquisa);
            event.target.classList.add('ativo')
            
        } else {
            desfocarBotoes(btnFiltro);
            event.target.classList.add('ativo');
            injetar(paginaAtual, query, termoPesquisa);
        }
        return;

    } return;

});

sessaoPagina.addEventListener('click', async function (event) {
    if (event.target.classList.contains('desativado')) return;
    if (event.target.classList.contains('btn_voltar')) {
        paginaAtual--;
        await injetar(paginaAtual, query);
    } else if (event.target.classList.contains('btn_avancar')) {
        paginaAtual++;
        await injetar(paginaAtual, query);
    } else return;
})

async function injetar(pagina, query=null, nomePesquisa=null) {
    let response;
    if(nomePesquisa){
        response = await pesquisarNome(pagina, nomePesquisa, query)
        termoPesquisa = nomePesquisa
    } else {
        response = await obterCarrosPaginado(pagina, query);
    }
    sessaoCards.innerHTML = '';
    response.dados.forEach(carro => {
        const card = fazerCard(carro);
        sessaoCards.insertAdjacentHTML('beforeend', card);
    });
    adicionarBotoesPaginacao(response.totalPaginas, btnPaginas, pagina, btnSetas[0], btnSetas[1]);
}




function desfocarBotoes(botoes) {
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    })
}