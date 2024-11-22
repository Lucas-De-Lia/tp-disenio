import { Box, Button, Modal, Typography } from "@mui/material"
import axios from "axios";


export const EliminarBedelModal = ({open, close,id}) => {
    
const eliminarBedel = async (id) =>{
    try{
        console.log(id);
        const response = await axios.delete(`http://localhost:8080/api/bedeles/${id}`);
        close();
    }catch(err){
        console.log(err);
    }
}

  return (
    <Modal open = {open} disableScrollLock>
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                width: "30%",
                height: "30%",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
        >
            <Typography
                component="h5"
                variant="h5"
                mb={2}
            >
                ¿Está seguro que desea eliminar?
            </Typography>
            <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                gap={2}
            >
                <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                        width: "100px",
                        color: "#32936F",
                        borderColor: "#32936F",
                    }}
                    onClick = {() => {close(id)}}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      width: "100px",
                      backgroundColor: "#32936F",
                    }}
                    onClick = {()=>eliminarBedel(id)}
                >
                    Si
                </Button>
            </Box>
        </Box>
    </Modal>
  )
}
