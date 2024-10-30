import { Route, Routes } from "react-router-dom"
import { Box } from '@mui/material';
import { GestionRouter } from "../gestionAulas/routes/GestionRouter"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { MainPage } from "../pages/MainPage";
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Box sx={{
          background:'linear-gradient(180deg, #32936F 30% , #328880 60%,#32838A 74%,#29768D 88%)'
        }}
      >
        <Routes>
          
          <Route path="/auth/*" element={
            <PublicRoute>
              <AuthRouter />
            </PublicRoute>
          } />
          <Route path="/" element={<MainPage />} />
          <Route path = '/*' element={
            <PrivateRoute>
              <GestionRouter/>
            </PrivateRoute>}
          >
          </Route>
        </Routes>
      </Box>
    </>

  )
}
