import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import logo from "../assets/Prestamo_Control.png"

function PublicNavbar() {
  return (
    <header className="px-6 pt-5">
      <div
        className="
        max-w-7xl
        mx-auto
        bg-white
        rounded-full
        px-5
        py-3
        shadow-sm
        border
        border-gray-100
        "
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
          />

          {/* Botones */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="
            text-gray-700
            hover:text-green-600
            font-medium
            "
            >
              Iniciar sesión
            </Link>

            <Link
              to="/register"
              className="
            hidden md:block
            bg-green-600
            hover:bg-green-700
            text-white
            px-5
            py-2
            rounded-full
            font-medium
            "
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default PublicNavbar;
