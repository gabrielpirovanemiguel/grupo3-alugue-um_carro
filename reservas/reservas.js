import {obterCarrosAlugados} from '/templates/js/funcoes_api.js';

document.addEventListener('DOMContentLoaded', async function(){
    const carros = await obterCarrosAlugados();
    carros.forEach(carro => {
        
    });
})

async function montarCard(carro, container) {
    const htmlCard = `
                    <div class="card_reserva">
                    <div class="reserva_info_principal">
                        <img src="" alt="Aston Martin DB5">
                        
                        <div class="reserva_textos">
                            <div class="reserva_titulo">
                                <h3>Aston Martin DB5 dasdasdadasadadadsaddsadadada</h3>
                                <span class="tag_status tag_ativa">Ativa</span>
                            </div>
                            <p class="reserva_detalhes">#CR241823 · 3 dias · R$ 9.600 · Matriz - São Paulo, SP</p>
                            <p class="reserva_datas">10/07/2026 — 13/07/2026</p>
                        </div>
                    </div>

                    <div class="reserva_acoes">
                        <button class="botao_acao botao_detalhes">Ver Detalhes</button>
                        <button class="botao_acao botao_cancelar">Cancelar</button>
                    </div>
                </div>
    `
}