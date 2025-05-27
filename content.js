// content.js

// !!! MUY IMPORTANTE !!!
const CELL_SELECTOR = 'td:nth-child(1) tr:nth-child(1)'; // Ejemplo: '#miTabla td:nth-child(0) tr:nth-child(1)'

let targetCell = null;
let lastKnownValue = null;
let observer = null;

function findAndObserveCell() {
    targetCell = document.querySelector(CELL_SELECTOR);

    if (!targetCell) {
        console.warn(`Monitor de Celda: No se encontró el elemento con el selector "${CELL_SELECTOR}". Reintentando en 5 segundos...`);
        // Si no se encuentra, intenta de nuevo después de un tiempo
        setTimeout(findAndObserveCell, 5000);
        return;
    }

    console.log("Monitor de Celda: Elemento encontrado. Iniciando observación.");

    // Obtener el valor inicial
    lastKnownValue = targetCell.textContent.trim();
    console.log("Monitor de Celda: Valor inicial:", lastKnownValue);
    sessionStorage.setItem("AL1", lastKnownValue);
    let ALRT1 = sessionStorage.getItem("AL1");
    console.log("Dato", ALRT1, "guardado en memoria temporal"); //Se guarda el dato de la celda en la memoria temporal

    if (ALRT1 == "Alerts: 0/0") {

        console.log("Todo va muy bien :D")

        var alarma = document.getElementById("audio");

        audio.play();

    } else {

        alert("CUIDADO !!!! \n Un Dispositivo esta fuera de Linea ")
        alert(" !!!!!!  SI DESEAS TOMAR EVIDENCIA DE ESTA ALERTA HAZLO DE NO SER ASI CIERRA ESTA ALERTA !!!!!!")

        var alarma = document.getElementById("audio");

        audio.play();

    }
    // Configurar el MutationObserver
    observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Solo nos interesan los cambios de texto o cambios en subárboles que puedan afectar el texto, por ahora
            if (mutation.type === 'characterData' || mutation.type === 'childList' || mutation.type === 'subtree') {
                const currentValue = targetCell.textContent.trim();

                // Compara el valor actual con el último valor conocido
                if (currentValue !== lastKnownValue) {
                    console.log(`Monitor de Celda: ¡Cambio detectado! De "${lastKnownValue}" a "${currentValue}".`);
                    alert("Algo esta pasando!!!!")

                    // Envía un mensaje al background script para que muestre la notificación
                    chrome.runtime.sendMessage({
                        action: "notifyChange",
                        oldValue: lastKnownValue,
                        newValue: currentValue
                    });

                    // Actualiza el último valor conocido
                    lastKnownValue = currentValue;
                }
            }
        });
    });

    // Notas de configuración de la observación:
    // subtree: true - Observa cambios en los descendientes del elemento objetivo
    // childList: true - Observa adiciones o eliminaciones de nodos hijos
    // characterData: true - Observa cambios en el contenido de texto de los nodos de texto
    observer.observe(targetCell, {
        subtree: true,
        childList: true,
        characterData: true
    });

    console.log("Monitor de Celda: Observador iniciado.");

    // Opcional: Envía un mensaje inicial al background para confirmar que la observación ha empezado
    chrome.runtime.sendMessage({
        action: "observationStarted",
        selector: CELL_SELECTOR
    });
}

// Inicia el proceso de encontrar y observar la celda
findAndObserveCell();