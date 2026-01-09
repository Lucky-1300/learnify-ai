import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();

  // ✅ LOGOUT HANDLER - Clear auth state and redirect
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg flex items-center px-8">
      {/* Logo - Professional branding */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/dashboard")}
      >
        <div className="text-2xl font-bold text-white">
          Learnify<span className="text-blue-100">AI</span>
        </div>
      </div>

      {/* Navigation Links - Only show when authenticated */}
      {isAuthenticated && (
        <div className="ml-10 flex gap-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-white border-b-2 border-white"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-white border-b-2 border-white"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            History
          </NavLink>
        </div>
      )}

      {/* User Info & Logout - Only show when authenticated */}
      {isAuthenticated && (
        <div className="ml-auto flex items-center gap-6">
          {user && (
            <span className="text-sm text-blue-100">
              Welcome, <span className="font-semibold text-white">{user.name}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition transform hover:scale-105"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

        