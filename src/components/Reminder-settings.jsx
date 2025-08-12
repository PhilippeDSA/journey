import React from "react"
import { useEffect, useState } from "react";

export default function ReminderSettings() {
    const [hora, setHora] = useState(localStorage.getItem("hora") || "20:00");
    const [mensaje, setMensaje] = useState(localStorage.getItem("mensaje") || "Tu futuro depende de vos, en marcha. ¡Cada día cuenta!");
    const [notificadoHoy, setNotificadoHoy] = useState(false);

    useEffect(() => {
        localStorage.setItem("hora", hora);
        localStorage.setItem("mensaje", mensaje);
    }, [hora, mensaje]);

    useEffect(() => {
        if ("Notification" in window && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const ahora = new Date();
            const [h, m] = hora.split(":").map(Number);
            const horaObjetivo = new Date();
            horaObjetivo.setHours(h);
            horaObjetivo.setMinutes(m);
            horaObjetivo.setSeconds(0);

            const mismoDia = ahora.toDateString() === horaObjetivo.toDateString();
            const esHora = ahora.getHours() === horaObjetivo.getHours() && ahora.getMinutes() === horaObjetivo.getMinutes();

            if (mismoDia && esHora && !notificadoHoy) {
                mostrarNotificacion(mensaje);
                setNotificadoHoy(true);
            }

            if (ahora.getHours() === 0 && ahora.getMinutes() === 0) {
                setNotificadoHoy(false);
            }
        }, 6000); // chequea cada 6 segundos

        return () => clearInterval(interval);
    }, [hora, mensaje, notificadoHoy]);

    const mostrarNotificacion = (msg) => {
        if (Notification.permission === "granted") {
            new Notification("📣 Recordatorio Journey", { body: msg });
        }
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <h2>🔔 Recordatorio Diario</h2>
            <label>
                Hora:
                <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                />
            </label>
            <br />
            <label>
                Mensaje:
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Mensaje Motivacional ..."
                />
            </label>
        </div>
    );
}
