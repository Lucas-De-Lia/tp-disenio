import React, { useState } from 'react';

export const RegistrarReservaPage = () => {
    const [reserva, setReserva] = useState('');
    const [reservas, setReservas] = useState([]);

    const handleReservaChange = (event) => {
        setReserva(event.target.value);
    };

    const handleRegistrarReserva = () => {
        const newReserva = { id: reservas.length + 1, reserva };
        setReservas([...reservas, newReserva]);
        setReserva('');
    };

    return (
        <div>
            <h1>Registrar Reserva</h1>
            <input 
                type="text" 
                value={reserva} 
                onChange={handleReservaChange} 
                placeholder="Ingrese la reserva"
            />
            <button onClick={handleRegistrarReserva}>Registrar</button>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>{reserva.reserva}</li>
                ))}
            </ul>
        </div>
    );
};