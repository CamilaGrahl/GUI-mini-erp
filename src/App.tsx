import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientsPage from "./pages/ClientsPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/productos" element={<DashboardPage />} />
        <Route path="/dashboard/clientes" element={<ClientsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;