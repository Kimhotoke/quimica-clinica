const parametros = [
    //serie blanca
    {id: "leucocito", min: 4.0, max: 10.0, nombre: "Leucocitos", alarmaId: "alarma"},
    {id: "neutrofilo", min: 50.00, max: 70.00, nombre: "Neutrófilos (%)", alarmaId: "alarma2"},
    {id: "linfocito", min:20.00, max: 40.00, nombre:"Linfocitos (%)", alarmaId: "alarmal"},
    {id: "monocito", min: 3.00, max: 12.00, nombre: "Monocitos (%)", alarmaId: "alarma3"},
    {id: "eosinofilo", min: 0.50, max: 5.00, nombre: "Eosinófilos (%)", alarmaId: "alarma4"},
    {id: "basofilo", min: 0.00, max: 1.00, nombre: "Basofilos (%)", alarmaId: "alarma5"},
    {id: "noNeutrofilo", min: 2.00, max: 7.00, nombre: "Neutrófilo (#)", alarmaId: "alarma6"},
    {id: "noLinfocito", min: 0.80, max: 4.00, nombre: "Linfocito (#)", alarmaId: "alarma7"},
    {id: "noMonocito", min: 0.12, max: 1.20, nombre: "Monocito (#)", alarmaId: "alarma8"},
    {id: "noEosinofilo", min: 0.02, max: 0.10, nombre: "Eosinófilo (#)", alarmaId: "alarma9"},
    {id: "noBasofilo", min: 0.00, max: 0.10, nombre: "Basofilo (#)", alarmaId: "alarma10"},

    //serie eritrocitaria
    {id: "eritrocito", min: 3.50, max: 5.50, nombre: "Eritrocito", alarmaId: "alarma11"},
    {id: "hemoglobina", min: 11.00, max: 16.00, nombre: "Hemoglobina", alarmaId: "alarma12"},
    {id: "hematocrito", min: 37.00, max: 46.00, nombre: "Hematocrito", alarmaId: "alarma13"},
    {id: "mcv", min: 80.00, max: 100.00, nombre: "MCV", alarmaId: "alarma14"},
    {id: "mhc", min: 27.00, max: 34.00, nombre: "MHC", alarmaId: "alarma15"},
    {id: "mchc", min: 32.00, max: 36.00, nombre: "MCHC", alarmaId: "alarma16"},
    
    //serie trombocitos
    {id: "plaqueta", min: 100.00, max: 300.00, nombre: "Plaquetas", alarmaId: "alarma17"},
    {id: "rdwCv", min: 11.0, max: 16.0, nombre: "RDW-CV", alarmaId: "alarma18"},
    {id: "rdwSd", min: 35.0, max: 56.0, nombre: "RDW-SD", alarmaId: "alarma19"},
    {id: "mpv", min: 6.5, max: 12.0, nombre: "MPV", alarmaId: "alarma20"},
    {id: "pdw", min: 15.0, max: 17.0, nombre: "DPW", alarmaId: "alarma21"},
    {id: "pct", min: 0.108, max: 0.282, nombre: "PCT", alarmaId: "alarma22"},
]

const botonLimpiar = document.getElementById("limpiar");
const botonVerificar = document.getElementById("verificar");
const contenedorRecomendaciones = document.getElementById("recomendaciones");

botonVerificar.addEventListener("click", () => {

    let alertas = [];
    let valoresIngresados = {};

    parametros.forEach(item => {
        const input = document.getElementById(item.id);
        const alarmaDiv = document.getElementById(item.alarmaId);

        if (!input || !alarmaDiv) return;

        const valor = parseFloat(input.value);


        if (isNaN(valor)) {
            alarmaDiv.textContent = "";
            return;
        }

        valoresIngresados[item.id] = valor;

        if (valor < item.min) {
            alarmaDiv.textContent = "Bajo";
            alarmaDiv.style.color = "#0066cc";
            alertas.push(`${item.nombre} se encuentra bajo (valor: ${valor}).`);

        }

        else if (valor > item.max) {
            alarmaDiv.textContent = "Alto";
            alarmaDiv.style.color = "red";
            alertas.push(`${item.nombre} se encuentra alto (valor: ${valor}).`);
        }

        else {
            alarmaDiv.textContent = "Normal";
            alarmaDiv.style.color = "green";
        }
    });

    //Recomendaciones clínicas

    let sugerenciasMedicas = [];

    //Serie roja

    if (valoresIngresados["hemoglobina"] < 11.0 || valoresIngresados["hematocrito"] < 37.00) {
        if (valoresIngresados["mcv"] < 80.00) {
            sugerenciasMedicas.push("Sospecha de <b>anemia microcítica</b>, frecuente en déficit de hierro, se recomienda evaluar perfil de hierro sérico y ferritina.");
        }
        else if (valoresIngresados["mcv"] > 100.00) {
            sugerenciasMedicas.push("Sospecha de <b>anemia macrocítica</b>, se recomienda valorar niveles de vitamina B12 y ácido fólico.");

        }
        else {
          sugerenciasMedicas.push("Hallazgo compatible con <b>anemia normocítica</b>, requiere seguimiento médico para descartar causas crónicas.");  
        }
    }

    //Serie Blanca

    if (valoresIngresados["leucocito"] > 10.0) {
        if (valoresIngresados["neutrofilo"] >70.00) {
            sugerenciasMedicas.push("<b>Leucocitosis con neutrofilia</b>, orienta habitualmente a un cuadro de origen bacteriano o inflamatorio agudo.");
        }
        else if (valoresIngresados["linfocito"] >40.00) {
            sugerenciasMedicas.push("<b>Leucocitosis con linfocitosis</b>, frecuente en procesos infecciosos virales");
        }
        else if (valoresIngresados["leucocito"] < 4.0) {
            sugerenciasMedicas.push("<b>Leucopenia</b>, valores bajos de defensas, requiere vigilancia médica y descartar toxicidad o cuadros virales.");
        }

        else {
            sugerenciasMedicas.push("<b>Leucocitosis</b>, se sugiere valoración clínica integral para identificar el foco inflamatorio o infeccioso.");
        }
    }

    //Serie Trombocitos

    if (valoresIngresados["plaqueta"] < 100.00) {
        sugerenciasMedicas.push("<b>Trombocitopenia</b>, recuento plaquetario disminuido; vigilar posibles signos de sangrado o hematomas espontáneos.");
    }

    else if (valoresIngresados["plaqueta"] > 350.00) {
        sugerenciasMedicas.push("<b>Trombocitosis</b>, plaquetas aumentadas; puede presentarse como reactiva a inflamación.");
    }

    //Renderizar reporte
    const totalDatosIngresados = Object.keys(valoresIngresados).length;

    if (alertas.length > 0) {
        contenedorRecomendaciones.innerHTML = `
                <div class="caja-recomendacion caja-alerta">
                    <h3>Hallazgos fuera de rango:</h3>
                    <ul><li>${alertas.join('</li><li>')}</li></ul>
                    ${sugerenciasMedicas.length > 0 ? `
                        <h3>Interpretación sugerida:</h3>
                        <ul><li>${sugerenciasMedicas.join('</li><li>')}</li></ul>
                    ` : ''}
                    <div class="nota-clinica">
                        <b>Nota aclaratoria:</b> Este reporte es generado con fines orientativos y didácticos. Los resultados deben ser validados e interpretados por un profesional de la salud.
                    </div>
                </div>
            `;
    }

    else if (totalDatosIngresados === 0) {
        // 1. Caso: No se ingresó ningún valor
        contenedorRecomendaciones.innerHTML = `
            <div class="caja-recomendacion caja-vacia">
                <h3>Atención</h3>
                <p>Favor de introducir los valores del hemograma antes de verificar.</p>
            </div>
        `;
    }

    else {
        contenedorRecomendaciones.innerHTML = `
                <div class="caja-recomendacion caja-exito">
                    <h3>Reporte Normal</h3>
                    <p>Todos los valores evaluados se encuentran dentro de los intervalos de referencia esperados.</p>
                </div>
            `;
    }

});



//Boton limpiar

botonLimpiar.addEventListener("click", () => {
    parametros.forEach(item => {
        const input = document.getElementById(item.id);
        const alarmaDiv = document.getElementById(item.alarmaId);

        if (input) input.value = "";
        if (alarmaDiv) {
            alarmaDiv.textContent = "";
            alarmaDiv.style.color = "";
        }
    });
    contenedorRecomendaciones.innerHTML = "";
});