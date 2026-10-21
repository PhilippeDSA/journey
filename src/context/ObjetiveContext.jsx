import React, { createContext, useEffect, useState } from "react";

export const ObjetiveContext = createContext();

export function ObjetiveProvider({ children }) {
    const [puntos, setPuntos] = useState(() => {
        const guardado = localStorage.getItem("puntos");
        return guardado ? parseInt(guardado) : 0;
    });

    const [racha, setRacha] = useState(() => {
        const guardada = localStorage.getItem("racha");
        return guardada ? parseInt(guardada) : 0;
    });

    const [ultimafecha, setUltimaFecha] = useState(() => {
        return localStorage.getItem("ultimaFecha") || null;
    });

    const [objetivos, setObjetivos] = useState(() => {
        try {
            const datosGuardados = localStorage.getItem("objetivos");
            return datosGuardados ? JSON.parse(datosGuardados) : [];
        } catch (error) {
            console.error("Error al leer los objetivos del LocalStorage", error);
            localStorage.removeItem("objetivos");
            return [];
        }
    });

    // Guardar automáticamente en localStorage al cambiar
    useEffect(() => {
        localStorage.setItem("puntos", puntos.toString());
        localStorage.setItem("racha", racha.toString());
        localStorage.setItem("ultimaFecha", ultimafecha);
        localStorage.setItem("objetivos", JSON.stringify(objetivos));
    }, [objetivos, puntos, racha, ultimafecha]);

    const agregarObjetivo = (objetivo) => {
        setObjetivos(prev => [...prev, objetivo]);
    };

    
const completarObjetivo = (id) => {
    const objetivo = objetivos.find((obj) => obj.id === id);

    if (!objetivo) return;

    const nuevoEstado = !objetivo.completado;

    // Actualizar el objetivo sin modificar otros estados dentro
    // de la función que recibe setObjetivos.
    setObjetivos((prev) =>
        prev.map((obj) =>
            obj.id === id
                ? { ...obj, completado: nuevoEstado }
                : obj
        )
    );

    // Los puntos cambian según la transición del objetivo.
    setPuntos((prev) =>
        Math.max(0, prev + (nuevoEstado ? 10 : -10))
    );

    // La racha se actualiza al completar, no al desmarcar.
    if (nuevoEstado) {
        const ahora = new Date();
        const hoy = [
            ahora.getFullYear(),
            String(ahora.getMonth() + 1).padStart(2, "0"),
            String(ahora.getDate()).padStart(2, "0")
        ].join("-");

        if (ultimafecha !== hoy) {
            const ayer = new Date(ahora);
            ayer.setDate(ayer.getDate() - 1);

            const fechaAyer = [
                ayer.getFullYear(),
                String(ayer.getMonth() + 1).padStart(2, "0"),
                String(ayer.getDate()).padStart(2, "0")
            ].join("-");

            setRacha((prev) =>
                ultimafecha === fechaAyer ? prev + 1 : 1
            );

            setUltimaFecha(hoy);
        }
    }
};


    const eliminarObjetivo = (id) => {
        setObjetivos((prev) => prev.filter((obj) => obj.id !== id));
    };

    return (
        <ObjetiveContext.Provider value={{
            objetivos,
            agregarObjetivo,
            completarObjetivo,
            eliminarObjetivo,
            puntos,
            racha,
            getNivel
        }}>
            {children}
        </ObjetiveContext.Provider>
    );
}

// 👇 Función de niveles
function getNivel(puntos) {
    if (puntos >= 100) return "Oro";
    if (puntos >= 50) return "Plata";
    if (puntos >= 20) return "Bronce";
    return "Principiante";
}
