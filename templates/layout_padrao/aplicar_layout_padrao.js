import {
    htmlHeader,
    htmlFooter
} from './elementos_html.js'

// 1. Descobre em qual pasta a página atual está rodando
const caminhoAtual = window.location.pathname;

// 2. Define o prefixo correto para voltar até a raiz do projeto
// Se estivermos dentro de uma subpasta (como /catalogo/ ou /reservas/), precisamos colocar "../"
let prefixoRaiz = "./";

// Se o caminho contiver alguma subpasta, usamos "../" para voltar para a raiz
if (caminhoAtual.includes('/catalogo/') ||
    caminhoAtual.includes('/Contato/') ||
    caminhoAtual.includes('/inicio/') ||
    caminhoAtual.includes('/pagina_alugar_carro/') ||
    caminhoAtual.includes('/pagina_individual_carro/') ||
    caminhoAtual.includes('/reservas/') ||
    caminhoAtual.includes('/Sobre/')) {
    prefixoRaiz = "../";
}

// 3. Substitui as barras iniciais fixas pelo prefixo dinâmico que descobrimos
const headerCorrigido = htmlHeader
    .replace('href="/inicio/inicio.html"', `href="${prefixoRaiz}inicio/inicio.html"`)
    .replace('href="/catalogo/catalogo.html"', `href="${prefixoRaiz}catalogo/catalogo.html"`)
    .replace('href="/reservas/reservas.html"', `href="${prefixoRaiz}reservas/reservas.html"`)
    .replace('href="/Sobre/Sobre.html"', `href="${prefixoRaiz}Sobre/Sobre.html"`)
    .replace('href="/Contato/Contato.html"', `href="${prefixoRaiz}Contato/Contato.html"`)
    // Aproveita e corrige também o botão "Explorar" para ir direto para o catálogo
    .replace('href="" id="btn_explorar"', `href="${prefixoRaiz}catalogo/catalogo.html" id="btn_explorar"`);

const footerCorrigido = htmlFooter
    .replace('href="/catalogo/catalogo.html"', `href="${prefixoRaiz}catalogo/catalogo.html"`)
    // Corrigido para a sua pasta real que é 'reservas/reservas.html'
    .replace('href="/reserva/reserva.html"', `href="${prefixoRaiz}reservas/reservas.html"`);

// 4. Injeta os elementos corrigidos na tela
const header = document.getElementById('header');
const footer = document.getElementById('footer');

if (header) header.innerHTML = headerCorrigido;
if (footer) footer.innerHTML = footerCorrigido;


