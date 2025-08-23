import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/shared/ProtectedRoute";
import PublicRoute from "./components/shared/PublicRoute";

import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";

import LoginPage from "./pages/auth/LoginPage";
import ProductListPage from "./pages/products/ProductListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div>Página de Registo</div>} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/" element={<Navigate to="/products" />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 - Página Não Encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;
