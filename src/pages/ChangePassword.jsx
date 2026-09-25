import { useState } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError(""); setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password: form.currentPassword, new_password: form.newPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail ?? "Error al actualizar la contraseña.");
      }
      setSuccess("Contraseña actualizada correctamente.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activePath="/access-preferences" title="Cambiar contraseña" subtitle="Mi perfil · Preferencias de ingreso">
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "32px" }}>

          {error   && <Alert type="error"   message={error} />}
          {success && <Alert type="success" message={success} />}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input
              label="Contraseña actual"
              type="password"
              value={form.currentPassword}
              onChange={handleChange("currentPassword")}
              placeholder="••••••••"
              required
            />
            <Input
              label="Nueva contraseña"
              type="password"
              value={form.newPassword}
              onChange={handleChange("newPassword")}
              placeholder="Mínimo 8 caracteres"
              required
            />
            <Input
              label="Confirmar nueva contraseña"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              placeholder="Repite la nueva contraseña"
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "8px", width: "100%",
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
                  Guardando...
                </>
              ) : "Guardar contraseña →"}
            </button>
          </form>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a href="/access-preferences" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
              ← Volver a preferencias
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  );
}
