import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { BuscarBedelTableFooter } from './BuscarBedelTableFooter';
import { useState, useEffect } from 'react';
import axios from "axios"
import { ReservasPorCursoTableRows } from './ReservasPorCursoTableRows';
import { NoReservas } from './NoReservas';
import { generateTables } from '../helpers';

export const ReservasPorCursoTable = ({buscador,print,handlePrint}) => {

    const [reservas, setReservas] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [sinResultados, setSinResultados] = useState(false);

    const filasPorPagina = 5;
    const indiceDeArranque = (paginaActual - 1) * filasPorPagina;
    const filasActuales = reservas.slice(indiceDeArranque, indiceDeArranque + filasPorPagina);

    const obtenerReservas = async () => {
        try{
            const data = await axios.get(`http://localhost:8080/api/reservas/search-by-curso?curso=${buscador}`);
            const reservasIntermedio = [];
            const reservas = data.data.map((reserva) => reserva );
            reservas.forEach(element => {
                reservasIntermedio.push(element.reservasDia);
            });
            const reservasDia = [];
            reservasIntermedio.forEach(element => {
                element.forEach(reservaDia => {
                    reservasDia.push({...reservaDia});
                });
            });
            console.log(reservasDia);
            setReservas(reservasDia);
        }catch(err){
            console.log(err);
            setSinResultados(true);
        }
    }

    useEffect(() => {
      obtenerReservas();
    }, [buscador]);
    
    useEffect(() => {
        if (print) {
          const printContent = generateTables(reservas);
          
          // Crear un contenedor temporal para la impresión
          const printWindow = window.open("", "_blank");
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>Imprimir Reservas</title>
                </head>
                <body>${printContent}</body>
              </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
          }
      
          handlePrint(); // Marcar como procesado
        }
      }, [print]);
          

  return (
    <>
        {
            (reservas.length === 0 && sinResultados && buscador.length >0) 
            ?<NoReservas/>
            :
            <TableContainer
            sx={{
                width:"700px",
                height:"450px",
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
                        <TableCell>Aula</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   { reservas.length > 0 && <ReservasPorCursoTableRows reservas={filasActuales}/> }
                </TableBody>
                <TableFooter>
                    <BuscarBedelTableFooter paginaActual={paginaActual} cantidadFilas = {(reservas.length % filasPorPagina !== 0)? Math.trunc(reservas.length / filasPorPagina)+1 : Math.trunc(reservas.length / filasPorPagina)} setPaginaActual={setPaginaActual}/>
                </TableFooter>
            </Table>
            </TableContainer>
        }
    </>
  )
}
