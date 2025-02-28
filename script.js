function calcularSistema() {
    let nomeCliente = document.getElementById("nomeCliente").value;
    let dataProjeto = document.getElementById("dataProjeto").value;
    let potInversor = parseFloat(document.getElementById("potInversor").value) * 1000;
    let potModulo = parseFloat(document.getElementById("potModulo").value);
    let numStrings = parseFloat(document.getElementById("numStrings").value);
    let tensaoModulo = parseFloat(document.getElementById("tensaoModulo").value);
    let overload = parseFloat(document.getElementById("overload").value) / 100 + 1;

    if (isNaN(potInversor) || isNaN(potModulo) || isNaN(numStrings) || isNaN(tensaoModulo) || isNaN(overload)) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    let potMaxInversor = potInversor * overload;
    let potMaxString = potMaxInversor / numStrings;
    let qtdModString = Math.floor(potMaxString / potModulo);
    let qtdMaxModInversor = qtdModString * numStrings;
    let tensaoString = qtdModString * tensaoModulo;

    let geracaoMensal = ((qtdMaxModInversor * potModulo) / 1000) * 0.8 * 30 * 5.68;
    let geracaoDiaria = geracaoMensal / 30;

    let resumo = `Nome do Cliente: ${nomeCliente}\n` +
                 `Data do Projeto: ${dataProjeto}\n\n` +
                 `Potência Nominal do Inversor: ${(potInversor / 1000).toFixed(2)} kW\n` +
                 `Potência Nominal do Módulo Solar: ${potModulo} W\n` +
                 `Potência Máxima do Inversor: ${potMaxInversor.toFixed(2)} W\n` +
                 `Quantidade Máxima de Módulos por String: ${qtdModString}\n` +
                 `Quantidade Máxima de Módulos que o Inversor Suporta: ${qtdMaxModInversor}\n` +
                 `Tensão por String: ${tensaoString.toFixed(2)} V\n` +
                 `Geração Diária: ${geracaoDiaria.toFixed(2)} kWh\n` +
                 `Geração Mensal: ${geracaoMensal.toFixed(2)} kWh`;

    document.getElementById("resumo").innerText = resumo;
}

function salvarPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let resumoTexto = document.getElementById("resumo").innerText;

    // Adiciona marca d'água diagonal
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(40);
    doc.text("Todos os cálculos devem ser ", 40, 160, { angle: 45 });
    doc.text("verificados pelo engenheiro ou ", 40, 180, { angle: 45 });
    doc.text("técnico responsável pela instalação", 40, 200, { angle: 45 });

    // Conteúdo principal
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(resumoTexto, 10, 20);
    doc.save("Projeto_Usina_Solar.pdf");
}
