import React, { useState } from 'react';
import axios from '../api/axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/forgot-password', { email });
      alert('Check your email for reset link');
    } catch {
      alert('Error sending reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-2">Send Reset Link</button>
      </form>
    </div>
  );
}
