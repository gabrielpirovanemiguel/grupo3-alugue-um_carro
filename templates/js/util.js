export function calcularDiasEntreDatas(data1, data2) {
    const d1 = new Date(data1);
    const d2 = new Date(data2);

    if (isNaN(d1) || isNaN(d2)) throw new Error('Data inválida fornecida');

    const diasMs = Math.abs(d2 - d1);
    const dias = diasMs / (1000 * 60 * 60 * 24);
    return dias;
};




