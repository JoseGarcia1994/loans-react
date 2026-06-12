import { useState } from "react";

export function LoginForm() {
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
    <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>

      {/* Logo solo en móvil */}
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

      {/* Alerta éxito */}
      {success && (
        <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#4ade80", fontSize: "0.88rem", fontWeight: 500 }}>✓ ¡Inicio exitoso! Redirigiendo...</span>
        </div>
      )}

      {/* Alerta error */}
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
  );
}
