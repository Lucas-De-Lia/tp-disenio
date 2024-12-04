import { DeleteOutline, EditNote } from "@mui/icons-material"
import { Box, IconButton, TableCell, TableRow } from "@mui/material"
import { EliminarBedelModal } from "../modals/EliminarBedelModal";
import { useState } from "react";
import { EliminarSuccess } from "../modals/EliminarSuccess";
import { EliminarError } from "../modals/EliminarError";
import { useNavigate } from "react-router-dom";


export const BuscarBedelTableRows = ({bedeles, actualizarBedeles}) => {

    const navigate = useNavigate();

    const [eliminarModal, setEliminarModal] = useState(false);
    const [id, setId] = useState(null);
    const [eliminarSuccess, setEliminarSuccess] = useState(false);
    const [eliminarError, setEliminarError] = useState(false);

    const handleEliminarSuccess = () =>{
        if(eliminarSuccess){
            setEliminarSuccess(!eliminarSuccess);
            actualizarBedeles();
        }
        setEliminarSuccess(!eliminarSuccess);

    }
    
    const handleEliminarError = () =>{
        setEliminarError(!eliminarError);
    }

    const handleEliminarModal = (id = null) =>{
        setId(id);
        setEliminarModal(!eliminarModal);
    }

    const handleModificarBedel = (id,nombre,apellido,turno,username) => {
        navigate(`/modificar-bedel/${id}?nombre=${nombre}&apellido=${apellido}&turno=${turno}&username=${username}`);
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
                        <IconButton 
                            sx={{color:"black"}}
                            onClick={() => {handleModificarBedel(row.idUsuario,row.nombre,row.apellido,row.turno,row.username); }}    
                        >
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
        <EliminarBedelModal open ={ eliminarModal } close = { handleEliminarModal } id={id} handleEliminarSuccess={handleEliminarSuccess} handleEliminarError = {handleEliminarError} />
        <EliminarSuccess eliminarSuccess={eliminarSuccess} handleEliminarSuccess={handleEliminarSuccess} />
        <EliminarError eliminarError={eliminarError} handleEliminarError={handleEliminarError} />
    </>
  )
}
