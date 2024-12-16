import axios from 'axios';

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
 * Genera reservas periódicas basándose en el día, hora y duración.
 * @param {string} day - Día de la semana.
 * @param {number} hour - Hora de inicio.
 * @param {number} duration - Duración de la reserva.
 * @param {string} periodoReserva - Periodo de la reserva.
 * @param {Array<string>} listaDias - Lista de días disponibles.
 * @returns {Promise<Array<Object>>} - Promesa que resuelve con las nuevas reservas.
 */
export const generarReservasPeriodo = async (day, hour, duration, periodoReserva, listaDias) => {
  const response = await axios.get("http://localhost:8080/api/cuatrimestres/2025");

  const startDate =
    periodoReserva === "PRIMER_CUATRIMESTRE" || periodoReserva === "ANUAL"
      ? new Date(response.data[0].fechaInicio)
      : new Date(response.data[1].fechaInicio);

  const endDate =
    periodoReserva === "PRIMER_CUATRIMESTRE"
      ? new Date(response.data[0].fechaFinal)
      : new Date(response.data[1].fechaFinal);

  // Ajusta el cálculo del día de la semana para que coincida con la listaDias
  const dayOfWeek = (listaDias.indexOf(day) + 1) % 7;

  let currentDate = new Date(startDate);
  const newReservations = [];

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
 * Filtra los días de reserva excluyendo el día especificado.
 * @param {string} dia - Día a remover.
 * @param {Array<string>} listaDias - Lista de días disponibles.
 * @param {Array<Object>} reservasDia - Lista actual de reservas.
 * @returns {Array<Object>} - Nueva lista de reservas después de remover el día.
 */
export const removerDiasPeriodo = (dia, listaDias, reservasDia) => {
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
  const aulas = reservas.flatMap((reserva) => reserva.aulasDisponibles || []);

  const aulaCount = aulas.reduce((acc, aula) => {
    acc[aula.nroAula] = (acc[aula.nroAula] || 0) + 1;
    return acc;
  }, {});

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
 * @param {Array<Object>} reservas - Lista de reservas obtenidas de la API.
 * @param {Array<Object>} reservasDiasSemana - Lista actual de reservas por semana.
 * @param {Array<string>} listaDias - Lista de días disponibles.
 * @param {Function} aulasRepetidasFn - Función para obtener aulas repetidas.
 * @returns {Array<Object>} - Nueva lista de reservas por semana actualizada.
 */
export const filtrarAulas = (reservas, reservasDiasSemana, listaDias, aulasRepetidasFn) => {
  return reservasDiasSemana.map((reserva) => {
    const filteredReservas = reservas.filter((r) => {
      const diaSemana = new Date(r.fecha).getDay();
      return diaSemana === listaDias.indexOf(reserva.diaSemana);
    });
    const aulasComunes = aulasRepetidasFn(filteredReservas);
    return {
      ...reserva,
      ...(reservas[0]?.aulasDisponibles && {
        aulasDisponibles: aulasComunes,
      }),
      ...(reservas[0]?.reservasSolapadas && {
        reservasSolapadas: aulasComunes,
      }),
    };
  });
};