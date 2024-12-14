export const generateTables = (reservas) => {
    const tableHeaders = `
    <thead>
      <tr>
        <th>Fecha</th>
        <th>Inicio</th>
        <th>Duración</th>
        <th>Aula</th>
      </tr>
    </thead>
  `;

  // Filas dinámicas de la tabla
  const tableRows = reservas
    .map(
      (reserva) => `
      <tr>
        <td>${reserva.fecha}</td>
        <td>${reserva.horaInicio}</td>
        <td>${reserva.duracion / 60 + " horas"}</td>
        <td>${reserva.aula.nroAula}</td>
      </tr>
    `
    )
    .join(""); // Une todas las filas en un único string

  // Construye la tabla completa
  const tableHTML = `
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
      ${tableHeaders}
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  return tableHTML;
}