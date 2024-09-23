import { Route, Routes } from "react-router-dom"
import { Box } from '@mui/material';
import { GestionRouter } from "../gestionAulas/routes/GestionRouter"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { Header } from "../components/Header/Header"

export const AppRouter = () => {
  return (
    <>
      <Header/>
      <Box sx={{
          background:'linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)'
        }}
      >
        <Routes>
          <Route path="/auth/*" element={<AuthRouter />} />
          <Route path="/*" element = {<GestionRouter/>}/>
        </Routes>
      </Box>
    </>

  )
}
