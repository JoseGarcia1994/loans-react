import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

const preferenceItems = [
  {
    title: "Correo electrónico",
    description: "Dirección utilizada para ingresar y recibir información de tu cuenta.",
    action: "/change-email",
    type: "email",
  },
  {
    title: "Contraseña",
    description: "Actualiza tu contraseña periódicamente para mantener tu cuenta segura.",
    action: "/change-password",
    type: "password",
  },
];

function PreferenceIcon({ type }) {
  if (type === "email") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="m3 6 7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="9" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9M10 12.5v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function AccessPreferences() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const payload = decodeJwt(token);
    setEmail(payload?.sub ?? payload?.email ?? "");

    fetch("http://127.0.0.1:8000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((user) => {
        if (user?.email) setEmail(user.email);
      })
      .catch(() => {});
  }, []);

  return (
    <DashboardLayout
      activePath="/access-preferences"
      title="Preferencias de ingreso"
      subtitle="Administra cómo accedes a tu cuenta"
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "white", fontSize: "1.05rem", fontWeight: 750, margin: 0 }}>
            Acceso y seguridad
          </p>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.82rem", margin: "6px 0 0" }}>
            Selecciona la información que quieres actualizar.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {preferenceItems.map((item) => (
            <div
              key={item.type}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0 }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#4ade80",
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.18)",
                  }}
                >
                  <PreferenceIcon type={item.type} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: "white", fontSize: "0.95rem", fontWeight: 700, margin: 0 }}>
                    {item.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.36)", fontSize: "0.76rem", margin: "4px 0 0", lineHeight: 1.45 }}>
                    {item.description}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.8rem", fontWeight: 500, margin: "8px 0 0" }}>
                    {item.type === "email" ? email || "Correo no disponible" : "••••••••••••"}
                  </p>
                </div>
              </div>

              <Link
                to={item.action}
                style={{
                  flexShrink: 0,
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: "10px",
                  padding: "9px 14px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Editar
              </Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link
            to="/profile"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textDecoration: "none" }}
          >
            ← Volver a mi perfil
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
