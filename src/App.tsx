import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PublicRoute from "./components/shared/PublicRoute";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<div>Página de Registo</div>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/products"
            element={<div>Página de Produtos (Protegida)</div>}
          />
          <Route path="/" element={<Navigate to="/products" />} />
        </Route>
        <Route path="*" element={<div>404 - Página Não Encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
