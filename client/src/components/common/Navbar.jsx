import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="h-16 bg-white border-b shadow-sm flex items-center px-8">
      {/* Logo */}
      <div
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Learnify<span className="text-gray-800">AI</span>
      </div>

      {/* Links */}
      <div className="ml-10 flex gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-600`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-blue-600" : "text-gray-600"
            } hover:text-blue-600`
          }
        >
          History
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="ml-auto text-sm text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

        