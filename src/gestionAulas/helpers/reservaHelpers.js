import axios from 'axios';
import { listaDias } from "../../constants/dias";

/**
 * Formatea una fecha a una cadena ISO (YYYY-MM-DD).
 * @param {Date} date - La fecha a formatear.
 * @returns {string} - Fecha en formato ISO.
 */
export const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
};

/**
 * Convierte la primera letra de una palabra a mayúscula y el resto a minúscula.
 * @param {string} word - La palabra a convertir.
 * @returns {string} - La palabra con la primera letra en mayúscula.
 */
export const mayus = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

/**
 * Genera reservasDia basándose en el día de la semana, hora y duración.
 * @param {string} day - Día de la semana.
 * @param {number} hour - Hora de inicio.
 * @param {number} duration - Duración de la reserva.
 * @param {string} periodoReserva - Periodo de la reserva.
 * @returns {Promise<Array<Object>>} - Promesa que resuelve con las nuevas reservasDia para el día de la semana especificado.
 */
export const generarReservasPeriodo = async (day, hour, duration, periodoReserva) => {
    const response = await axios.get("http://localhost:8080/api/cuatrimestres/2025");

    const startDate =
        periodoReserva === "PRIMER_CUATRIMESTRE" || periodoReserva === "ANUAL"
            ? new Date(response.data[0].fechaInicio)
            : new Date(response.data[1].fechaInicio);

    // TODO: Analizar y arreglar si se considera importante
    // ! Las fechas de fin primer cuatrimestre y inicio segundo cuatrimestre
    // ! no necesariamente son consecutivas, por lo que probablemente se van
    // ! a registrar reservas en días de receso.
    const endDate =
        periodoReserva === "PRIMER_CUATRIMESTRE"
            ? new Date(response.data[0].fechaFinal)
            : new Date(response.data[1].fechaFinal);

    // Ajusta el cálculo del día de la semana para que coincida con la listaDias
    const dayOfWeek = (listaDias.indexOf(day) + 1) % 7;

    let currentDate = new Date(startDate);
    const newReservations = [];

    // Genera los reservasDia para el día de la semana especificado
    while (currentDate <= endDate) {
        if (currentDate.getDay() === dayOfWeek) {
            newReservations.push({
                fecha: formatDate(currentDate),
                horaInicio: hour,
                duracion: duration,
            });
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return newReservations;
};

/**
 * Filtra los reservasDia excluyendo los correspondientes al día de la semana especificado.
 * @param {string} dia - Día de la semana a remover.
 * @param {Array<Object>} reservasDia - Lista actual de reservasDia.
 * @returns {Array<Object>} - Nueva lista de reservasDia después de remover el día de la semana especificado.
 */
export const removerDiasPeriodo = (dia, reservasDia) => {
    const dayOfWeek = listaDias.indexOf(dia);
    return reservasDia.filter(
        (reserva) => new Date(reserva.fecha).getDay() !== dayOfWeek
    );
};

/**
 * Identifica las aulas más repetidas en las reservas.
 * @param {Array<Object>} reservas - Lista de reservas.
 * @returns {Array<Object>} - Lista de aulas repetidas.
 */
export const aulasRepetidas = (reservas) => {
    // Obtiene todas las aulas disponibles de las reservas, aplanando el array de arrays
    const aulas = reservas.flatMap((reserva) => reserva.aulasDisponibles || []);

    // Cuenta la cantidad de veces que aparece cada número de aula
    const aulaCount = aulas.reduce((acc, aula) => {
        acc[aula.nroAula] = (acc[aula.nroAula] || 0) + 1;
        return acc;
    }, {});

    // Ordena las aulas por la cantidad de veces que aparecen, de mayor a menor, y toma las 3 primeras
    const sortedAulas = Object.entries(aulaCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([nroAula]) =>
            aulas.find((aula) => aula.nroAula === Number(nroAula))
        )
        .filter(Boolean); // Filtra undefined en caso de no encontrar el aula

    return sortedAulas;
};

/**
 * Filtra las aulas disponibles en las reservas.
 * @param {Array<Object>} reservasDia - Lista de reservas dia obtenidas de la API.
 * @param {Array<Object>} reservasDiasSemana - Lista actual de reservas por semana.
 * @returns {Array<Object>} - Nueva lista de reservas por semana actualizada.
 */
export const filtrarAulas = (reservasDia, reservasDiasSemana) => {
    console.log("reservasDiasSemana", reservasDiasSemana);
    return reservasDiasSemana.map((reserva) => {
        //  
        const filteredReservas = reservasDia.filter((r) => {
            const diaSemana = new Date(r.fecha).getDay();
            return diaSemana === listaDias.indexOf(reserva.diaSemana);
        });
        // Eliminamos las aulas repetidas
        const aulasComunes = aulasRepetidas(filteredReservas);
        return {
            ...reserva,
            ...(reservasDia[0]?.aulasDisponibles && {
                aulasDisponibles: aulasComunes,
            }),
            ...(reservasDia[0]?.reservasSolapadas && {
                reservasSolapadas: aulasComunes,
            }),
        };
    });
};

export const sortByDay = (reservas, esPeriodo) => {
    if(esPeriodo){
        return reservas.sort((a, b) => listaDias.indexOf(a.diaSemana) - listaDias.indexOf(b.diaSemana));
    }
    return reservas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
};