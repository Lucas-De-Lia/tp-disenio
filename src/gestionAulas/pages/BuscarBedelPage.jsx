import { Box, Button, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { Search } from "@mui/icons-material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CancelModal } from "../modals/CancelModal"
import { BuscarBedelTable } from "../components/BuscarBedelTable"

export const BuscarBedelPage = () => {

    const navigate = useNavigate(); 

    const [buscador, setBuscador] = useState("");

    const [filtro, setFiltro] = useState("");

    const [modal, setModal] = useState(false);
    
    const handleBuscador = (e) => {
        setBuscador(e.target.value)
    }

    const handleFiltro = (e) => {
        setFiltro(e.target.value)
    }

    const handleModal= () => {
        setModal(!modal)
    }

    const handleExit = () => {
        navigate("/dashboard");
    }
  return (
    <>
        <Header/>
        <Box
            sx={{
                background:"linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
                Height: "100vh",
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
                    component="h4"
                    textAlign="center"
                    mt={6}
                    mb={3}
                >
                    Buscar bedel
                </Typography>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-around"
                        alignItems="center"
                        width="100%"
                    >
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap="2px"
                            width="40%"
                        >
                            <Typography
                                htmlFor ="buscador"
                                color="#5E6366"
                                variant="caption"
                                component="label"
                                ml={1}
                            >
                                Términos de busqueda
                            </Typography>
                            <TextField
                                id = 'buscador'
                                type="search"
                                value={buscador}
                                onChange = {handleBuscador}
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
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap="2px"
                            width="40%"
                        >
                            <Typography
                                htmlFor ="filtro"
                                color="#5E6366"
                                variant="caption"
                                component="label"
                                ml={1}
                            >
                                Filtro
                            </Typography>
                            <Select
                                id="filtro"
                                value={filtro}
                                onChange={handleFiltro}
                                MenuProps={{
                                    disableScrollLock: true, // Evita bloquear el desplazamiento del body
                                }}
                            >
                                <MenuItem value = "Apellido">Apellido</MenuItem>
                                <MenuItem value = "Turno" >Turno</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                        {/*  aca voy a renderizar el componente con los bedeles */}
                    <BuscarBedelTable/>
                    <Box
                        display="flex"
                        alignContent = "center"
                        justifyContent="center"
                        mt={1}
                    >
                        <Button
                            variant="outlined"
                            size="medium"
                            sx={{
                                width: "200px",
                                color: "#32936F",
                                borderColor: "#32936F",
                        }}
                        onClick={handleModal}
                    >
                        Cancelar
                    </Button>     
                </Box>
            </Box>
        </Box>
        <CancelModal modal = {modal} handleModal = {handleModal} handleExit = {handleExit}/>
    </>
  )
}
