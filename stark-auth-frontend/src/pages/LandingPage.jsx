import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-pink-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Stark Auth</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Secure authentication with all features powered by MERN.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded">Login</Link>
        <Link to="/register" className="bg-white border px-6 py-2 rounded">Register</Link>
      </div>
    </div>
  );
}
