import { TableCell, TableRow } from "@mui/material";
import React from "react";

export const ReservasPorCursoTableRows = ({ reservas }) => {
    return (
      <>
        {
            reservas.map((res) => (
                <TableRow key={res.idReservaDia}>
                    <TableCell>{res.fecha}</TableCell>
                    <TableCell>{res.horaInicio}</TableCell>
                    <TableCell>{res.duracion / 60 + " horas"}</TableCell>
                    <TableCell>{res.aula.nroAula}</TableCell>
                </TableRow>
            ))
        }
      </>
    );
  };
  
