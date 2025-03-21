import { Box, Button, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { Search } from "@mui/icons-material"
import { useState } from "react"
import { ReservasPorCursoTable } from "../components/ReservasPorCursoTable"
import { CancelModal } from "../modals/CancelModal"
import { useNavigate } from "react-router-dom"


export const ReservasPorCursoPage = () => {

    const navigate = useNavigate();

    const [buscador, setBuscador] = useState("");

    const [cancelarModal, setCancelarModal] = useState(false);

    const [print, setPrint] = useState(false);


    const handleBuscador = (e) => {
        setBuscador(e.target.value);
    }


    const handleCancelar = () => {
        setCancelarModal(!cancelarModal);
    }

    const handleExit = () => {
        navigate('/dashboard');
    }

    const handlePrint = () => {
        setPrint(!print);
    }

  return (
    <>
        <Header/>
        <Box
            sx={{
                background:"linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
                width: "100%",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Box
                sx={{
                    background:"white",
                    mt:"50px",
                    mb: "50px",
                    padding:5,
                    borderRadius:2,
                    width: "60%",
                    Height: "80%",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"flex-start",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                >
                    Reservas por curso
                </Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width="80%"
                    mt={5}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="2px"
                        width="40%"
                    >
                    <Typography
                        variant="caption"
                        component="label"
                        htmlFor ="buscador"
                        color="#5E6366"
                        ml={1}
                        textAlign="center"
                    >
                        Cátedra,seminario o curso
                    </Typography>
                    <TextField
                        id = "buscador"
                        type="search"
                        value={buscador}
                        onChange={handleBuscador}
                        slotProps={{
                            input:{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <Search/>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    </Box>
                </Box>
                <ReservasPorCursoTable buscador={buscador} print={print} handlePrint={handlePrint}/>
                <Box
                        display="flex"
                        alignContent = "center"
                        justifyContent="center"
                        gap={5}
                >
                        <Button
                            variant="outlined"
                            size="medium"
                            sx={{
                                width: "200px",
                                color: "#32936F",
                                borderColor: "#32936F",
                            }}
                            onClick={handleCancelar}
                        >
                        Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            sx={{
                                width: "200px",
                                backgroundColor: "#32936F",
                            }}
                            onClick={handlePrint}
                        >
                        Imprimir
                        </Button>
                </Box>
            </Box>
        </Box>
        <CancelModal modal={cancelarModal} handleModal={handleCancelar} handleExit={handleExit}/>
    </>
  )
}
