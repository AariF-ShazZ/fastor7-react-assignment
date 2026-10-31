import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Restaurants from "./pages/Restaurants";
import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route
          path="/restaurants"
          element={
            <ProtectedRoute>
              <Restaurants />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/restaurants" replace />} />
      </Routes>
    </>
  );
}