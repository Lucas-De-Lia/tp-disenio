import { Navigate, Route, Routes } from "react-router-dom"
import { AulasPage, MainPage, ReservasPage, MainMenuPage} from "../pages";
export const GestionRouter = () => {
  return (
    <Routes>
      <Route path="aulas" element = {<AulasPage/>}/>
      <Route path="reservas" element = {<ReservasPage/>}/>
      <Route path="dashboard" element = {<MainMenuPage/>}/>
      <Route path="/" element = {<MainPage/>}/>
      <Route path = "/*" element = {<Navigate to= "/"/>}/>
    </Routes>
  )
}
