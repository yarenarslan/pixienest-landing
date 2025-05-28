import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/layout/dashboard";
import Auth from "@/layout/auth";
import PrivateRoute from "@/components/private-route";
import Landing from "@/pages/dashboard/landing"; // ← düzeltildi
import ResetPassword from "@/pages/auth/reset-password";



function App() {
  return (

    <Routes>
      {/* 🔐 Dashboard sayfaları sadece giriş yapmış kullanıcıya */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

      {/* 🔓 Giriş / kayıt sayfaları */}
      <Route path="/auth/*" element={<Auth />} />

      {/* 💻 Landing page (kamuya açık tanıtım sayfası) */}
      <Route path="/" element={<Landing />} />

      {/* 🔁 Tüm tanımsız yolları "/" sayfasına yönlendir */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
