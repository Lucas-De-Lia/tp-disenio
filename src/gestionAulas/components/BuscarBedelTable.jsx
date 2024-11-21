import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { BuscarBedelTableRows } from "./BuscarBedelTableRows"
import { BuscarBedelTableFooter } from "./BuscarBedelTableFooter"
import { useEffect, useState } from "react"
import axios from "axios"


export const BuscarBedelTable = () => {

  const [bedeles, setBedeles] = useState([]);

  const [error, setError] = useState(false);

  const [paginaActual, setPaginaActual] = useState(1);

  const filasPorPagina = 5;

  const indiceDeArranque = (paginaActual - 1) * filasPorPagina;

  const filasActuales = bedeles.slice(indiceDeArranque, indiceDeArranque + filasPorPagina);


  const solicitarBedel = async () => {
    try{
        const data = await axios.get("http://localhost:8080/api/bedeles");
        setBedeles(data.data);
        console.log(data.data);
    }catch(err){
        setError(true);
        console.error("Error:", err);
    }
  }

  useEffect(() => {
      solicitarBedel();
  }, []);

  return (
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
                    <TableCell align="center">Apellido</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Turno</TableCell>
                    <TableCell align="center">Nombre de usuario</TableCell>
                    <TableCell align="center">Modificar/Eliminar</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              <BuscarBedelTableRows bedeles={filasActuales}/>
            </TableBody>
            <TableFooter>
              <BuscarBedelTableFooter paginaActual={paginaActual} cantidadFilas = {(bedeles.length % 2 !== 0)? Math.trunc(bedeles.length / filasPorPagina)+1 : Math.trunc(bedeles.length / filasPorPagina)} setPaginaActual={setPaginaActual}/>
            </TableFooter>
        </Table>
    </TableContainer>
  )
}
