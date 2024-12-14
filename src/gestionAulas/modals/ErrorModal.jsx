import { ErrorOutline } from "@mui/icons-material"
import { Box, Button, Modal, Typography } from "@mui/material"


export const ErrorModal = ({error,handleErrorModal}) => {
  return (
    <Modal open={error} onClose={() => handleErrorModal(false)} disableScrollLock>
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
                    padding: 5,
                  }}
                >
                  <Typography variant="h6" component="h5" mt={5}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textAlign="center"
                      gap={2}
                    >
                      Algunos campos no son válidos, por favor verifique los
                      datos ingresados.
                      <ErrorOutline sx={{ color: "#32936F", fontSize: 60 }} />
                    </Box>
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={5}
                  >
                    <Box display="flex" alignItems="center" gap={5}>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          width: "200px",
                          backgroundColor: "#32936F",
                          height: "50px",
                        }}
                        onClick={() => handleErrorModal(false)}
                      >
                        Aceptar
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
  )
}
