import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { StatsCards } from "../components/dashboard/StatsCards";
import { LoanCard } from "../components/dashboard/LoanCard";

const decodeJwtName = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "";
    const payload = JSON.parse(atob(token.split(".")[1]));
    // Intenta los campos más comunes según el backend
    return (
      payload.first_name ||
      payload.name ||
      payload.full_name ||
      payload.username ||
      payload.sub ||
      ""
    );
  } catch {
    return "";
  }
};

export default function DashboardPage() {
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName] = useState(() => decodeJwtName());

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchLoans(), fetchStats()]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchLoans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/loans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setLoans(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/loans/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLoan = async (loanId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://127.0.0.1:8000/loans/${loanId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Error al eliminar préstamo");
    fetchLoans();
    fetchStats();
  };

  const navigate = useNavigate();

  const editLoan = (loan) => {
    navigate(`/edit-loan/${loan.id}`);
  };

  return (
    <DashboardLayout
      activePath="/dashboard"
      title="Préstamos"
      subtitle="Gestiona y monitorea tu cartera de clientes"
      userName={userName}
    >
      {/* Toast */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(74,222,128,0.12)",
            border: "1px solid rgba(74,222,128,0.3)",
            backdropFilter: "blur(12px)",
            color: "#4ade80",
            padding: "12px 20px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            fontSize: "0.88rem",
            fontWeight: 600,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ✓ Préstamo eliminado correctamente
        </div>
      )}

      {/* Botón cobranza semanal */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "24px",
        }}
      >
        <Link
          to="/weekly-payments"
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
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <rect
              x="1.5"
              y="3"
              width="15"
              height="13.5"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M5.25 1.5v3M12.75 1.5v3M1.5 7.5h15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Cobranza Semanal
        </Link>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Loans List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: "100px",
                background: "#f1f5f9",
                borderRadius: "16px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : loans.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.2)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "1.5rem",
            }}
          >
            📋
          </div>
          <h3
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: "8px",
            }}
          >
            Sin préstamos aún
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.88rem",
              marginBottom: "20px",
            }}
          >
            Crea tu primer préstamo para empezar a controlar tu cartera.
          </p>
          <Link
            to="/create-loan"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "linear-gradient(135deg, #4ade80, #22d3ee)",
              color: "#052e16",
              padding: "10px 20px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "0.88rem",
              textDecoration: "none",
            }}
          >
            + Nuevo préstamo
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loans.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              fetchLoans={fetchLoans}
              deleteLoan={deleteLoan}
              editLoan={editLoan}
              setShowSuccess={setShowSuccess}
            />
          ))}
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </DashboardLayout>
  );
}
