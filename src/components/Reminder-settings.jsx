
import React, { useEffect, useState } from "react";
import { speachesJourney } from "./motivationalSpeaches";

export default function ReminderSettings() {
    const [hora, setHora] = useState(
        () => localStorage.getItem("hora") || "20:00"
    );

    const [notificadoHoy, setNotificadoHoy] = useState(false);
    const [ultimoDia, setUltimoDia] = useState("");
    const [mensajeActual, setMensajeActual] = useState("");
    const [confirmado, setConfirmado] = useState(false);
    const [estadoConfirmacion, setEstadoConfirmacion] = useState("");
    // Guardamos la hora elegida por el usuario.
    useEffect(() => {
        localStorage.setItem("hora", hora);
    }, [hora]);

    // Pedimos permiso para mostrar notificaciones.
    useEffect(() => {
        if (
            "Notification" in window &&
            Notification.permission === "default"
        ) {
            Notification.requestPermission();
        }
    }, []);

    // Controlamos el horario del recordatorio.
    useEffect(() => {
        const comprobarHora = () => {
            const ahora = new Date();

            const dia = [
                ahora.getFullYear(),
                String(ahora.getMonth() + 1).padStart(2, "0"),
                String(ahora.getDate()).padStart(2, "0")
            ].join("-");

            // Si cambió el día, habilitamos una nueva notificación.
            if (dia !== ultimoDia) {
                setUltimoDia(dia);
                setNotificadoHoy(false);
            }

            const [horas, minutos] = hora.split(":").map(Number);

            const coincide =
                ahora.getHours() === horas &&
                ahora.getMinutes() === minutos;

            if (coincide && !notificadoHoy) {
                const indice = Math.floor(
                    Math.random() * speachesJourney.length
                );

                const frase = speachesJourney[indice];

                setMensajeActual(frase);
                mostrarNotificacion(frase);
                setNotificadoHoy(true);
            }
        };

        comprobarHora();

        const intervalo = setInterval(comprobarHora, 5000);

        return () => clearInterval(intervalo);
    }, [hora, notificadoHoy, ultimoDia]);

    const mostrarNotificacion = (frase) => {
        if (
            "Notification" in window &&
            Notification.permission === "granted"
        ) {
            new Notification("📣 Recordatorio Journey", {
                body: frase
            });
        }
    };

    const confirmarRecordatorio = async () => {
    if (!hora) {
        setEstadoConfirmacion("Elegí una hora para el recordatorio.");
        return;
    }

    if (!("Notification" in window)) {
        setEstadoConfirmacion(
            "Tu navegador no admite notificaciones."
        );
        return;
    }

    let permiso = Notification.permission;

    if (permiso === "default") {
        permiso = await Notification.requestPermission();
    }

    if (permiso !== "granted") {
        setEstadoConfirmacion(
            "Necesitás habilitar las notificaciones en el navegador."
        );
        return;
    }

    localStorage.setItem("hora", hora);
    setNotificadoHoy(false);
    setConfirmado(true);
    setEstadoConfirmacion(`¡Recordatorio confirmado para las ${hora}!`);
};

    return (
        <section className="reminder-settings">
            <h2>🔔 Recordatorio diario</h2>

            <label>
                Hora de tu recordatorio:
                <input
                    type="time"
                    value={hora}
                    onChange={(e) => {
                        setHora(e.target.value);
                        setNotificadoHoy(false);
                    }}
                />
        <button type="button" onClick={confirmarRecordatorio}>
                    Confirmar recordatorio
        </button>

        {estadoConfirmacion && (
            <p role="status">{estadoConfirmacion}</p>
)}
            </label>

            {mensajeActual && (
                <p>
                    <strong>Última frase:</strong> {mensajeActual}
                </p>
            )}
        </section>
    );
}
