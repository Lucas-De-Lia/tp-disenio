import { DeleteOutline, EditNote } from "@mui/icons-material"
import { Box, IconButton, TableCell, TableRow } from "@mui/material"

const data = [
    {nombre:'Lucas', apellido:'Gomez', turno:'Mañana' , identificador:'123423'},
    {nombre:'Juan', apellido:'Perez', turno:'Tarde' , identificador:'123asfa3'},
    {nombre:'Pedro', apellido:'Gonzalez', turno:'Noche', identificador:'123a23'},
    {nombre:'Maria', apellido:'Rodriguez', turno:'Mañana',identificador:'123345gf'},
    {nombre:'Lucia', apellido:'Fernandez', turno:'Tarde',identificador:'1234sdfasf'}
]

export const BuscarBedelTableRows = () => {
  return (
    <>
        {data.map((row)=>(
            <TableRow
                key={row.identificador}

            >
                <TableCell align = "center">{row.nombre}</TableCell>
                <TableCell align = "center">{row.apellido}</TableCell>
                <TableCell align = "center">{row.turno}</TableCell>
                <TableCell align = "center">{row.identificador}</TableCell>
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
