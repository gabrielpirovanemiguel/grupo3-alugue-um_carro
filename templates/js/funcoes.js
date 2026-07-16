const urlBase = "http://localhost:3001/carros"
export async function obterCarroPorId(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`);
        if (!response.ok) {
            throw new Error("Ocorreu um erro: ", response.status);
        }
        const carro = await response.json();
        return carro;
    } catch (erro) {
        console.error("Ocorreu um erro ao buscar o carro: ", erro);
        throw erro;
    }
}

export async function atualizarLocatorio(locatorio, id) {
    try {
        const response = await fetch(
            `${urlBase}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(locatorio)
        });
        if (!response.ok) {
            throw new Error("Ocorreu um erro: ", response.status);
        }


    } catch (erro) {
        console.error("Ocorreu um erro ao atualizar locador: ", erro);
        throw erro;
    }
}

export function calcularDiasEntreDatas(data1, data2) {
    const d1 = new Date(data1);
    const d2 = new Date(data2);

    if (isNaN(d1) || isNaN(d2)) {
        throw new Error('Data inválida fornecida');
        alert('Data inválida fornecida');
    }

    const diasMs = Math.abs(d2 - d1);
    const dias = diasMs / (1000 * 60 * 60 * 24);
    return dias;
};

export function atualizarSpanResumo(valor, span) {
    valor > 0 ? span.classList.remove('desativado') : span.classList.add('desativado');
}