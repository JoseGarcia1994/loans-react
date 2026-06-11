import { glass } from "./glass";

export function Navbar() {
  return (
    <nav style={{
      ...glass,
      borderRadius: 0,
      borderLeft: "none", borderRight: "none", borderTop: "none",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: "64px" }}>
        <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "white" }}>
          Presta<span style={{ color: "#4ade80" }}>Control</span>
        </span>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", fontWeight: 500, padding: "8px 16px", borderRadius: "8px" }}
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            style={{
              background: "rgba(74,222,128,0.9)",
              color: "#052e16",
              fontSize: "0.88rem", fontWeight: 700,
              padding: "8px 18px", borderRadius: "10px",
              backdropFilter: "blur(8px)",
            }}
          >
            Crear cuenta
          </a>
        </div>
      </div>
    </nav>
  );
}
