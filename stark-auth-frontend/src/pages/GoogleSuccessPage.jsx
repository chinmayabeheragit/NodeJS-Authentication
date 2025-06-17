import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function GoogleSuccessPage() {
  const nav = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;
      nav(`/profile/${userId}`);
    } else {
      nav('/login');
    }
  }, [nav]);

  return <div>Redirecting...</div>;
}
