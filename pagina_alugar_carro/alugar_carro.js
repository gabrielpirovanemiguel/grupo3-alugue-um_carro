import { calcularDiasEntreDatas } from '/templates/js/funcoes_util.js';

import {
    obterCarroPorId,
    atualizarLocatario
} from '/templates/js/funcoes_api.js';

let valorDiario;
const inputNomeVeiculo = document.getElementById('veiculo');
const legendaImagemVeiculo = document.querySelector('.legenda');
const imagemVeiculo = document.getElementById('imagem_carro');
const spanValorDiario = document.getElementById('valor_diario');
const spanQuantidadeDias = document.getElementById('quantidade_dias');
const spanValorTotal = document.getElementById('valor_total');
const containerValorTotal = document.getElementById('span_total');
const formulario = document.querySelector('.formulario');
const inputsData = document.querySelector('.inputs_data');
const inputNome = document.getElementById('nome');
const inputCpf = document.getElementById('cpf');
const inputEmail = document.getElementById('email');
const inputTelefone = document.getElementById('telefone');
const inputLocalDevolucao = document.getElementById('local_devolucao');
const dataRetirada = document.getElementById('data_retirada');
const dataDevolucao = document.getElementById('data_devolucao');
const chavesQuery = new URLSearchParams(window.location.search);
const id = chavesQuery.get('id');



document.addEventListener('DOMContentLoaded', async () => {
    const dados = await obterCarroPorId(id);
    if (dados.status_disponibilidade === 'alugado') {
        window.location.href = '/catalogo/catalogo.html';
    }
    carregarDadosInicio(dados);
});

formulario.addEventListener('submit', async function (evento) {
    evento.preventDefault();
    const locatario = {
        nome_locatorio: inputNome.value,
        cpf_locatorio: inputCpf.value,
        emai_locatorio: inputEmail.value,
        telefone_locatorio: inputTelefone.value,
        local_retirada: inputLocalDevolucao.value,
        data_retirada: dataRetirada.value,
        data_devolucao: dataDevolucao.value
    }
    const dadosAtualizados = {
        locatario: locatario,
        status_disponibilidade: 'alugado'
    }
    try {
        await atualizarLocatario(dadosAtualizados, id);
        alert("Aluguel confirmado com sucesso!");
        window.location.href = '/catalogo/catalogo.html';
    } catch (erro) {
        alert("Não foi possível concluir o aluguel. Tente novamente.");
        console.error(erro);
    }

});

dataRetirada.addEventListener('change', function () {
    if (!dataDevolucao.value) return;
    const dias = calcularDiasEntreDatas(dataRetirada.value, dataDevolucao.value);
    atualizarContainerValorTotal(dias);
});

dataDevolucao.addEventListener('change', function () {
    if (!dataRetirada.value) return;
    const dias = calcularDiasEntreDatas(dataRetirada.value, dataDevolucao.value);
    atualizarContainerValorTotal(dias);

});

function atualizarContainerValorTotal(dias) {
    spanQuantidadeDias.textContent = dias;
    const valor = calcularValorReserva(dias, valorDiario);
    spanValorTotal.textContent = `R$${valor.toLocaleString('pt-br')}`;
    valor > 0 ? containerValorTotal.classList.remove('desativado') : containerValorTotal.classList.add('desativado');
}

function carregarDadosInicio(dados) {
    inputNomeVeiculo.value = dados.nome;
    legendaImagemVeiculo.textContent = dados.nome;
    imagemVeiculo.src = dados.url_imagem;
    imagemVeiculo.alt = `Foto do ${dados.nome}`;
    valorDiario = dados.valor_aluguel_dia;
    spanValorDiario.textContent = `R$${valorDiario.toLocaleString('pt-BR')}`;
    spanQuantidadeDias.textContent = '0';
    spanValorTotal.textContent = `R$0`;
    containerValorTotal.classList.add('container_desativado');
}

function calcularValorReserva(dias, valorDiario) {
    return dias * valorDiario;
}