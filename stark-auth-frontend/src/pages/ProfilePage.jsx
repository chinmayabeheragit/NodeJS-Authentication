import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProfilePage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/users/${id}`); // ✅ This now works after axios baseURL fix
        setUser(res.data);
      } catch {
        localStorage.removeItem('token');
        nav('/login');
      }
    };
    fetchProfile();
  }, [id, nav]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl mb-4">Hello, {user.name}</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => {
          localStorage.removeItem('token');
          nav('/login');
        }} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">Logout</button>
      </div>
    </div>
  );
}
