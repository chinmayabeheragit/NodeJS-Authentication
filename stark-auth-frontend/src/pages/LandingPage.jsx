import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Stark Auth</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Secure authentication powered by Google OAuth and JWT. Begin your journey now.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="bg-gray-100 text-gray-800 px-6 py-2 rounded shadow hover:bg-gray-200">
          Register
        </Link>
      </div>
    </div>
  );
}
