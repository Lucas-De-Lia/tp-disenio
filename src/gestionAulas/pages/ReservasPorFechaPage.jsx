import React, { useState, useEffect } from 'react';

/**
 * Nota: La lógica no está implementada, solo son funciones que probablemente usemos después.
 */
export const ReservasPorFechaPage = () => {
    const [reservas, setReservas] = useState([]);
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        // Fetch reservations based on the selected date
        if (fecha) {
            fetchReservasPorFecha(fecha);
        }
    }, [fecha]);

    const fetchReservasPorFecha = async (fecha) => {
        try {
            const response = await fetch(`/api/reservas?fecha=${fecha}`);
            const data = await response.json();
            setReservas(data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const handleDateChange = (event) => {
        setFecha(event.target.value);
    };

    return (
        <div>
            <h1>Reservas por Fecha</h1>
            <input 
                type="date" 
                value={fecha} 
                onChange={handleDateChange} 
            />
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>{reserva.nombre}</li>
                ))}
            </ul>
        </div>
    );
};