import { Route, Routes } from "react-router-dom"
import { GestionRouter } from "../gestionAulas/routes/GestionRouter"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { Header } from "../components/Header/Header"

export const AppRouter = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/*" element = {<GestionRouter/>}/>
      </Routes>
    </>

  )
}
