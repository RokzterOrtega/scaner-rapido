// background.js
// Escucha el clic en el icono de la extensión
/*
chrome.action.onClicked.addListener((tab) => {          // Inyecta el script de contenido en la pestaña activa
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    }).then(() => {
        console.log("Content script injected");
    }).catch(err => console.error("Error injecting content script:", err));
}); 
     YA NO */


// Escucha mensajes del content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "notifyChange") {
        console.log("Received change notification:", request);
        // Muestra una notificación
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png", // Usa un icono si lo tienes
            title: "Cambio Detectado en la Celda",
            message: `El valor de la celda ha cambiado de "${request.oldValue}" a "${request.newValue}".`,
            priority: 1
        });
    }
});
/*
window.onbeforeunload = function (e) {
    console.log("La pagina se actualizo");
};*/