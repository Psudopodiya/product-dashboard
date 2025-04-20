import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import AuthenticationPage from "./pages/AuthenticationPage";
import HomePage from "./pages/Home";
import ManageProductsPages from "./pages/ManageProductsPages";
import PriceOptimizationPage from "./pages/PriceOptimizationPage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/manage-product"
          element={
            <PrivateRoute>
              <MainLayout>
                <ManageProductsPages />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/price-optimization"
          element={
            <PrivateRoute>
              <MainLayout>
                <PriceOptimizationPage />
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
