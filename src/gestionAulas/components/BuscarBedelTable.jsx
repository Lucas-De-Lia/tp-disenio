import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"
import { BuscarBedelTableRows } from "./BuscarBedelTableRows"
import { BuscarBedelTableFooter } from "./BuscarBedelTableFooter"


export const BuscarBedelTable = () => {
  return (
    <TableContainer sx={{
        width:"80%",
        mt:2
    }}>
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
                    <TableCell align="center">Identificador</TableCell>
                    <TableCell align="center">Modificar/Eliminar</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              <BuscarBedelTableRows/>
            </TableBody>
            <TableFooter>
              <BuscarBedelTableFooter/>
            </TableFooter>
        </Table>
    </TableContainer>
  )
}
