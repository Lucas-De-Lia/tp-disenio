import { Box, Button, Modal, Typography } from "@mui/material"

export const CancelModal = ({modal, handleModal,handleExit}) => {
  return (
    <Modal open={modal} onClose={() => handleModal(false)}>
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
                  <Typography variant="h5" component="h5" mt={5}>
                    ¿Está seguro que desea cancelar?
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
                          width: "100px",
                          color: "#32936F",
                          borderColor: "#32936F",
                        }}
                        onClick={() => handleModal(false)}
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
                        onClick={handleExit}
                      >
                        Si
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Modal>
  )
}
