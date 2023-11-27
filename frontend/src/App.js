import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import SolicitudTurnoPage from "./pages/SolicitudTurnoPage";
import ChequeoPage from "./pages/ChequeoPage";
import CalificarPage from "./pages/CalificarPage";
import TurnosPage from "./pages/TurnosPage";
import TurnoEditPage from "./pages/TurnoEditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<TurnosPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/turno" element={<SolicitudTurnoPage />} />
        <Route exact path="/turnoEdit/:turnoId" element={<TurnoEditPage />} />
        <Route exact path="/chequeo/:turnoId" element={<ChequeoPage />} />
        <Route exact path="/calificar/:turnoId" element={<CalificarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
