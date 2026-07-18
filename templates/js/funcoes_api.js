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

export async function obterCarrosPaginado(pagina = 1, query = null) {
    const limite = 12;
    try {
        let response;
        if (!query) {
            response = await fetch(`${urlBase}?_page=${pagina}&_limit=${limite}`);
        } else {
            response = await fetch(`${urlBase}?_page=${pagina}&_limit=${limite}&${query}`);
        }

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


export async function pesquisarNome(pagina, termo, query = null) {
    const limite = 12;
    const nome = termo.toLowerCase();
    try {
        let url = urlBase;
        if (query) url += `?${query}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ocorreu um erro: ${response.status}`);

        const carros = await response.json();
        const carrosFiltrados = carros.filter(carro =>
            carro.nome.toLowerCase().includes(nome) ||
            carro.universo_origem.toLowerCase().includes(nome)
        );

        const totalCarros = carrosFiltrados.length;
        const totalPaginas = Math.ceil(totalCarros / limite);
        const inicio = (pagina - 1) * limite;
        const dados = carrosFiltrados.slice(inicio, inicio + limite);

        return { dados, pagina, totalCarros, totalPaginas };
    } catch (erro) {
        console.error("Ocorreu um erro ao buscar os carros: ", erro);
        throw erro;
    }
}
