import { CheckCircleOutlineOutlined } from "@mui/icons-material"
import { Box, Button, Modal, Typography } from "@mui/material"

export const SuccessModal = ({success,handleClose,handleSuccessExit}) => {

  return (
    <Modal open={success} onClose={handleClose} disableScrollLock>
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
                  <Typography variant="h5" component="h5" mt={5}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={2}
                    >
                      El bedel se ha registrado con exito!
                      <CheckCircleOutlineOutlined
                        sx={{ color: "#32936F", fontSize: 60 }}
                      />
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
                        variant="outlined"
                        size="medium"
                        sx={{
                          width: "200px",
                          color: "#32936F",
                          borderColor: "#32936F",
                          height: "50px",
                        }}
                        onClick={handleClose}
                      >
                        Registrar otro bedel
                      </Button>
                      <Button
                        variant="contained"
                        size="medium"
                        sx={{
                          width: "200px",
                          backgroundColor: "#32936F",
                          height: "50px",
                        }}
                        onClick={handleSuccessExit}
                      >
                        Salir
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
  )
}
