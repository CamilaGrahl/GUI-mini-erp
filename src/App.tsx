import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportPage from "./pages/ReportPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/productos" element={<DashboardPage />} />
        <Route path="/dashboard/reports" element={<ReportPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;