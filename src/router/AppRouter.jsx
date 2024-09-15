import { Route, Routes } from "react-router-dom"
import { GestionRouter } from "../gestionAulas/routes/GestionRouter"
import { AuthRouter } from "../auth/routes/AuthRouter"
import { Headerr } from "../components/Headerr"
import { Header } from "../components/Header/Header"
export const AppRouter = () => {
  return (
    <>
     {/*  <Header/> */}
      <Headerr/>
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/*" element = {<GestionRouter/>}/>
      </Routes>
    </>

  )
}
