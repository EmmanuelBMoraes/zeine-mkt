import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PublicRoute from "./components/shared/PublicRoute";

import AuthLayout from "./components/layouts/AuthLayout";
import MainLayout from "./components/layouts/MainLayout";

import LoginPage from "./pages/auth/LoginPage";
import ProductListPage from "./pages/products/ProductListPage";
import ProductCreatePage from "./pages/products/ProductCreatePage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/products/new" element={<ProductCreatePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/" element={<Navigate to="/products" />} />
            </Route>
          </Route>
          <Route path="*" element={<div>404 - Página Não Encontrada</div>} />
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
