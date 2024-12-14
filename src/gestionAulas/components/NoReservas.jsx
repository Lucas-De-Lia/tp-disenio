import { ErrorOutline } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export const NoReservas = ({message}) => {
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
            textAlign="center"
            maxWidth={500}
        >
            {message || "No se han encontrado reservas que cumplan con los criterios ingresados."}
        </Typography>
    </Box>
  )
}
