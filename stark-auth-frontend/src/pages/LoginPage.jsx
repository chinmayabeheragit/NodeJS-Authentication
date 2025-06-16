import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed!');
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-500 text-sm">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate('/register')}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
