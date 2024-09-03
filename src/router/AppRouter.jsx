import { Route, Routes } from "react-router-dom"
import { GestionRouter } from "../gestionAulas/routes/GestionRouter"
import { AuthRouter } from "../auth/routes/AuthRouter"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/*" element = {<GestionRouter/>}/>
    </Routes>
  )
}
