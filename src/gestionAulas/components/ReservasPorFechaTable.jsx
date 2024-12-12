import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { BuscarBedelTableFooter } from './BuscarBedelTableFooter';
import { useState, useEffect } from 'react';
import axios from "axios"
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export const ReservasPorFechaTable = ({fecha, tipoAula, numeroAula, setError: setPadreError, setErrorMessage: setPadreErrorMessage}) => {

    const [reservas, setReservas] = useState({});
    const [paginaActual, setPaginaActual] = useState(1);

    // Eliminar o comentar la lógica de paginación que utiliza 'reservas.slice'
    // const filasPorPagina = 5;
    // const indiceDeArranque = (paginaActual - 1) * filasPorPagina;
    // const filasActuales = reservas.slice(indiceDeArranque, indiceDeArranque + filasPorPagina);

    const procesarReservas = (data) => {
        const groupedData = {};
        data.forEach((reserva) => {
          const aula = reserva.reservasDia[0].aula;
          const tipoAula = determinarTipoAula(aula);
          const nroAula = aula.nroAula;
      
          if (!groupedData[tipoAula]) {
            groupedData[tipoAula] = {};
          }
          if (!groupedData[tipoAula][nroAula]) {
            groupedData[tipoAula][nroAula] = [];
          }
          groupedData[tipoAula][nroAula].push({
            horaInicio: reserva.reservasDia[0].horaInicio,
            horaFin: calcularHoraFin(
              reserva.reservasDia[0].horaInicio,
              reserva.reservasDia[0].duracion
            ),
            actividadAcademica: reserva.actividadAcademica,
            docente: `${reserva.apellidoDocente} ${reserva.nombreDocente}`,
          });
        });
        return groupedData;
      };
      
      const determinarTipoAula = (aula) => {
        // Determina el tipo de aula según sus características
        if (aula.cantidadPCs && aula.cantidadPCs > 0) {
          return "INFORMATICA";
        } else if (aula.proyector || aula.televisor || aula.computadora) {
          return "MULTIMEDIOS";
        } else {
          return "SIN_RECURSOS_ADICIONALES";
        }
      };
      
      const calcularHoraFin = (horaInicio, duracion) => {
        // Calcula la hora de fin sumando la duración a la hora de inicio
        const [hours, minutes, seconds] = horaInicio.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes + duracion;
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;
        return `${String(endHours).padStart(2, "0")}:${String(
          endMinutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      };

    const obtenerReservas = async () => {
        // Formatear la fecha a un string que pueda ser interpretado por el backend
        let fechaABuscar = fecha.toISOString().split("T")[0];
        
        // Agregar campos adicionales a la URL si es necesario (tipoAula y numeroAula son mutuamante excluyentes)
        let camposAdicionales = "";
        if(tipoAula !== "TODAS") camposAdicionales += `&tipoAula=${tipoAula}`;
        if(numeroAula !== "TODAS") camposAdicionales += `&numAula=${numeroAula}`;

        // Realizar la petición GET
        try{
            const response = await axios.get(`http://localhost:8080/api/reservas/search-by-fecha?fecha=${fechaABuscar}${camposAdicionales}`);
            const data = response.data;
            const reservasProcesadas = procesarReservas(data);
            setReservas(reservasProcesadas);
        }catch(err){
            console.error("Error fetching reservations:", err);
            setPadreError(true); // Llamar a la función para mostrar el modal de error
            let errorMessage = "";
            if (err.response.data) {
                for (const key in err.response.data) {
                    if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
                        errorMessage += `${err.response.data[key]} `;
                    }
                }
            }
            setPadreErrorMessage(errorMessage); // Establecer el mensaje de error
        }
    }

    useEffect(() => {
      obtenerReservas();
    }, [fecha, tipoAula, numeroAula]);
    

  return (
    <>
      <TableContainer
        sx={{
          width: "700px",
          height: "500px",
          mt: 2,
          mb: 0,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                    borderBottom: "3px solid gray",
                },
                "& td": {
                    borderBottom: "none",
                    border: "1px solid green",
                    padding: "50px",
                },
              }}
            >
              <TableCell>Aula Multimedios</TableCell>
              <TableCell>Aula Informática</TableCell>
              <TableCell>Aula sin Recursos Adicionales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Combinar todas las reservas en una lista para iterar */}
            {["MULTIMEDIOS", "INFORMATICA", "SIN_RECURSOS_ADICIONALES"].map(
              (tipoAula) =>
                reservas[tipoAula] &&
                Object.keys(reservas[tipoAula]).map((nroAula) => (
                  <React.Fragment key={tipoAula + nroAula}>
                    {/* Fila para el número de aula */}
                    <TableRow
                    sx={{
                        "& td": {
                        borderBottom: "none",
                        border: "1px solid blue",
                        },
                      }}
                    >
                      {["MULTIMEDIOS", "INFORMATICA", "SIN_RECURSOS_ADICIONALES"].map(
                        (tipo) => (
                          <TableCell key={tipo}>
                            {tipo === tipoAula && (
                              <Typography variant="subtitle1" fontWeight="bold">
                                Aula {nroAula}
                              </Typography>
                            )}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                    {/* Filas para las reservas del aula */}
                    {reservas[tipoAula][nroAula].map((reserva, index) => (
                      <TableRow
                      sx={{
                            "& td": {
                            borderBottom: "none",
                            },
                        }}
                       key={index}
                      >
                        {["MULTIMEDIOS", "INFORMATICA", "SIN_RECURSOS_ADICIONALES"].map(
                          (tipo) => (
                            <TableCell 
                                key={tipo}
                            >
                              {tipo === tipoAula && (
                                <Box 
                                    sx={{
                                        borderBottom: "1px solid red",
                                        padding: "5px",

                                    }}
                                >
                                  <Typography variant="body2">
                                    Hora Inicio: {reserva.horaInicio}
                                  </Typography>
                                  <Typography variant="body2">
                                    Hora Fin: {reserva.horaFin}
                                  </Typography>
                                  <Typography variant="body2">
                                    Actividad: {reserva.actividadAcademica}
                                  </Typography>
                                  <Typography variant="body2">
                                    Docente: {reserva.docente}
                                  </Typography>
                                </Box>
                              )}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
 
// Validate properties
ReservasPorFechaTable.propTypes = {
    fecha: PropTypes.instanceOf(Date).isRequired,
    tipoAula: PropTypes.string.isRequired,
    numeroAula: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};