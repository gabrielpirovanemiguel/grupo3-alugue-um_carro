import { obterCarrosAlugados, cancelarReserva } from '/templates/js/funcoes_api.js';
import { calcularDiasEntreDatas } from '/templates/js/funcoes_util.js';

const containerReservas = document.querySelector('.lista_reservas_container');
const botaoCancelar = document.querySelector('.botao_acao botao_cancelar');

document.addEventListener('DOMContentLoaded', async function () {
    const carros = await obterCarrosAlugados();
    carros.forEach(carro => montarCard(carro, containerReservas));
})

containerReservas.addEventListener('click', async function(evento) {
    if (!evento.target.classList.contains('botao_cancelar')) return;
    const carroAlterado = await cancelarReserva(parseInt(evento.target.value));
    const cardAtual = evento.target.closest('.card_reserva');
    cardAtual.innerHTML = '';
    montarCard(carroAlterado, cardAtual);
})

function montarCard(carro, container) {
    const diasAluguel = calcularDiasEntreDatas(
        carro.locatario.data_inicio_aluguel,
        carro.locatario.data_devolucao_prevista
    );
    const statusReserva = mostrarStatusReserva(carro);
    const dataInicio = new Date(carro.locatario.data_inicio_aluguel).toLocaleDateString('pt-br');
    const dataFinal = new Date(carro.locatario.data_devolucao_prevista).toLocaleDateString('pt-br');
    const htmlCard = `
                <div class="card_reserva">
                    <div class="reserva_info_principal">
                        <img src="${carro.url_imagem}" alt="${carro.nome}">
                        
                        <div class="reserva_textos">
                            <div class="reserva_titulo">
                                <h3>${carro.nome}</h3>
                                ${statusReserva[0]}
                            </div>
                            <p class="reserva_detalhes">#CR241823 · ${diasAluguel} dias · R$ ${(diasAluguel * carro.valor_aluguel_dia).toLocaleString('de-DE')}</p>
                            <p class="reserva_datas">${dataInicio} — ${dataFinal}</p>
                        </div>
                    </div>
                    <div class="reserva_acoes">
                        <button class="botao_acao botao_detalhes">Ver Detalhes</button>
                        ${statusReserva[1] ? `<button class="botao_acao botao_cancelar" value="${carro.id}">Cancelar</button>`: ''}
                    </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', htmlCard);
}


function mostrarStatusReserva(carro) {
    if (carro.locatario.nome === '') {
        return ['<span class="tag_status tag_cancelada">Cancelada</span>', false];
    } else if (new Date(carro.locatario.data_devolucao_prevista) < new Date()) {
        return ['<span class="tag_status tag_finalizada">Finalizada</span>', false];
    } return ['<span class="tag_status tag_ativa">Ativa</span>', true];
}