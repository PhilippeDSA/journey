import React, { useContext } from "react";
import { ObjetiveContext } from "../context/ObjetiveContext";

export default function ObjetivoList() {
    const { objetivos, completarObjetivo, eliminarObjetivo } = useContext(ObjetiveContext);

    if (objetivos.length === 0) {
        return <p>No hay objetivos todavía.</p>;
    }
    return (
        <div>
            <h2>Lista de Objetivos</h2>
            <ul>
                {objetivos.map((obj) => (
                    <li key={obj.id}>
                        <strong>[{obj.tipo ? obj.tipo.toUpperCase() : 'SIN TIPO'}]</strong> {obj.texto}
                        {obj.completado ? "✅" : ""}
                        <button onClick={() => completarObjetivo(obj.id)}>
                            {obj.completado ? "Desmarcar" : "Completar"}
                        </button>
                        <button onClick={() => eliminarObjetivo(obj.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
