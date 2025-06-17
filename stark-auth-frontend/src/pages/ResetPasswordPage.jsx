import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const nav = useNavigate();
  const [password, setPassword] = useState('');

  const handleReset = async e => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { token, newPassword: password });
      alert('Password reset successful');
      nav('/login');
    } catch {
      alert('Reset failed (expired or invalid)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-2">Reset</button>
      </form>
    </div>
  );
}
