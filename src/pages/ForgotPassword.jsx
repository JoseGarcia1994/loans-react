import { useState } from "react";
import { Link } from "react-router-dom";
import { loginCSS } from "../components/login/loginStyles";
import { LoginLeft } from "../components/login/LoginLeft";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "No fue posible procesar la solicitud.");
      }

      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{loginCSS}</style>
      <div className="login-wrapper">
        <LoginLeft />
        <div className="login-right">
          <div style={{ width: "100%", maxWidth: "400px", position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ color: "white", fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
                Recupera tu contraseña
              </p>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.9rem", lineHeight: 1.55, margin: "8px 0 0" }}>
                Ingresa el correo asociado a tu cuenta y te enviaremos un enlace seguro.
              </p>
            </div>

            {error && <Alert type="error" message={error} />}

            {sent ? (
              <div>
                <Alert
                  type="success"
                  message="Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña."
                />
                <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.8rem", lineHeight: 1.55, textAlign: "center" }}>
                  Revisa también la carpeta de correo no deseado.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Input
                  label="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@correo.com"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "rgba(74,222,128,0.35)" : "linear-gradient(135deg, #4ade80, #22d3ee)",
                    color: "#052e16",
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.97rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 8px 24px rgba(74,222,128,0.25)",
                  }}
                >
                  {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                </button>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link
                to="/login"
                style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.82rem", textDecoration: "none" }}
              >
                ← Volver a iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
