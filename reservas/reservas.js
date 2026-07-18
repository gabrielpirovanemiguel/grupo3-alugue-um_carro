import { obterCarrosAlugados } from '/templates/js/funcoes_api.js';
import { calcularDiasEntreDatas } from '/templates/js/funcoes_util.js';

const containerReservas = document.querySelector('.lista_reservas_container');

document.addEventListener('DOMContentLoaded', async function () {
    const carros = await obterCarrosAlugados();
    carros.forEach(carro => montarCard(carro, containerReservas));
})

function montarCard(carro, container) {
    const diasAluguel = calcularDiasEntreDatas(
        carro.locatario.data_inicio_aluguel, 
        carro.locatario.data_devolucao_prevista
    );
    
    const htmlCard = `
                <div class="card_reserva">
                    <div class="reserva_info_principal">
                        <img src="${carro.url_imagem}" alt="${carro.nome}">
                        
                        <div class="reserva_textos">
                            <div class="reserva_titulo">
                                <h3>${carro.nome}</h3>
                                <span class="tag_status tag_ativa">Ativa</span>
                            </div>
                            <p class="reserva_detalhes">#CR241823 · ${diasAluguel} dias · R$ ${diasAluguel * carro.valor_aluguel_diario}</p>
                            <p class="reserva_datas">${carro.locatario.data_inicio_aluguel} — ${carro.locatario.data_devolucao_prevista}</p>
                        </div>
                    </div>
                    <div class="reserva_acoes">
                        <button class="botao_acao botao_detalhes">Ver Detalhes</button>
                        <button class="botao_acao botao_cancelar">Cancelar</button>
                    </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', htmlCard);
}