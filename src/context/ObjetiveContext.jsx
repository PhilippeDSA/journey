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
        setObjetivos((prev) =>
            prev.map((obj) => {
                if (obj.id === id) {
                    const hoy = new Date().toISOString().slice(0, 10);
                    if (!obj.completado) {
                        if (ultimafecha !== hoy) {
                            const ayer = new Date();
                            ayer.setDate(ayer.getDate() - 1);
                            const ayerStr = ayer.toISOString().slice(0, 10);
                            if (ultimafecha === ayerStr) {
                                setRacha((prev) => prev + 1);
                            } else {
                                setRacha(1);
                            }
                            setUltimaFecha(hoy);
                        }
                    }
                    const nuevoEstado = !obj.completado;
                    setPuntos((prevPuntos) =>
                        nuevoEstado ? prevPuntos + 10 : prevPuntos - 10
                    );
                    return { ...obj, completado: nuevoEstado };
                }
                return obj;
            })
        );
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
