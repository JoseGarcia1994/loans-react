import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function WeeklyPayments() {
  const [payments, setPayments] = useState([]);
  const [weekInfo, setWeekInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const [offset, setOffset] = useState(0);

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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cobranza Semanal</h1>

          <p className="text-gray-500 mt-1">
            {weekInfo.start} → {weekInfo.end}
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold">Total a cobrar</p>

          <p className="text-2xl font-bold">${totalWeekly}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={() => setOffset(0)}
          className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition ${
            offset === 0 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Semana Actual
        </button>

        <button
          onClick={() => setOffset(1)}
          className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition ${
            offset === 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
          }`}
        >
          Próxima Semana
        </button>
      </div>

      {/* Payments List */}
      <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] bg-gray-50 p-4 font-semibold text-gray-700 border-b">
          <span>Cliente</span>
          <span>Pago</span>
          <span>Fecha</span>
          <span>Cobro</span>
          <span>Estado</span>
          <span>Acción</span>
        </div>

        {payments.map((payment) => (
          <div
            key={payment.payment_id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center p-4 border-b hover:bg-gray-50 transition"
          >
            <span className="font-medium">{payment.loan_name}</span>

            <span className="text-blue-600 font-semibold">
              Pago #{payment.payment_number}
            </span>

            <span>{payment.payment_date}</span>

            <span className="font-bold text-green-600">
              ${payment.payment_amount}
            </span>

            <span
              className={`font-semibold ${
                payment.paid ? "text-green-600" : "text-orange-500"
              }`}
            >
              {payment.paid ? "Pagado" : "Pendiente"}
            </span>

            {payment.paid ? (
              <span
                className="
                inline-block
                bg-green-100
                text-green-700
                px-3
                py-2
                rounded-lg
                text-xs
                font-semibold
              "
              >
                Pagado
              </span>
            ) : (
              <button
                onClick={() => markAsPaid(payment.payment_id)}
                className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-3
                py-2
                rounded-lg
                text-xs
                font-semibold
              "
              >
                Pagar
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payment list / Mobile View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.payment_id}
            className="bg-white rounded-2xl shadow-md p-4"
          >
            <div className="mb-3">
              <h3 className="font-bold text-gray-800">{payment.loan_name}</h3>

              <p className="text-blue-600 font-semibold">
                Pago #{payment.payment_number}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Fecha</span>

                <span>{payment.payment_date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Cobro</span>

                <span className="font-bold text-green-600">
                  ${payment.payment_amount}
                </span>
              </div>
            </div>

            {payment.paid ? (
              <div
                className="
                mt-4
                w-full
                bg-green-100
                text-green-700
                py-3
                rounded-xl
                text-center
                font-semibold
              "
              >
                Pagado
              </div>
            ) : (
              <button
                onClick={() => markAsPaid(payment.payment_id)}
                className="
                mt-4
                w-full
                bg-green-500
                hover:bg-green-600
                text-white
                py-3
                rounded-xl
                font-semibold
              "
              >
                Cobrar
              </button>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default WeeklyPayments;
