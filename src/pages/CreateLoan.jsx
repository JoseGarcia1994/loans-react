import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import Alert from "../components/ui/Alert";

export default function CreateLoan() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    amount: "",
    date: "",
  });

  // =========================
  // FETCH CLIENTS
  // =========================
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://127.0.0.1:8000/client", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.data || [];
        setClients(list);
      } catch (err) {
        console.error("Error loading clients", err);
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================
  // FILTER CLIENTS
  // =========================
  const filteredClients = search.trim()
    ? clients.filter((c) => {
        const q = search.toLowerCase();
        return (
          c.first_name?.toLowerCase().includes(q) ||
          c.last_name?.toLowerCase().includes(q) ||
          c.phone?.includes(q)
        );
      })
    : [];

  const handleSelectClient = (c) => {
    setClientId(c.id);
    setSearch(`${c.first_name} ${c.last_name} - ${c.phone}`);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setClientId("");
    setShowDropdown(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE LOAN
  // =========================
  const createLoan = async (e) => {
    e.preventDefault();
    setError("");

    if (!clientId) {
      setError("Selecciona un cliente de la lista");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/loans/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          client_id: Number(clientId),
          amount: Number(formData.amount),
          date: formData.date,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Error creando préstamo");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Error creating loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      activePath="/create-loan"
      title="Nuevo préstamo"
      subtitle="Selecciona un cliente existente o crea uno nuevo"
    >
      {/* Botón regresar */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "24px",
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
            padding: "9px 18px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "0.88rem",
            textDecoration: "none",
          }}
        >
          ← Regresar
        </Link>
      </div>

      {/* Card */}
      <div
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "32px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <h2 style={{ color: "white", fontSize: "1.6rem", fontWeight: 700 }}>
            Crear préstamo
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.92rem" }}>
            Selecciona un cliente existente o crea uno nuevo
          </p>
        </div>

        {error && (
          <div style={{ marginBottom: "20px" }}>
            <Alert type="error" message={error} />
          </div>
        )}

        <form
          onSubmit={createLoan}
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          {/* CLIENT AUTOCOMPLETE */}
          <div>
            <label style={labelStyle}>
              Cliente <span style={{ color: "#4ade80" }}>*</span>
            </label>

            <div ref={dropdownRef} style={{ position: "relative" }}>
              {/* Input de búsqueda */}
              <div style={{ position: "relative" }}>
                <span style={searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar por nombre o teléfono..."
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={() => search.trim() && setShowDropdown(true)}
                  style={{ ...inputStyle, paddingLeft: "38px" }}
                  autoComplete="off"
                />
                {clientId && <span style={selectedBadge}>✓</span>}
              </div>

              {/* Lista de resultados */}
              {showDropdown && filteredClients.length > 0 && (
                <div style={dropdownStyle}>
                  {filteredClients.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => handleSelectClient(c)}
                      style={dropdownItem}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(74,222,128,0.1)";
                        e.currentTarget.style.borderLeftColor = "#4ade80";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderLeftColor = "transparent";
                      }}
                    >
                      <span style={{ color: "white", fontWeight: 600 }}>
                        {c.first_name} {c.last_name}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>
                        {c.phone}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sin resultados */}
              {showDropdown && search.trim() && filteredClients.length === 0 && (
                <div style={dropdownStyle}>
                  <div
                    style={{
                      padding: "14px 16px",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.88rem",
                      textAlign: "center",
                    }}
                  >
                    Sin resultados para "{search}"
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate("/clients")}
              style={smallBtn}
            >
              + Crear nuevo cliente
            </button>
          </div>

          {/* MONTO */}
          <div>
            <label style={labelStyle}>Monto *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="5000"
              style={inputStyle}
            />
          </div>

          {/* FECHA */}
          <div>
            <label style={labelStyle}>Fecha *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* BOTÓN */}
          <button type="submit" disabled={loading} style={submitBtn}>
            {loading ? "Creando..." : "Crear préstamo"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

// =========================
// STYLES
// =========================

const inputStyle = {
  width: "100%",
  height: "48px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  padding: "0 14px",
  outline: "none",
  fontSize: "0.92rem",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  color: "rgba(255,255,255,0.75)",
  marginBottom: "6px",
  fontWeight: 600,
  fontSize: "0.85rem",
};

const smallBtn = {
  marginTop: "8px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.15)",
  color: "#4ade80",
  padding: "6px 10px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  cursor: "pointer",
};

const submitBtn = {
  height: "52px",
  border: "none",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "0.95rem",
  background: "linear-gradient(135deg, #4ade80, #22d3ee)",
  color: "#052e16",
  marginTop: "10px",
};

const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 6px)",
  left: 0,
  right: 0,
  background: "rgba(15,20,30,0.97)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "14px",
  backdropFilter: "blur(20px)",
  zIndex: 100,
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
};

const dropdownItem = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "12px 16px",
  cursor: "pointer",
  borderLeft: "3px solid transparent",
  transition: "background 0.15s, border-color 0.15s",
};

const searchIcon = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "0.85rem",
  pointerEvents: "none",
  zIndex: 1,
};

const selectedBadge = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#4ade80",
  fontWeight: 700,
  fontSize: "1rem",
};