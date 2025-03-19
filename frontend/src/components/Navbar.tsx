// frontend/src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaGlobe, FaUserPlus } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/translate" className="text-xl font-bold flex items-center gap-2">
        🌍 <span>Japanese NLP</span>
      </Link>
      <div className="flex gap-4">
        {!isAuthenticated && (
          <Link
            to="/register"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-lg font-semibold transition-all shadow-md"
          >
            <FaUserPlus /> Register
          </Link>
        )}
        {isAuthenticated && (
          <>
            <Link
              to="/translations"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-lg font-semibold transition-all shadow-md"
            >
              <FaGlobe /> Translations
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-lg font-semibold transition-all shadow-md"
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
