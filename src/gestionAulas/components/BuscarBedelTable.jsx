import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { BuscarBedelTableRows } from "./BuscarBedelTableRows"
import { BuscarBedelTableFooter } from "./BuscarBedelTableFooter"
import { useEffect, useState } from "react"
import axios from "axios"
import { BedelNoEncontrado } from "./BedelNoEncontrado"

const FILTROS = {
  Apellido: "Apellido",
  Turno:"Turno"
}

const TURNOS = {
  MANIANA: "MANIANA",
  TARDE: "TARDE",
  NOCHE: "NOCHE"
}

export const BuscarBedelTable = ({buscador, filtro}) => {

  const [bedeles, setBedeles] = useState([]);

  const [error, setError] = useState(false);

  const [paginaActual, setPaginaActual] = useState(1);

  const filasPorPagina = 5;

  const indiceDeArranque = (paginaActual - 1) * filasPorPagina;

  const filasActuales = bedeles.slice(indiceDeArranque, indiceDeArranque + filasPorPagina);

  const actualizarBedeles = () =>{
    solicitarBedel();
  }

  const solicitarBedel = async () => {
    try{
        const data = await axios.get("http://localhost:8080/api/bedeles/habilitados");
        setBedeles(data.data);
        if(error)setError(false);
        console.log(data.data);
    }catch(err){
        setError(true);
        console.error("Error:", err);
    }
  }

  const filtrarPorApellido = async () => {
    try{
      const data = await axios.get(`http://localhost:8080/api/bedeles/search?apellido=${buscador}`);
      setBedeles(data.data);
      if(error)setError(false);
      console.log(data.data);
    }catch(err){
      setError(true);
      console.error("Error:", err);
    }
  }

  const filtrarPorTurno = async (turno) => {
    try{
      const data = await axios.get(`http://localhost:8080/api/bedeles/search?turno=${turno}`);
      setBedeles(data.data);
      if(error)setError(false);
      console.log(data.data);
    }catch(err){
      setError(true);
      console.error("Error:", err);
    }
  }

  useEffect(() => {
    setPaginaActual(1);
  }, [bedeles]);

  useEffect(() => {
      solicitarBedel();
  }, []);

  useEffect(() => {
    if(filtro === ""){
      return;
    }else{
      if(filtro === FILTROS.Apellido){
        if(buscador === ""){
          solicitarBedel();
        }else{
          filtrarPorApellido();
        }
      }else{
        if(filtro === FILTROS.Turno){
          if(buscador === ""){
            solicitarBedel();
          }else{
            if(buscador.charAt(0).toUpperCase() === "M"){
              filtrarPorTurno(TURNOS.MANIANA);
            }else{
              if(buscador.charAt(0).toUpperCase() === "T"){
                filtrarPorTurno(TURNOS.TARDE);
              }else{
                if(buscador.charAt(0).toUpperCase() === "N"){
                  filtrarPorTurno(TURNOS.NOCHE);
                }else{
                  setError(true);
                }
              }
            }
          }
        }
      }
    }
  }, [buscador]);
  

  return (
    <>
    {error ? <BedelNoEncontrado/> :(
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
              <BuscarBedelTableRows bedeles={filasActuales} actualizarBedeles = {actualizarBedeles}/>
            </TableBody>
            <TableFooter>
              <BuscarBedelTableFooter paginaActual={paginaActual} cantidadFilas = {(bedeles.length % 5 !== 0)? Math.trunc(bedeles.length / filasPorPagina)+1 : Math.trunc(bedeles.length / filasPorPagina)} setPaginaActual={setPaginaActual}/>
            </TableFooter>
        </Table>
    </TableContainer>
    )
    }
    </>
  )
}
