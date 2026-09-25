import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loginCSS } from "../components/login/loginStyles";
import { LoginLeft } from "../components/login/LoginLeft";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [form, setForm] = useState({ password: "", confirmation: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("El enlace de recuperación no es válido.");
      return;
    }
    if (form.password.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (form.password !== form.confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: form.password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "El enlace no es válido o ya expiró.");
      }

      setSuccess(true);
      setForm({ password: "", confirmation: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible actualizar la contraseña.");
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
                Crea una nueva contraseña
              </p>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.9rem", lineHeight: 1.55, margin: "8px 0 0" }}>
                Utiliza al menos 8 caracteres y evita contraseñas que ya hayas usado.
              </p>
            </div>

            {error && <Alert type="error" message={error} />}
            {success && (
              <Alert type="success" message="Tu contraseña fue actualizada. Ya puedes iniciar sesión." />
            )}

            {!success && (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Input
                  label="Nueva contraseña"
                  type="password"
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <Input
                  label="Confirmar contraseña"
                  type="password"
                  value={form.confirmation}
                  onChange={handleChange("confirmation")}
                  placeholder="Repite tu nueva contraseña"
                  required
                />
                <button
                  type="submit"
                  disabled={loading || !token}
                  style={{
                    marginTop: "4px",
                    width: "100%",
                    background: loading || !token ? "rgba(74,222,128,0.35)" : "linear-gradient(135deg, #4ade80, #22d3ee)",
                    color: "#052e16",
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "0.97rem",
                    border: "none",
                    cursor: loading || !token ? "not-allowed" : "pointer",
                    boxShadow: loading || !token ? "none" : "0 8px 24px rgba(74,222,128,0.25)",
                  }}
                >
                  {loading ? "Actualizando..." : "Guardar nueva contraseña"}
                </button>
              </form>
            )}

            {!token && (
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "0.8rem", textAlign: "center", marginTop: "16px" }}>
                Solicita un nuevo enlace para continuar.
              </p>
            )}

            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Link
                to={success ? "/login" : "/forgot-password"}
                style={{ color: success ? "#4ade80" : "rgba(255,255,255,0.42)", fontSize: "0.82rem", fontWeight: success ? 700 : 500, textDecoration: "none" }}
              >
                {success ? "Ir a iniciar sesión →" : "← Solicitar otro enlace"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
