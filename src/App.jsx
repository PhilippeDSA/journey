// App.jsx

import React, { useContext } from "react";
import { ObjetiveProvider, ObjetiveContext } from "./context/ObjetiveContext.jsx";
import ObjetiveForm from "./components/ObjetiveForm.jsx";
import ObjetivoList from "./components/ObjetivoList.jsx";
import ReminderSettings from "./components/Reminder-settings.jsx";
import PuntosVisor from "./components/puntosVisor.jsx";
function AppContent() {
    const { puntos, getNivel } = useContext(ObjetiveContext);

    return (
        <main>
            <h1>Journey⛵</h1>
            < PuntosVisor/>
            <ObjetiveForm />
            <ObjetivoList />
            <ReminderSettings />
            <p>Tu nivel es: {getNivel(puntos)}</p>
        </main>
    );
}

// Esta es la única exportación
export default function App() {
    return (
        <ObjetiveProvider>
            <AppContent />
        </ObjetiveProvider>
    );
}
