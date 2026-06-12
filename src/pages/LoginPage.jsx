import { useState } from "react";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="8" fill="rgba(74,222,128,0.15)" />
    <path d="M4.5 8.5l2 2 4-4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const perks = [
  { title: "Control total de tus préstamos", desc: "Registra clientes y préstamos a 14 semanas desde un solo lugar." },
  { title: "Sin errores de cálculo", desc: "Los saldos pendientes se actualizan solos con cada pago registrado." },
  { title: "Acceso desde cualquier lugar", desc: "Funciona en tu celular o computadora, sin instalar nada." },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username: email, password: password }),
      });

      if (!response.ok) throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      setSuccess(true);
      setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }

        .login-wrapper {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #0a0f0a;
        }

        .login-left {
          background: linear-gradient(145deg, #0f2027 0%, #1a3a2a 45%, #0d3b4f 100%);
          padding: clamp(40px, 6vw, 80px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .login-right {
          background: linear-gradient(160deg, #0d1117 0%, #0a1628 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(32px, 5vw, 64px);
          position: relative;
          overflow: hidden;
        }

        /* Mobile — apila en columna, oculta el lado izquierdo */
        @media (max-width: 768px) {
          .login-wrapper {
            grid-template-columns: 1fr;
          }

          .login-left {
            display: none;
          }

          .login-right {
            min-height: 100vh;
            padding: 32px 24px;
            background: linear-gradient(135deg, #0f2027 0%, #1a3a2a 30%, #0d3b4f 65%, #0f2027 100%);
          }

          .login-mobile-logo {
            display: block !important;
          }
        }
      `}</style>

      <div className="login-wrapper">

        {/* ── Lado izquierdo ── */}
        <div className="login-left">
          {/* Orbs decorativos */}
          <div style={{ position: "absolute", top: "-60px", left: "-60px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-40px", right: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

          {/* Logo */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.02em", color: "white" }}>
                Presta<span style={{ color: "#4ade80" }}>Control</span>
              </span>
            </a>
          </div>

          {/* Centro — frase + beneficios */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: "48px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.2)",
                color: "#86efac",
                fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "5px 12px", borderRadius: "100px",
                marginBottom: "20px",
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                Plataforma para prestamistas
              </span>

              <h2 style={{
                color: "white",
                fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "16px",
              }}>
                Todo el control de tus préstamos{" "}
                <span style={{
                  background: "linear-gradient(90deg, #4ade80, #38bdf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  en tus manos
                </span>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", lineHeight: 1.7 }}>
                Organiza clientes, registra pagos semanales y consulta saldos — sin libretas, sin errores.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {perks.map((p) => (
                <div key={p.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ marginTop: "2px" }}><CheckIcon /></div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.93rem", fontWeight: 600, marginBottom: "2px" }}>{p.title}</p>
                    <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.83rem", lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", position: "relative", zIndex: 1 }}>
            © 2026 PrestaControl · Todos los derechos reservados
          </p>
        </div>

        {/* ── Lado derecho — Formulario ── */}
        <div className="login-right">
          {/* Orb sutil */}
          <div style={{ position: "absolute", top: "10%", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

          {/* Orbs extra solo en móvil (fondo degradado) */}
          <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "-80px", left: "20%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />

          <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>

            {/* Logo visible solo en móvil */}
            <div className="login-mobile-logo" style={{ display: "none", marginBottom: "32px", textAlign: "center" }}>
              <a href="/" style={{ textDecoration: "none" }}>
                <span style={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.03em", color: "white" }}>
                  Presta<span style={{ color: "#4ade80" }}>Control</span>
                </span>
              </a>
            </div>

            {/* Header */}
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ color: "white", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>
                Bienvenido de vuelta
              </h1>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.9rem" }}>
                Inicia sesión para acceder a tu cuenta
              </p>
            </div>

            {/* Éxito */}
            {success && (
              <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#4ade80", fontSize: "0.88rem", fontWeight: 500 }}>✓ ¡Inicio exitoso! Redirigiendo...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#f87171", fontSize: "0.88rem", fontWeight: 500 }}>⚠ {error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "13px 16px", color: "white", fontSize: "0.95rem", outline: "none", transition: "border-color 0.2s, background 0.2s" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(74,222,128,0.45)"; e.target.style.background = "rgba(74,222,128,0.04)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", fontWeight: 600, marginBottom: "8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Contraseña
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "13px 48px 13px 16px", color: "white", fontSize: "0.95rem", outline: "none", transition: "border-color 0.2s, background 0.2s" }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(74,222,128,0.45)"; e.target.style.background = "rgba(74,222,128,0.04)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.background = "rgba(255,255,255,0.04)"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.28)", fontSize: "0.75rem", fontWeight: 500, padding: 0 }}
                  >
                    {showPassword ? "Ocultar" : "Ver"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: "4px", width: "100%",
                  background: loading ? "rgba(74,222,128,0.35)" : "linear-gradient(135deg, #4ade80, #22d3ee)",
                  color: "#052e16", padding: "14px", borderRadius: "12px",
                  fontWeight: 700, fontSize: "0.97rem", border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: loading ? "none" : "0 8px 24px rgba(74,222,128,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? (
                  <>
                    <span style={{ width: "14px", height: "14px", border: "2px solid rgba(5,46,20,0.4)", borderTopColor: "#052e16", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                    Iniciando sesión...
                  </>
                ) : "Iniciar sesión →"}
              </button>
            </form>

            {/* Divisor */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>o</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            </div>

            <a
              href="/register"
              style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "13px", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.93rem", transition: "background 0.2s" }}
              onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              ¿Sin cuenta? Regístrate gratis
            </a>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                href="/"
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.78rem", transition: "color 0.2s" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
              >
                ← Volver al inicio
              </a>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
