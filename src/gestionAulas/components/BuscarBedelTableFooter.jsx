import { NavigateBefore, NavigateNext } from '@mui/icons-material'
import { Box, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'

export const BuscarBedelTableFooter = ({paginaActual,cantidadFilas,setPaginaActual}) => {

  const handleNext = () => {
    if(paginaActual < cantidadFilas){
      setPaginaActual(paginaActual + 1);
    }
  }

  const handleBefore = () => {
    if(paginaActual > 1){
      setPaginaActual(paginaActual -1);
    }
  }

  return (
    <>
        <TableRow 
          sx={{
            "& td":{
              borderTop: "3px solid black",
            },
          }}
          
        >
            <TableCell align='center' colSpan={5}>
              <Box
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
              >
                <Typography component='p' variant='caption'>
                  {paginaActual + " de " + cantidadFilas}
                </Typography>
                <IconButton
                  onClick={handleBefore}
                >
                  <NavigateBefore/>
                </IconButton>
                <IconButton
                  onClick={handleNext}
                >
                  <NavigateNext/>
                </IconButton>
              </Box>
            </TableCell>
        </TableRow>
    </>
  )
}
