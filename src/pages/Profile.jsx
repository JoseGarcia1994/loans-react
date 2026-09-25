import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Profile() {
  const { user, loading } = useCurrentUser();

  const initial = user?.first_name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <DashboardLayout activePath="/profile" title="Mi perfil" subtitle="Información de tu cuenta">
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>

        {loading ? (
          <div style={{ height: "280px", background: "rgba(255,255,255,0.05)", borderRadius: "20px", animation: "pulse 1.5s ease-in-out infinite" }} />
        ) : (
          <>
            {/* Avatar + nombre */}
            <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "32px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80", fontWeight: 800, fontSize: "1.6rem", flexShrink: 0 }}>
                {initial}
              </div>
              <div>
                <h2 style={{ color: "white", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>
                  {user?.first_name} {user?.last_name}
                </h2>
                <span style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#86efac", fontSize: "0.7rem", fontWeight: 700, padding: "2px 10px", borderRadius: "100px", marginTop: "6px", display: "inline-block", textTransform: "capitalize" }}>
                  {user?.role ?? "usuario"}
                </span>
              </div>
            </div>

            {/* Datos */}
            <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "28px", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { label: "Nombre", value: user?.first_name },
                { label: "Apellido", value: user?.last_name },
                { label: "Correo electrónico", value: user?.email },
              ].map((field) => (
                <div key={field.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                    {field.label}
                  </p>
                  <p style={{ color: "white", fontSize: "0.97rem", fontWeight: 500, margin: 0 }}>
                    {field.value || "—"}
                  </p>
                </div>
              ))}
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ marginBottom: "4px" }}>
                <p style={{ color: "white", fontSize: "0.92rem", fontWeight: 700, margin: 0 }}>
                  Preferencias de ingreso
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.76rem", margin: "4px 0 0" }}>
                  Administra la seguridad y el acceso a tu cuenta.
                </p>
              </div>
              <Link
                to="/access-preferences"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "14px", padding: "16px 20px", textDecoration: "none", transition: "background 0.15s" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                    <rect x="3" y="8" width="12" height="8" rx="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" />
                    <path d="M6 8V5.75a3 3 0 0 1 6 0V8M9 11v2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "0.92rem" }}>Administrar preferencias</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>

              <button
                onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: "14px", padding: "16px 20px", cursor: "pointer", width: "100%", transition: "background 0.15s" }}
                onMouseOver={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.12)")}
                onMouseOut={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.06)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1rem" }}>🚪</span>
                  <span style={{ color: "#f87171", fontWeight: 600, fontSize: "0.92rem" }}>Cerrar sesión</span>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </DashboardLayout>
  );
}