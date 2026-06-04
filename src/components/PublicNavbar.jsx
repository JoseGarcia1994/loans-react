// src/components/PublicNavbar.jsx

import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";

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
          <Link to="/" className="flex items-center gap-2">
            <div
              className="
              w-10
              h-10
              rounded-full
              bg-green-600
              flex
              items-center
              justify-center
              text-white
              "
            >
              <Wallet size={20} />
            </div>

            <h1 className="font-bold text-lg md:text-xl text-gray-800">
              Tu Cartera
            </h1>
          </Link>

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
