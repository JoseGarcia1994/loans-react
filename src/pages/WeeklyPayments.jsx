import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { WeeklyHeader } from "../components/weeklyPayments/WeeklyHeader";
import { WeekSelector } from "../components/weeklyPayments/WeekSelector";
import { WeeklyPaymentsTable } from "../components/weeklyPayments/WeeklyPaymentsTable";
import { WeeklyPaymentCard } from "../components/weeklyPayments/WeeklyPaymentCard";

const MIN_OFFSET = -18;
const MAX_OFFSET = 1;

export default function WeeklyPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [weekInfo, setWeekInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const goPrevWeek = () => {
    if (offset > MIN_OFFSET) setOffset(offset - 1);
  };
  const goNextWeek = () => {
    if (offset < MAX_OFFSET) setOffset(offset + 1);
  };
  const goToCurrentWeek = () => setOffset(0);

  useEffect(() => {
    fetchWeeklyPayments(offset);
  }, [offset]);

  const fetchWeeklyPayments = async (weekOffset) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/payments/week?offset=${weekOffset}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Error fetching weekly payments");
      const data = await response.json();
      setPayments(data.payments);
      setWeekInfo({ start: data.week_start, end: data.week_end });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://127.0.0.1:8000/payments/${paymentId}/pay`,
        { method: "PATCH", headers: { Authorization: `Bearer ${token}` } },
      );
      if (!response.ok) throw new Error("Error updating payment");
      fetchWeeklyPayments(offset);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout
      activePath="/weekly-payments"
      title="Cobranza Semanal"
      subtitle="Pagos programados para esta semana"
    >
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        .weekly-table { display: block; }
        .weekly-cards { display: none; }
        @media (max-width: 767px) {
          .weekly-table { display: none; }
          .weekly-cards { display: flex; flex-direction: column; gap: 10px; }
        }
      `}</style>

      {loading ? (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: "76px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "14px",
                  animation: "pulse 1.5s ease-in-out infinite",
                }}
              />
            ))}
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                height: "56px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "12px",
                marginBottom: "8px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <WeeklyHeader weekInfo={weekInfo} payments={payments} />

          <WeekSelector
            offset={offset}
            weekInfo={weekInfo}
            goPrevWeek={goPrevWeek}
            goNextWeek={goNextWeek}
            goToCurrentWeek={goToCurrentWeek}
            MIN_OFFSET={MIN_OFFSET}
            MAX_OFFSET={MAX_OFFSET}
          />

          {payments.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>📅</div>
              <h3
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: "8px",
                }}
              >
                Sin pagos esta semana
              </h3>
              <p
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}
              >
                No hay pagos programados para el período seleccionado.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop — tabla */}
              <div className="weekly-table">
                <WeeklyPaymentsTable
                  payments={payments}
                  markAsPaid={markAsPaid}
                />
              </div>

              {/* Mobile — cards */}
              <div className="weekly-cards">
                {payments.map((payment) => (
                  <WeeklyPaymentCard
                    key={payment.payment_id}
                    payment={payment}
                    markAsPaid={markAsPaid}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
