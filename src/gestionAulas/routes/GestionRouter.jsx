import { Navigate, Route, Routes } from "react-router-dom"
import { ModificarBedelPage, AulasPage, ReservasPage, MainMenuPage, ReservasPorFechaPage, ReservasPorCursoPage, BuscarBedelPage, RegistrarBedelPage, RegistrarReservaPage } from "../pages";


export const GestionRouter = () => {
  return (
    <Routes>
      <Route path="aulas" element={<AulasPage />} />
      <Route path="reservas" element={<ReservasPage />} />
      <Route path="reservas-por-fecha" element={<ReservasPorFechaPage />} />
      <Route path="reservas-por-curso" element={<ReservasPorCursoPage />} />
      <Route path="buscar-bedel" element={<BuscarBedelPage />} />
      <Route path="modificar-bedel/:id" element={<ModificarBedelPage/>}/>
      <Route path="registrar-bedel" element={<RegistrarBedelPage />} />
      <Route path="registrar-reserva" element={<RegistrarReservaPage />} />
      <Route path="dashboard" element={<MainMenuPage />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
