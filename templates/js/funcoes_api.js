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

export async function obterCarrosPaginado(pagina=1) {
        const limite = 12;
        try {
        const response = await fetch(`${urlBase}?_page=${pagina}&_limit=${limite}`);
        if (!response.ok) {
            throw new Error("Ocorreu um erro: ", response.status);
        }
        const carros = await response.json();
        const totalCarros = response.headers.get("X-Total-Count");
        return {
            dados: carros,
            pagina,
            totalCarros: parseInt(totalCarros),
            totalPaginas: Math.ceil(totalCarros / limite)
        };
    } catch (erro) {
        console.error("Ocorreu um erro ao buscar os carros: ", erro);
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

