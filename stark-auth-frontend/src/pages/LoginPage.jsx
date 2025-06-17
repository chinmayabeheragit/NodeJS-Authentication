import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { FaGoogle } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode'; // ✅ FIXED: default import

export default function LoginPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('/auth/login', form);
    const token = res.data.token;
    localStorage.setItem('token', token);

    const decoded = jwtDecode(token);
    const userId = decoded._id || decoded.id;

    // ✅ Conditional Redirect Based on Role
    if (decoded.role === 'admin') {
      nav(`/admin/${userId}`);
    } else {
      nav(`/profile/${userId}`);
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};


  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, '_self');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-3">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
        <div className="text-center my-2">OR</div>
        <button onClick={googleLogin} className="flex justify-center items-center border py-2 rounded">
          <FaGoogle className="mr-2 text-red-500" /> Continue with Google
        </button>
        <div className="mt-4 flex justify-between text-sm">
          <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
          <Link to="/register" className="text-blue-600">Register</Link>
        </div>
      </div>
    </div>
  );
}
