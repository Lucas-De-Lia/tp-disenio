import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"


export const BuscarBedelTable = () => {
  return (
    <TableContainer sx={{mt:5}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">Apellido</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Turno</TableCell>
                    <TableCell align="center">Identificador</TableCell>
                    <TableCell align="center">Modificar/Eliminar</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>
  )
}
