import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GoogleSuccessPage from './pages/GoogleSuccessPage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/google/callback" element={<GoogleSuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
