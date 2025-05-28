// background.js
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
