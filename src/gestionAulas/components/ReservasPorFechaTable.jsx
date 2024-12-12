import React, { forwardRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { BuscarBedelTableFooter } from "./BuscarBedelTableFooter";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ReservasPorFechaTable = forwardRef(
  (
    {
      fecha,
      tipoAula,
      numeroAula,
      setError: setPadreError,
      setErrorMessage: setPadreErrorMessage,
    },
    ref
  ) => {
    const [reservas, setReservas] = useState({});
    const [paginaActual, setPaginaActual] = useState(1);

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
      if (aula.cantidadPCs && aula.cantidadPCs > 0) {
        return "INFORMATICA";
      } else if (aula.proyector || aula.televisor || aula.computadora) {
        return "MULTIMEDIOS";
      } else {
        return "SIN_RECURSOS_ADICIONALES";
      }
    };

    const calcularHoraFin = (horaInicio, duracion) => {
      const [hours, minutes, seconds] = horaInicio.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + duracion;
      const endHours = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      return `${String(endHours).padStart(2, "0")}:${String(
        endMinutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const obtenerReservas = async () => {
      let fechaABuscar = fecha.toISOString().split("T")[0];
      let camposAdicionales = "";
      if (tipoAula !== "TODAS") camposAdicionales += `&tipoAula=${tipoAula}`;
      if (numeroAula !== "TODAS") camposAdicionales += `&numAula=${numeroAula}`;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/reservas/search-by-fecha?fecha=${fechaABuscar}${camposAdicionales}`
        );
        const data = response.data;
        const reservasProcesadas = procesarReservas(data);
        setReservas(reservasProcesadas);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setPadreError(true);
        let errorMessage = "";
        if (err.response.data) {
          for (const key in err.response.data) {
            if (Object.prototype.hasOwnProperty.call(err.response.data, key)) {
              errorMessage += `${err.response.data[key]} `;
            }
          }
        }
        setPadreErrorMessage(errorMessage);
      }
    };

    useEffect(() => {
      obtenerReservas();
    }, [fecha, tipoAula, numeroAula]);

    const aulaTypes = [
      "MULTIMEDIOS",
      "INFORMATICA",
      "SIN_RECURSOS_ADICIONALES",
    ];

    return (
      <TableContainer
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          width: "700px",
          height: "500px",
          mt: 2,
          mb: 0,
          borderBottom: "3px solid #5f5f5f",

          "& td": {
            border: "none",
            padding: 0,
          },
        }}
      >
        {aulaTypes.map(
          (tipo) =>
            reservas[tipo] && (
              <Box
                key={tipo}
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                  flexBasis: "33%",
                  minWidth: "33%",
                  maxWidth: "100%",
                }}
              >
                <Table>
                  <TableHead
                    sx={{
                      borderBottom: "3px solid #5f5f5f",
                    }}
                  >
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>
                        {tipo === "MULTIMEDIOS" &&
                          reservas[tipo] &&
                          "Aula Multimedios"}
                        {tipo === "INFORMATICA" &&
                          reservas[tipo] &&
                          "Aula Informática"}
                        {tipo === "SIN_RECURSOS_ADICIONALES" &&
                          reservas[tipo] &&
                          "Aula sin Recursos Adicionales"}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={
                      tipoAula !== "TODAS"
                        ? {
                            display: "flex",
                            flexWrap: "wrap",
                          }
                        : {}
                    }
                  >
                    {reservas[tipo] &&
                      Object.keys(reservas[tipo]).map((nroAula) => (
                        <React.Fragment key={`${tipo}${nroAula}`}>
                          <TableRow
                            sx={
                              tipoAula !== "TODAS"
                                ? {
                                    width: "100%",
                                    borderTop: "2px solid #d3d3d3",
                                  }
                                : {}
                            }
                          >
                            <TableCell>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{
                                  paddingTop: "10px",
                                  marginX: "7.5px",
                                }}
                              >
                                Aula {nroAula}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {reservas[tipo][nroAula].map((reserva, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Box
                                  sx={
                                    tipoAula !== "TODAS"
                                      ? {
                                          paddingX: "20px",
                                          paddingY: "20px",
                                        }
                                      : {
                                          borderBottom: "2px solid #d3d3d3",
                                          marginX: "7.5px",
                                          paddingX: "20px",
                                          paddingY: "20px",
                                        }
                                  }
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      Hora Inicio:
                                    </Typography>
                                    <Typography variant="body2">
                                      {reserva.horaInicio}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      Hora Fin:
                                    </Typography>
                                    <Typography variant="body2">
                                      {reserva.horaFin}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      Actividad:
                                    </Typography>
                                    <Typography variant="body2">
                                      {reserva.actividadAcademica}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography variant="body2">
                                      Docente:
                                    </Typography>
                                    <Typography variant="body2">
                                      {reserva.docente}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))}
                        </React.Fragment>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            )
        )}
      </TableContainer>
    );
  }
);

ReservasPorFechaTable.displayName = "ReservasPorFechaTable";

ReservasPorFechaTable.propTypes = {
  fecha: PropTypes.instanceOf(Date).isRequired,
  tipoAula: PropTypes.string.isRequired,
  numeroAula: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setError: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export { ReservasPorFechaTable };
