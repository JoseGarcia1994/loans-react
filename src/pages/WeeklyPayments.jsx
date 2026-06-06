import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import WeeklyHeader from "../components/WeeklyHeader";
import WeekSelector from "../components/WeekSelector";
import WeeklyPaymentCard from "../components/WeeklyPaymentCard";
import WeeklyPaymentsTable from "../components/WeeklyPaymentsTable";

function WeeklyPayments() {
  const [payments, setPayments] = useState([]);
  const [weekInfo, setWeekInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const [offset, setOffset] = useState(0);

  const MIN_OFFSET = -10; // up to 10 weeks behind
  const MAX_OFFSET = 1; // up to next week

  const goPrevWeek = () => {
    if (offset > MIN_OFFSET) {
      setOffset(offset - 1);
    }
  };

  const goNextWeek = () => {
    if (offset < MAX_OFFSET) {
      setOffset(offset + 1);
    }
  };

  const goToCurrentWeek = () => {
    setOffset(0);
  };

  useEffect(() => {
    fetchWeeklyPayments(offset);
  }, [offset]);

  const fetchWeeklyPayments = async (weekOffset) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/payments/week?offset=${weekOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error fetching weekly payments");
      }

      const data = await response.json();

      setPayments(data.payments);

      setWeekInfo({
        start: data.week_start,
        end: data.week_end,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Pay payments
  const markAsPaid = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/payments/${paymentId}/pay`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Error updating payment");
      }

      fetchWeeklyPayments(offset);
    } catch (error) {
      console.error(error);
    }
  };

  const totalWeekly = payments.reduce(
    (acc, payment) => acc + payment.payment_amount,
    0,
  );

  if (loading) {
    return (
      <div className="p-8">
        <p>Cargando pagos...</p>
      </div>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <WeeklyHeader weekInfo={weekInfo} totalWeekly={totalWeekly} />

      {/* Week Selector */}
      <WeekSelector
        offset={offset}
        goPrevWeek={goPrevWeek}
        goNextWeek={goNextWeek}
        goToCurrentWeek={goToCurrentWeek}
      />

      {/* Payments List */}
      <WeeklyPaymentsTable payments={payments} markAsPaid={markAsPaid} />

      {/* Payment list / Mobile View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment) => (
          <WeeklyPaymentCard
            key={payment.payment_id}
            payment={payment}
            markAsPaid={markAsPaid}
          />
        ))}
      </div>
    </Layout>
  );
}

export default WeeklyPayments;
