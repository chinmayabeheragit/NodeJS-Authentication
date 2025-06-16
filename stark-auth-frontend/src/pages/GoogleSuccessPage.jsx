import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccessPage = () => {
  const navigate = useNavigate();
  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    if (hasHandled) return; // Prevent re-execution
    setHasHandled(true);

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      alert('Google login successful!');
      navigate('/');
    } else {
      alert('Login failed or token missing.');
      navigate('/login');
    }
  }, [navigate, hasHandled]);

  return <div>Redirecting...</div>;
};

export default GoogleSuccessPage;
