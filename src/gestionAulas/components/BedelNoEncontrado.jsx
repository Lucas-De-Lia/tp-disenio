import { ErrorOutline } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"

export const BedelNoEncontrado = () => {
  return (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="700px"
        height="500px"
        mt={2}
        gap={2}
    >
        <ErrorOutline sx={{
                color:'black',
                fontSize: 40
            }}/>
        <Typography
            component={"p"}
            variant={"h6"}
            sx={{
                color: "black",
                backgroundColor: "rgba(237, 237, 237, 1)",
                padding:2,
                borderRadius:5,
            }}
        >
            No se han encontrado bedeles que cumplan <br/>
            con los criterios ingresados.
        </Typography>
    </Box>
  )
}
