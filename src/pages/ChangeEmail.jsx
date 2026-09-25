import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import Input from "../components/ui/Input";
import Alert from "../components/ui/Alert";

export default function ChangeEmail() {
  const [form, setForm] = useState({ currentEmail: "", newEmail: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://127.0.0.1:8000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((user) => {
        if (user?.email) {
          setForm((current) => ({ ...current, currentEmail: user.email }));
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.newEmail.trim().toLowerCase() === form.currentEmail.trim().toLowerCase()) {
      setError("El nuevo correo debe ser diferente al correo actual.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/user/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          new_email: form.newEmail.trim(),
          password: form.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.detail ?? "No fue posible actualizar el correo.");
      }

      setSuccess("Correo electrónico actualizado correctamente.");
      setForm((current) => ({
        currentEmail: current.newEmail,
        newEmail: "",
        password: "",
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible actualizar el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      activePath="/access-preferences"
      title="Cambiar correo electrónico"
      subtitle="Mi perfil · Preferencias de ingreso"
    >
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "20px", padding: "32px" }}>
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message={success} />}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input
              label="Correo actual"
              type="email"
              value={form.currentEmail}
              placeholder="Correo actual"
              disabled
            />
            <Input
              label="Nuevo correo"
              type="email"
              value={form.newEmail}
              onChange={handleChange("newEmail")}
              placeholder="nuevo@correo.com"
              required
            />
            <Input
              label="Contraseña actual"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="Confirma tu identidad"
              required
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "8px",
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
              {loading ? "Guardando..." : "Guardar correo"}
            </button>
          </form>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Link
              to="/access-preferences"
              style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textDecoration: "none" }}
            >
              ← Volver a preferencias
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
