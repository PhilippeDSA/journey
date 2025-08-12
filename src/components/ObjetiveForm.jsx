// src/components/ObjetivoForm.jsx (EJEMPLO)

import React, { useState, useContext } from 'react';
import { ObjetiveContext } from '../context/ObjetiveContext';

export default function ObjetivoForm() {
    const { agregarObjetivo } = useContext(ObjetiveContext);

    const [textoObjetivo, setTextoObjetivo] = useState('');
    const [tipoObjetivo, setTipoObjetivo] = useState('diario'); // <-- ¡Asegúrate de que este estado exista y tenga un valor inicial!
    const [fechaLimite, setFechaLimite] = useState('');
    const [recordatorio, setRecordatorio] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textoObjetivo.trim() === '') {
            alert('El objetivo no puede estar vacío.');
            return;
        }


        agregarObjetivo({
            id: crypto.randomUUID(),
            texto: textoObjetivo,
            tipo: tipoObjetivo,
            fechaLimite,
            recordatorio,
            completado: false,
        });


        setTextoObjetivo('');
        setTipoObjetivo('diario');
        setFechaLimite('');
        setRecordatorio('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Añadir nuevo objetivo"
                value={textoObjetivo}
                onChange={(e) => setTextoObjetivo(e.target.value)}
            />
            <select value={tipoObjetivo} onChange={(e) => setTipoObjetivo(e.target.value)}>
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
            </select>
            <input
                type="date"
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
            />
            <input
                type="datetime-local"
                value={recordatorio}
                onChange={(e) => setRecordatorio(e.target.value)}
            />
            <button type="submit">Agregar Objetivo</button>
        </form>
    );
}