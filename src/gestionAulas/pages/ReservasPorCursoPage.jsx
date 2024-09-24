import React, { useState, useEffect } from 'react';

/**
 * Nota: La lógica no está implementada, solo son funciones que probablemente usemos después.
 */
export const ReservasPorCursoPage = () => {
    const [reservas, setReservas] = useState([]);
    const [curso, setCurso] = useState('');

    useEffect(() => {
        // Fetch reservations based on the selected course
        if (curso) {
            fetchReservasPorCurso(curso);
        }
    }, [curso]);

    const fetchReservasPorCurso = async (curso) => {
        try {
            const response = await fetch(`/api/reservas?curso=${curso}`);
            const data = await response.json();
            setReservas(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleCursoChange = (event) => {
        setCurso(event.target.value);
    };

    return (
        <div>
            <h1>Reservas por Curso</h1>
            <input 
                type="text" 
                value={curso} 
                onChange={handleCursoChange} 
                placeholder="Ingrese el curso"
            />
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>{reserva.nombre}</li>
                ))}
            </ul>
        </div>
    );
};