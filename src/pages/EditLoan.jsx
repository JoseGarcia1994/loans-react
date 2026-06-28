import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";

const S = {
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
  },
  dateInput: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "white",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    colorScheme: "dark",
  },
  label: {
    display: "block",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.8rem",
    fontWeight: 600,
    marginBottom: "6px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "20px",
    padding: "28px",
  },
  errorBox: {
    background: "rgba(248,113,113,0.1)",
    border: "1px solid rgba(248,113,113,0.2)",
    borderRadius: "10px",
    padding: "11px 14px",
    color: "#f87171",
    fontSize: "0.85rem",
    marginBottom: "20px",
  },
  cancelBtn: {
    flex: 1,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "12px",
    color: "rgba(255,255,255,0.6)",
    fontWeight: 600,
    fontSize: "0.9rem",
    cursor: "pointer",
  },
  spinner: {
    width: "13px",
    height: "13px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
};

const focusBorder = (e) => (e.target.style.borderColor = "rgba(74,222,128,0.4)");
const blurBorder = (e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)");

function EditLoan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ amount: "", date: "" });

  useEffect(() => { fetchLoan(); }, []);

  const fetchLoan = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/loans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData({ amount: data.amount, date: data.start_date });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateLoan = async () => {
    setError("");
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/loans/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(formData.amount),
          start_date: formData.date,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.detail?.[0]?.msg ?? "Error al actualizar");
        return;
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const submitBtnStyle = {
    flex: 2,
    background: loading ? "rgba(74,222,128,0.3)" : "linear-gradient(135deg, #4ade80, #22d3ee)",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    color: loading ? "rgba(255,255,255,0.5)" : "#052e16",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: loading ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  return (
    <DashboardLayout
      activePath="/dashboard"
      title="Editar Préstamo"
      subtitle="Modifica los datos del préstamo"
    >
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>

      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div style={S.card}>

          {error && <div style={S.errorBox}>{error}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            <div>
              <label style={S.label}>Monto</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                style={S.input}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            <div>
              <label style={S.label}>Fecha</label>
              <input
                type="date"
                name="date"
                value={formData.start_date}
                onChange={handleChange}
                style={S.dateInput}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button onClick={() => navigate("/dashboard")} style={S.cancelBtn}>
                Cancelar
              </button>
              <button onClick={updateLoan} disabled={loading} style={submitBtnStyle}>
                {loading ? (
                  <>
                    <span style={S.spinner} />
                    Actualizando...
                  </>
                ) : "Actualizar Préstamo"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditLoan;