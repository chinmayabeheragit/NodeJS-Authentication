import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminProfilePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        if (res.data.role !== 'admin') throw new Error('Not an admin');
        setAdmin(res.data);
      } catch {
        localStorage.removeItem('token');
        nav('/login');
      }
    };
    fetchAdmin();
  }, [id, nav]);

  if (!admin) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-4">Welcome Admin: {admin.name}</h2>
        <p>Email: {admin.email}</p>
        <p>Role: {admin.role}</p>
        <button onClick={() => {
          localStorage.removeItem('token');
          nav('/login');
        }} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
    </div>
  );
}
