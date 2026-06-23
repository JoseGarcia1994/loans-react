import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

export default function ClientsPage() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createClient = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Error creando cliente");
        return;
      }

      // 🚀 Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error creando cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      activePath="/clients"
      title="Nuevo cliente"
      subtitle="Registra un cliente en tu cartera"
    >
      {/* Return Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            color: "rgba(255,255,255,0.75)",
            padding: "8px 14px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          ← Regresar
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "24px",
        }}
      >
        <h2
          style={{ color: "white", fontSize: "1.05rem", marginBottom: "6px" }}
        >
          Información del cliente
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: ".82rem",
            marginBottom: "18px",
          }}
        >
          Campos con <span style={{ color: "#4ade80" }}>*</span> son
          obligatorios
        </p>

        {error && (
          <div
            style={{
              marginBottom: "14px",
              background: "rgba(239,68,68,.12)",
              border: "1px solid rgba(239,68,68,.3)",
              color: "#ef4444",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "0.85rem",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={createClient}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
          }}
        >
          {/* Name */}
          <div>
            <label style={labelStyle}>
              Nombre <span style={requiredStyle}>*</span>
            </label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Juan"
              style={inputStyle}
            />
          </div>

          {/* Last Name */}
          <div>
            <label style={labelStyle}>
              Apellido <span style={requiredStyle}>*</span>
            </label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Pérez"
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>
              Teléfono <span style={requiredStyle}>*</span>
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="3312345678"
              style={inputStyle}
            />
          </div>

          {/* Mailing Address */}
          <div>
            <label style={labelStyle}>Dirección</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Opcional"
              style={inputStyle}
            />
          </div>

          {/* Notes (full width) */}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Notas</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Información adicional"
              rows={3}
              style={{
                ...inputStyle,
                height: "80px",
                resize: "none",
                paddingTop: "12px",
              }}
            />
          </div>

          {/* Button */}
          <div style={{ gridColumn: "1 / -1" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: "46px",
                border: "none",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: ".9rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                background: "linear-gradient(135deg,#4ade80,#22d3ee)",
                color: "#052e16",
              }}
            >
              {loading ? "Creando..." : "Crear cliente"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

const inputStyle = {
  width: "100%",
  height: "44px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  padding: "0 12px",
  outline: "none",
  fontSize: "0.9rem",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  color: "rgba(255,255,255,.7)",
  marginBottom: "6px",
  fontWeight: 600,
  fontSize: ".85rem",
};

const requiredStyle = {
  color: "#4ade80",
};
