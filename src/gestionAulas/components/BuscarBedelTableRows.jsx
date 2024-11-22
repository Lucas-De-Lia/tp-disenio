import { DeleteOutline, EditNote } from "@mui/icons-material"
import { Box, IconButton, TableCell, TableRow } from "@mui/material"
import { EliminarBedelModal } from "../modals/EliminarBedelModal";
import { useState } from "react";


export const BuscarBedelTableRows = ({bedeles}) => {

    const [eliminarModal, setEliminarModal] = useState(false);
    const [id, setId] = useState(null);

    const handleEliminarModal = (id) =>{
        setId(id);
        setEliminarModal(!eliminarModal);
    }

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
                        <IconButton 
                            sx={{color:'black'}}
                            onClick={() => {handleEliminarModal(row.idUsuario); }}
                        >
                            <DeleteOutline/>
                        </IconButton>
                    </Box>
                </TableCell>
            </TableRow>
            
        ))
        }
        <EliminarBedelModal open ={ eliminarModal } close = { handleEliminarModal } id={id} />
    </>
  )
}
