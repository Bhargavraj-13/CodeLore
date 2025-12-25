import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
