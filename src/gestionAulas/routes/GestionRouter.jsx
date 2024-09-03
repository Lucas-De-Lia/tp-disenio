import { Navigate, Route, Routes } from "react-router-dom"
import { AulasPage, MainPage, ReservasPage } from "../pages";
export const GestionRouter = () => {
  return (
    <Routes>
      <Route path="aulas" element = {<AulasPage/>}/>
      <Route path="reservas" element = {<ReservasPage/>}/>
      <Route path="/" element = {<MainPage/>}/>
      <Route path = "/*" element = {<Navigate to= "/"/>}/>
    </Routes>
  )
}
