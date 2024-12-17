import { MenuItem } from "@mui/material"

export const DocentesByName = ({docentes}) => {

  return (
    <>
        {
            docentes.map((docente) => (
                <MenuItem 
                    key={docente.id} 
                    value = {docente.nombre}
                >
                    {docente.nombre}
                </MenuItem>
            ))
        }
    </>
  )
}
