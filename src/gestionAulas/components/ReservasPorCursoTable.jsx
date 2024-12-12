import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { BuscarBedelTableFooter } from './BuscarBedelTableFooter';
import { useState, useEffect } from 'react';
import axios from "axios"

export const ReservasPorCursoTable = ({buscador}) => {

    const [reservas, setReservas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);

    const filasPorPagina = 5;
    const indiceDeArranque = (paginaActual - 1) * filasPorPagina;
    const filasActuales = reservas.slice(indiceDeArranque, indiceDeArranque + filasPorPagina);

    const obtenerReservas = async () => {
        try{
            const data = await axios.get(`http://localhost:8080/api/reservas/search-by-curso?curso=${buscador}`);
            console.log(data);
        }catch(err){

        }
    }

    useEffect(() => {
      obtenerReservas();
    }, [buscador]);
    

  return (
    <>
        <TableContainer
            sx={{
                width:"700px",
                height:"500px",
                mt:2,
                mb:0
              }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            "& th": {
                              borderBottom: "3px solid black",
                            },
                          }}  
                    >
                        <TableCell>Fecha</TableCell>
                        <TableCell>Inicio</TableCell>
                        <TableCell>Duración</TableCell>
                        <TableCell>Tipo reserva</TableCell>
                        <TableCell>Aula</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
                <TableFooter>
                    <BuscarBedelTableFooter paginaActual={paginaActual} cantidadFilas = {(reservas.length % filasPorPagina !== 0)? Math.trunc(reservas.length / filasPorPagina)+1 : Math.trunc(reservas.length / filasPorPagina)} setPaginaActual={setPaginaActual}/>
                </TableFooter>
            </Table>
        </TableContainer>
    </>
  )
}
