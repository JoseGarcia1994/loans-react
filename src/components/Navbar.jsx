import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Wallet,
  CalendarDays,
  LogOut,
  Menu,
  X,
  CircleUser,
  Lock,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <header className="px-6 pt-5">
      <div
        className={`
        navbar-glass
        max-w-7xl
        mx-auto
        bg-white
        px-5
        py-3
        transition-all
        duration-300
        ${menuOpen ? "rounded-3xl" : "rounded-full"}
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                flex
                items-center
                justify-center
                text-white
              "
            >
              <Wallet size={20} />
            </div>

            <h1 className="font-bold text-xl text-gray-800">Tu Cartera</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" className={navStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/weekly-payments" className={navStyle}>
              <CalendarDays size={18} />
              Cobranza
            </NavLink>

            <NavLink to="/create-loan" className={navStyle}>
              <Wallet size={18} />
              Nuevo Préstamo
            </NavLink>
          </nav>

          {/* User Settings */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="
              w-10
              h-10
              rounded-full
              bg-slate-100
              hover:bg-slate-200
              flex
              items-center
              justify-center
            "
            >
              <CircleUser size={22} />
            </button>

            {profileOpen && (
              <div
                className="
                absolute
                right-0
                top-12
                w-56
                bg-white
                rounded-2xl
                shadow-lg
                border
                p-2
                z-50
              "
              >
                <NavLink
                  to="/profile"
                  className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-slate-100
                "
                >
                  <CircleUser size={18} />
                  Mi Perfil
                </NavLink>

                <NavLink
                  to="/change-password"
                  className="
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  hover:bg-slate-100
                "
                >
                  <Lock size={18} />
                  Cambiar contraseña
                </NavLink>

                <button
                  onClick={logout}
                  className="
                  w-full
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-lg
                  text-red-600
                  hover:bg-red-50
                "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-gray-100
            "
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="
              md:hidden
              mt-4
              border-t
              pt-4
              flex
              flex-col
              gap-2
              "
          >
            <NavLink
              to="/dashboard"
              className={navStyle}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/weekly-payments"
              className={navStyle}
              onClick={() => setMenuOpen(false)}
            >
              Cobranza
            </NavLink>

            <NavLink
              to="/create-loan"
              className={navStyle}
              onClick={() => setMenuOpen(false)}
            >
              Nuevo Préstamo
            </NavLink>

            <NavLink
              to="/profile"
              className={navStyle}
              onClick={() => setMenuOpen(false)}
            >
              <CircleUser size={18} />
              Mi Perfil
            </NavLink>

            <NavLink
              to="/change-password"
              className={navStyle}
              onClick={() => setMenuOpen(false)}
            >
              <Lock size={18} />
              Cambiar contraseña
            </NavLink>

            <button
              onClick={logout}
              className="
                bg-red-50
                text-red-600
                rounded-xl
                px-4
                py-2
                text-left
                "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
