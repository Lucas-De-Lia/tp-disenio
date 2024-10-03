import React, { useState, useEffect } from 'react';

/**
 * Nota: La lógica no está implementada, solo son funciones que probablemente usemos después.
 */
export const BuscarBedelPage = () => {
    const [bedeles, setBedeles] = useState([]);
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        // Fetch bedeles based on the entered name
        if (nombre) {
            fetchBedelesPorNombre(nombre);
        }
    }, [nombre]);

    const fetchBedelesPorNombre = async (nombre) => {
        try {
            const response = await fetch(`/api/bedeles?nombre=${nombre}`);
            const data = await response.json();
            setBedeles(data);
        } catch (error) {
            console.error('Error fetching bedeles:', error);
        }
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    return (
        <div>
            <h1>Buscar Bedel</h1>
            <input 
                type="text" 
                value={nombre} 
                onChange={handleNombreChange} 
                placeholder="Ingrese el nombre del bedel"
            />
            <ul>
                {bedeles.map((bedel) => (
                    <li key={bedel.id}>{bedel.nombre}</li>
                ))}
            </ul>
        </div>
    );
};