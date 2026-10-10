document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los botones con la clase pregunta
    const botonesPregunta = document.querySelectorAll('.pregunta');

    botonesPregunta.forEach(boton => {
        boton.addEventListener('click', () => {
            const contenedorPadre = boton.parentElement;

            // Se remueve la clase seleccionada de todos los botones hermanos
            const botonesHermanos = contenedorPadre.querySelectorAll('.pregunta');
            botonesHermanos.forEach(btn => btn.classList.remove('seleccionada'));

            boton.classList.add('seleccionada');
        });
    });

    // Verificar el botón "verificar"
    const botonesVerificar = document.querySelectorAll('.verificar');
    botonesVerificar.forEach(boton => {
        boton.addEventListener('click', () => {

            const articuloPadre = boton.closest('article');
            const respuestaCorrecta = articuloPadre.dataset.respuesta;
            const botonSeleccionado = articuloPadre.querySelector('.pregunta.seleccionada');
            const divResultado = articuloPadre.querySelector('.resultado');

            // Si no hay botón seleccionado
            if (!botonSeleccionado) {
                divResultado.textContent = "Por favor selecciona una opción";
                divResultado.classList.remove('correcto', 'incorrecto');
                divResultado.classList.add('incorrecto');
                return;
            }

            const respuestaUsuario = botonSeleccionado.textContent;

            if (respuestaUsuario === respuestaCorrecta) {
                // Obtenemos la nota del atributo data-nota
                const nota = articuloPadre.dataset.nota || "Sin información adicional.";

                // innerHTML con comillas invertidas
                divResultado.innerHTML = `
                    <strong>Enzima correcta, la reacción sigue avanzando.</strong>
                    <br>
                    <span class="nota">${nota}</span>
                `;
                divResultado.classList.remove('incorrecto');
                divResultado.classList.add('correcto');

                // Deshabilitación de botones
                botonSeleccionado.disabled = true;
                boton.disabled = true;

                mostrarSiguientePaso(articuloPadre);
                articuloPadre.classList.add('completado');
            } 
            else {
                divResultado.textContent = 'Incorrecto. Inténtalo de nuevo.';
                divResultado.classList.remove('correcto');
                divResultado.classList.add('incorrecto');
            }
        });
    });

    // Función para mostrar el siguiente paso
    function mostrarSiguientePaso(pasoActual) {
        let siguientePaso = pasoActual.nextElementSibling;

        while (siguientePaso && !siguientePaso.classList.contains('step-oculto')) {
            siguientePaso = siguientePaso.nextElementSibling;
        }

        if (siguientePaso) {
            siguientePaso.classList.remove('step-oculto');
            siguientePaso.scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (siguientePaso.classList.contains('fase-titulo')) {
                setTimeout(() => {
                    mostrarSiguientePaso(siguientePaso);
                }, 600);
            }
        }

        else {
            const resumen = documentgetElementById('resumen');

            if (resumen) {
                resumen.classList.remove('step-oculto');
                resumen.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }

    const botonReiniciar = document.getElementById('reiniciar');

    if (botonReiniciar) {
    botonReiniciar.addEventListener('click', () => {
        
        // 1. Ocultamos todos los pasos excepto el primero
        const todosLosPasos = document.querySelectorAll('.step');
        todosLosPasos.forEach((paso, index) => {
            if (index === 0) {
                // El primer paso siempre visible
                paso.classList.remove('step-oculto');
            } else {
                // Los demás se ocultan
                paso.classList.add('step-oculto');
            }
            // Quitamos la clase 'completado' de todos
            paso.classList.remove('completado');
        });

        // 2. Ocultamos el separador de fase y el resumen final
        document.querySelectorAll('.fase-titulo, .resumen-final').forEach(el => {
            el.classList.add('step-oculto');
        });

        // 3. Reactivamos todos los botones y limpiamos selecciones
        document.querySelectorAll('.pregunta').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('seleccionada');
        });

        // 4. Reactivamos los botones de verificar
        document.querySelectorAll('.verificar').forEach(btn => {
            btn.disabled = false;
        });

        // 5. Limpiamos los mensajes de resultado
        document.querySelectorAll('.resultado').forEach(div => {
            div.innerHTML = '';
            div.classList.remove('correcto', 'incorrecto');
        });

        // 6. Hacemos scroll hasta el inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }); 
}
});