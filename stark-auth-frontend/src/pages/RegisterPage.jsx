import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { FaGoogle } from 'react-icons/fa';

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('/register', form);
      alert('Registered! You can login now.');
      nav('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  const googleLogin = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, '_self');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Register</button>
        </form>
        <div className="text-center my-2">OR</div>
        <button onClick={googleLogin} className="flex justify-center items-center border py-2 rounded">
          <FaGoogle className="mr-2 text-red-500" /> Continue with Google
        </button>
        <div className="mt-4 text-center text-sm">
          <span>Already have an account? </span>
          <button onClick={() => nav('/login')} className="text-blue-600">Login</button>
        </div>
      </div>
    </div>
  );
}
