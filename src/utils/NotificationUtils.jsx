export function solicitarPermisoNotification() {
    if (!("Notificacion " in window)) {
        alert("Este navegador no soporta notificaciones.");
        return;
    }
    if (Notification.permission === "granted") {
        return true;
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                return true;
            }
        });
    }
    return false;
}


export function mostrarNotificacion(titulo, mensaje) {
    if (Notification.permission === "granted") {
        new Notification(titulo, { body: message });
    }
}