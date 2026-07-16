import {obterCarroPorId,
        calcularDiasEntreDatas,
        atualizarSpanResumo

} from '/templates/js/funcoes.js';

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
const calcularValor = function(dias, valorDiario) { 
    const valorTotal = dias * valorDiario; 
    return valorTotal; 
}
const dataRetirada = document.getElementById('data_retirada');
const dataDevolucao = document.getElementById('data_devolucao');


document.addEventListener('DOMContentLoaded', async () => {
    const dados = await obterCarroPorId(9);
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



formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const dias = calcularDiasEntreDatas(dataRetirada.value, dataDevolucao.value);
    console.log(dias);
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




