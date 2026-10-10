console.log("Balanceo.js conectado correctamente");
//Control de tarjetas
document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.tarjeta-ejercicio');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const indicador = document.getElementById('indicador-tarjeta');
    
    let indiceActual = 0;

    function mostrarTarjeta(indice) {
        tarjetas.forEach(tarjeta => tarjeta.classList.remove('activa'));
        tarjetas[indice].classList.add('activa');
        indicador.textContent = `${indice + 1} de ${tarjetas.length}`;
        btnAnterior.disabled = (indice === 0);
        btnSiguiente.disabled = (indice === tarjetas.length -1);
    }

    btnAnterior.addEventListener('click', () => {
        if (indiceActual > 0) {
            indiceActual--;
            mostrarTarjeta(indiceActual);
        }
    });

    btnSiguiente.addEventListener('click', () => {
        if (indiceActual < tarjetas.length -1) {
            indiceActual++;
            mostrarTarjeta(indiceActual);
        }
    });

    mostrarTarjeta(indiceActual);

    const botonLimpiar = document.getElementById('limpiar');

if (botonLimpiar) {
    botonLimpiar.addEventListener('click', () => {
        // 1. Obtener la tarjeta que se está mostrando actualmente
        const tarjetaActiva = document.querySelector('.tarjeta-ejercicio.activa');
        
        if (tarjetaActiva) {
            // 2. Vaciar todos los inputs de número de esa tarjeta
            tarjetaActiva.querySelectorAll('input[type="number"]').forEach(input => {
                input.value = '';
            });

            // 3. Borrar el mensaje de resultado o alerta
            const resultado = tarjetaActiva.querySelector('div[id^="resultado"]');
            if (resultado) {
                resultado.innerHTML = '';
            }
        }
    });
}

});

//Datos del ejercicio
const reactivosFe= [
    {nombre: "Fe", elementos: {fe: 1}, id:"coeficiente1"},
    {nombre: "O2", elementos: {o: 2}, id:"coeficiente2"}
];
const productosFe= [
    {nombre: "Fe2O3", elementos: {fe: 2, o: 3}, id:"coeficiente3"},
];
const reactivosAgua= [
    {nombre: "H2", elementos: {h: 2}, id:"coeficiente4"},
    {nombre: "O2", elementos: {o: 2}, id:"coeficiente5"},
];
const productosAgua= [
    {nombre: "H2O", elementos: {h: 2, o: 1}, id:"coeficiente6"},
];
const reactivosZn = [
    {nombre: "Zn", elementos: {zn: 1}, id:"coeficiente7"},
    {nombre: "HCl", elementos: {h: 1, cl: 1}, id:"coeficiente8"},
];
const productosZn = [
    {nombre: "ZNCl2", elementos: {zn: 1, cl: 2}, id:"coeficiente9"},
    {nombre: "H2", elementos: {h: 2}, id:"coeficiente10"},
];
const productosCuatro = [
    {nombre: "HCL", elementos: {h: 1, cl: 1}, id:"coeficiente11"},
    {nombre: "Ca(OH)2", elementos: {ca: 1, o: 1 * 2, h: 1 * 2}, id:"coeficiente12"},
]
const reactivosCuatro = [
    {nombre: "CaCL2", elementos: {ca: 1, cl: 2}, id:"coeficiente13"},
    {nombre: "H20", elementos: {h: 2, o: 1}, id:"coeficiente14"},
]
const productosCinco = [
    {nombre: "Al2O3", elementos: {al: 2, o: 3}, id:"coeficiente15"},
    {nombre: "H2SO4", elementos: {h: 2, s: 1, o: 4}, id:"coeficientes16"},
]
const reactivosCinco = [
    {nombre: "Al2(SO4)3", elementos: {al: 2, s: 1 * 3, o: 4 * 3}, id:"coeficiente17"},
    {nombre: "H2O", elementos: {h: 2, o: 1}, id:"coeficiente18"},
]
const productosSeis = [
    {nombre: "P", elementos: {p: 1}, id:"coeficiente19"},
    {nombre: "O2", elementos: {o: 2}, id:"coeficiente20"},
]
const reactivosSeis = [
    {nombre: "P2O3", elementos: {p: 2, o: 3}, id:"coeficiente21"},
]
const productosSiete = [
    {nombre: "Na", elementos: {na: 1}, id:"coeficiente22"},
    {nombre: "H2O", elementos: {h: 2, o: 1}, id:"coeficiente23"},
]
const reactivosSiete = [
    {nombre: "NaOH", elementos: {na: 1, o: 1, h: 1}, id:"coeficiente24"},
    {nombre: "H2", elementos: {h: 2}, id:"coeficiente25"},
]
const productosOcho = [
    {nombre: "KClO3", elementos: {k: 1, cl: 1, o: 3}, id:"coeficiente26"},
    {nombre: "KCl", elementos: {k: 1, cl: 1}, id:"coeficeinte27"},
]
const reactivosOcho = [
    {nombre: "O2", elementos: {o: 2}, id:"coeficiente28"},
]
const productosNueve = [
    {nombre: "Fe", elementos: {fe: 1}, id:"coeficiente29"},
    {nombre: "HCl", elementos: {h: 1, cl: 1}, id:"coeficiente30"},
]
const reactivosNueve = [
    {nombre: "FeCl3", elementos: {fe: 1, cl:3}, id:"coeficiente31"},
    {nombre: "H2", elementos: {h: 2}, id:"coeficiente32"},
]
const productosDiez = [
    {nombre: "NaOH", elementos: {na: 1, o: 1, h: 1}, id:"coeficiente33"},
    {nombre: "CuCl2", elementos: {cu: 1, cl: 2}, id:"coeficiente34"},
]
const reactivosDiez = [
    {nombre: "Cu(OH)2", elementos: {cu: 1, o: 1 * 2, h: 1 * 2}, id:"coeficiente35"},
    {nombre: "NaCl", elementos: {na: 1, cl: 1}, id:"coeficiente36"},
]

    //Dato separado de lógica, con arreglo de array y función genérico, llaves, sumatoria de datos y comparación lógica, capa 1 función, definida una sola vez, sola.//
    function verificarBalanceo(reactivos, productos, idResultado) {
    const todasLasSustancias = [...reactivos, ...productos];

    for (const sustancia of todasLasSustancias) {
        const valorInput = document.getElementById(sustancia.id).value;

        if (valorInput === "") {
            document.getElementById(idResultado).innerHTML = "completa los coeficientes";
            return;
        }

    }


    const totales = {};
     for (const sustancia of reactivos) {
        const coef = Number (document.getElementById(sustancia.id).value);
         
        for (const elemento of Object.keys(sustancia.elementos)) {
            if (!totales[elemento]) {
                 totales[elemento] = 0;
            }
             totales[elemento] += sustancia.elementos[elemento] * coef
        }
    }
    const totalesProductos = {}; 
    for (const sustancia of productos) {
        const coef = Number (document.getElementById(sustancia.id).value);

        for (const elemento of Object.keys(sustancia.elementos)) {
            if (!totalesProductos[elemento]) {
                totalesProductos[elemento] = 0;
            }
             totalesProductos[elemento] += sustancia.elementos[elemento] * coef 
        }
        
    }
    //Comparación lógica//
    let mensaje = "";
    let balanceado = true;
    for (const elemento of Object.keys(totales)) {
    if (totales[elemento] !== totalesProductos[elemento]) {
            balanceado = false;
            mensaje += `El elemento "${elemento}" no esta balanceado. `;

        }
    }
    if (balanceado) {
            document.getElementById(idResultado).innerHTML = "La ecuación está balanceada correctamente";
        } else {
            document.getElementById(idResultado).innerHTML = mensaje;

        }

    }

//capa 3, concectar el botón, llamando a la función con los datos//
document.getElementById("verificar").addEventListener("click", function () {
    verificarBalanceo(reactivosFe, productosFe, "resultado");
});
document.getElementById("verificar2").addEventListener("click", function () {
    verificarBalanceo(reactivosAgua, productosAgua, "resultado2");
});
document.getElementById("verificar3").addEventListener("click", function () {
    verificarBalanceo(reactivosZn, productosZn, "resultado3")
})
document.getElementById("verificar4").addEventListener("click", function () {
    verificarBalanceo(reactivosCuatro, productosCuatro, "resultado4")
})
document.getElementById("verificar5").addEventListener("click", function () {
    verificarBalanceo(reactivosCinco, productosCinco, "resultado5")
})
document.getElementById("verificar6").addEventListener("click", function () {
    verificarBalanceo(reactivosSeis, productosSeis, "resultado6")
})
document.getElementById("verificar7").addEventListener("click", function () {
    verificarBalanceo(reactivosSiete, productosSiete, "resultado7")
})
document.getElementById("verificar8").addEventListener("click", function () {
    verificarBalanceo(reactivosOcho, productosOcho, "resultado8")
})
document.getElementById("verificar9").addEventListener("click", function () {
    verificarBalanceo(reactivosNueve, productosNueve, "resultado9")
})
document.getElementById("verificar10").addEventListener("click", function () {
    verificarBalanceo(reactivosDiez, productosDiez, "resultado10")
})





// Estructura HTML con inputs conectados por id. representación de fórmulas químicas como objteos de datos.  Lectura de valores del formulario.  Eventos.  Calculo de átomos.  Comparación lógica y retroalimentación visual.
