import {calcularDiasEntreDatas,
        atualizarSpanResumo,
} from '/templates/js/funcoes_util.js';

import {
    obterCarroPorId,
    atualizarLocatorio
} from '/templates/js/funcoes_api.js';

let valorDiario;
const inputNomeVeiculo = document.getElementById('veiculo');
const legendaImagem = document.querySelector('.legenda');
const imagemVeiculo = document.getElementById('imagem_carro');
const spanValorDiario = document.getElementById('valor_diario');
const quantidadeDias = document.getElementById('quantidade_dias');
const valorTotal = document.getElementById('valor_total');
const spanValorTotal = document.getElementById('span_total');
const formulario = document.querySelector('.form');
const inputsData = document.querySelector('.inputs_data');
const inputNome = document.getElementById('nome');
const inputCpf = document.getElementById('cpf');
const inputEmail = document.getElementById('email');
const inputTelefone = document.getElementById('telefone');
const inputLocalDevolucao = document.getElementById('local_devolucao');
const dataRetirada = document.getElementById('data_retirada');
const dataDevolucao = document.getElementById('data_devolucao');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const calcularValor = function(dias, valorDiario) { 
    const valorTotal = dias * valorDiario; 
    return valorTotal; 
}

document.addEventListener('DOMContentLoaded', async () => {
    const dados = await obterCarroPorId(id);
    if (dados.status_disponibilidade === 'alugado') {
        //TODO
    }
    inputNomeVeiculo.value = dados.nome;
    legendaImagem.textContent = dados.nome;
    imagemVeiculo.src = dados.url_imagem;
    console.log(dados.url_imagem);
    valorDiario = dados.valor_aluguel_dia;
    spanValorDiario.textContent = `R$${valorDiario}`;
    quantidadeDias.textContent = '0';
    valorTotal.textContent = `R$0`;
    spanValorTotal.classList.add('desativado');
});



formulario.addEventListener('submit', async function(e) {
    e.preventDefault();
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
        await atualizarLocatorio(dadosAtualizados, id);
        alert("Aluguel confirmado com sucesso!");
    } catch (erro) {
        alert("Não foi possível concluir o aluguel. Tente novamente.");
        console.error(erro);
    }
    
});

//Refatorar
dataRetirada.addEventListener('change', function() {
    if(!dataDevolucao.value) return;
    const dias = calcularDiasEntreDatas(dataRetirada.value, dataDevolucao.value);quantidadeDias.textContent = dias; 
    const valor = calcularValor(dias, valorDiario); 
    valorTotal.textContent = valor; 
    atualizarSpanResumo(valor, spanValorTotal);
})

dataDevolucao.addEventListener('change', function() {
    if(!dataRetirada.value) return;
    const dias = calcularDiasEntreDatas(dataRetirada.value, dataDevolucao.value);quantidadeDias.textContent = dias; 
    const valor = calcularValor(dias, valorDiario); 
    valorTotal.textContent = valor; 
    atualizarSpanResumo(valor, spanValorTotal);
})




