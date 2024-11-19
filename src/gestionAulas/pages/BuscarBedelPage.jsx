import { Box, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Header } from "../../components"
import { Search } from "@mui/icons-material"

export const BuscarBedelPage = () => {
  return (
    <>
        <Header/>
        <Box
            sx={{
                background:"linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)",
                minHeight: "100vh",
                minwidth: "100vw",
                display:"flex",
                alignItems:"center",
                justifyContent:"center"
            }}
        >
            <Box
                sx={{
                    background:"white",
                    marginTop:"50px",
                    borderRadius:2,
                    width: "60%",
                    minHeight: "90vh",
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
                    justifyContent="space-evenly"
                    alignItems="center"

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
                            labelId="filtro"
                            id="filtro"
                            MenuProps={{
                                disableScrollLock: true, // Evita bloquear el desplazamiento del body
                            }}
                        >
                            <MenuItem value = "Apellido">Apellido</MenuItem>
                            <MenuItem value = "Turno" >Turno</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}
