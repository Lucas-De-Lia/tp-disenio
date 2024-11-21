import { DeleteOutline, EditNote } from "@mui/icons-material"
import { Box, IconButton, TableCell, TableRow } from "@mui/material"


export const BuscarBedelTableRows = ({bedeles}) => {
  return (
    <>
        {bedeles.map((row)=>(
            <TableRow
                key={row.username}

            >
                <TableCell align = "center">{row.apellido}</TableCell>
                <TableCell align = "center">{row.nombre}</TableCell>
                <TableCell align = "center">
                    {
                        row.turno === "MANIANA" ? "Mañana" : row.turno === "TARDE" ? "Tarde" : row.turno === "NOCHE" ? "Noche" : "No especificado"   
                    }
                </TableCell>
                <TableCell align = "center">{row.username}</TableCell>
                <TableCell align = "center">
                    <Box>
                        <IconButton sx={{color:"black"}}>
                            <EditNote/>
                        </IconButton>
                        <IconButton sx={{color:'black'}}>
                            <DeleteOutline/>
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
        ))}
    </>
  )
}
