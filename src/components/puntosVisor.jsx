
import React, { useContext } from "react";
import { ObjetiveContext } from "../context/ObjetiveContext.jsx";

const niveles = [
    { nombre: "Principiante", minimo: 0 },
    { nombre: "Bronce", minimo: 20 },
    { nombre: "Plata", minimo: 50 },
    { nombre: "Oro", minimo: 100 },
];

export default function PuntosVisor() {
    const { puntos, getNivel } = useContext(ObjetiveContext);

    const nivelActual = getNivel(puntos);
    const indiceNivel = niveles.findIndex(
        (nivel) => nivel.nombre === nivelActual
    );

    const siguienteNivel = niveles[indiceNivel + 1];

    const puntosNivelActual = niveles[indiceNivel].minimo;
    const puntosSiguiente = siguienteNivel?.minimo;

    const progreso = siguienteNivel
        ? Math.min(
            100,
            ((puntos - puntosNivelActual) /
                (puntosSiguiente - puntosNivelActual)) * 100
        )
        : 100;

    return (
        <section className="puntos-visor">
            <p className="puntos-etiqueta">Tu experiencia</p>

            <div className="puntos-cantidad">
                <span>{puntos}</span>
                <span className="puntos-unidad">XP</span>
            </div>

            <h2>Nivel {nivelActual}</h2>

            <div
                className="puntos-barra"
                role="progressbar"
                aria-label="Progreso hacia el siguiente nivel"
                aria-valuenow={Math.round(progreso)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="puntos-barra-progreso"
                    style={{ width: `${progreso}%` }}
                />
            </div>

            {siguienteNivel ? (
                <p>
                    Te faltan <strong>{puntosSiguiente - puntos} XP</strong>
                    {" "}para alcanzar {siguienteNivel.nombre}.
                </p>
            ) : (
                <p>¡Alcanzaste el nivel máximo actual!</p>
            )}
        </section>
    );
}
