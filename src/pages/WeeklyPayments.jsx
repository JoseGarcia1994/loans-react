import { useEffect, useState } from "react";

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
        }
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

  const totalWeekly = payments.reduce(
    (acc, payment) => acc + payment.payment_amount,
    0
  );

  if (loading) {
    return (
      <div className="p-8">
        <p>Cargando pagos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Cobranza Semanal
          </h1>

          <p className="text-gray-500 mt-1">
            {weekInfo.start} → {weekInfo.end}
          </p>
        </div>

        <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl shadow-sm">
          <p className="text-sm font-semibold">
            Total a cobrar
          </p>

          <p className="text-2xl font-bold">
            ${totalWeekly}
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setOffset(0)}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            offset === 0
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Semana Actual
        </button>

        <button
          onClick={() => setOffset(1)}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            offset === 1
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Próxima Semana
        </button>

      </div>

      {/* Payments List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="grid grid-cols-4 bg-gray-50 p-4 font-semibold text-gray-700 border-b">

          <span>Cliente</span>

          <span>Pago</span>

          <span>Fecha</span>

          <span>Cobro</span>

        </div>

        {payments.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay pagos pendientes esta semana
          </div>
        ) : (
          payments.map((payment) => (

            <div
              key={payment.payment_id}
              className="grid grid-cols-4 items-center p-4 border-b hover:bg-gray-50 transition"
            >

              <span className="font-medium text-gray-800">
                {payment.loan_name}
              </span>

              <span className="text-blue-600 font-semibold">
                Pago #{payment.payment_number}
              </span>

              <span className="text-gray-600">
                {payment.payment_date}
              </span>

              <span className="font-bold text-green-600">
                ${payment.payment_amount}
              </span>

            </div>

          ))
        )}

      </div>
    </div>
  );
}

export default WeeklyPayments;