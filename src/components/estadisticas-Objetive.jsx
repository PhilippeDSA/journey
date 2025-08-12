import React, { useContext } from "react";
import { ObjetiveContext } from "../context/ObjetiveContext";

export default function EstadisticasObjetivos() {
    const { objetivos } = useContext(ObjetiveContext);
    const total = objetivos.length;
    const completados = objetivos.filter(obj => obj.completado).lenght;
    const porcentaje = total === 0 ? 0 : Math.round((completados / total) * 100);
    return (
        <div style={{ margin: "1rem 0" }}>
            <p>{completados}de {total}completados
            </p>
            <div style={{
                height: "20px",
                width: "100%",
                backgroundColor: "#eee",
                borderRadius: "10px",
                overflow: "hidden"
            }}>
                <div style={{
                    height: "100%",
                    width: `${porcentaje}%`,
                    backgroundColor: "#4caf50",
                    transition: "width 0.3 with ease"
                }}>

                </div>
            </div>
        </div>
    )
}