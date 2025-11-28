import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from "./pages/ReportPage";
import ClientsPage from "./pages/ClientsPage";

function App() {

  return (
    <BrowserRouter basename="/GUI-mini-erp">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/productos" element={<DashboardPage />} />
        <Route path="/dashboard/clientes" element={<ClientsPage />} />
        <Route path="/dashboard/reportes" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;