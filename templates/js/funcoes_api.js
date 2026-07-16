const urlBase = "http://localhost:3001/carros";


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