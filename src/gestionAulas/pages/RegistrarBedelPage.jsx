import React, { useState } from 'react';

export const RegistrarBedelPage = () => {
    const [nombre, setNombre] = useState('');
    const [bedeles, setBedeles] = useState([]);

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleRegistrarBedel = () => {
        const newBedel = { id: bedeles.length + 1, nombre };
        setBedeles([...bedeles, newBedel]);
        setNombre('');
    };

    return (
        <div>
            <h1>Registrar Bedel</h1>
            <input 
                type="text" 
                value={nombre} 
                onChange={handleNombreChange} 
                placeholder="Ingrese el nombre del bedel"
            />
            <button onClick={handleRegistrarBedel}>Registrar</button>
            <ul>
                {bedeles.map((bedel) => (
                    <li key={bedel.id}>{bedel.nombre}</li>
                ))}
            </ul>
        </div>
    );
};