import { Box, Button, Modal, Typography } from "@mui/material"

export const EliminarError = ({eliminarError,handleEliminarError}) => {
  return (
    <Modal open={eliminarError} disableScrollLock>
        <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            width: "35%",
            height: "35%",
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
                No se ha podido elimiar al bedel!
            </Typography>
            <Button
                variant="contained"
                size="medium"
                sx={{
                    width: "200px",
                    backgroundColor: "#32936F",
                }}
                onClick={handleEliminarError}
            >
                OK
            </Button>
        </Box>
    </Modal>
  )
}
