import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoanCard from "../components/LoanCard";
import Layout from "../components/Layout";

function Dashboard() {
  const [loans, setLoans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLoans();
    fetchStats();
  }, []);

  const fetchLoans = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/loans", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setLoans(data);
  };

  // Delete Loan
  const deleteLoan = async (loanId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/loans/${loanId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting loan");
      }

      fetchLoans();
    } catch (error) {
      console.error(error);
    }
  };

  // Edit Loan
  const editLoan = (loan) => {
    navigate(`/edit-loan/${loan.id}`);
  };

  const fetchStats = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/loans/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setStats(data);
  };

  const totalLoans = loans.length;

  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);

  const totalPayments = loans.reduce(
    (sum, loan) => sum + loan.payments.length,
    0,
  );

  const paidPayments = loans.reduce(
    (sum, loan) => sum + loan.payments.filter((payment) => payment.paid).length,
    0,
  );

  return (
    <Layout>
      {showSuccess && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg animate-fadeIn z-50">
          Préstamo eliminado correctamente
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Préstamos</h1>

          <p className="text-gray-500">
            Gestiona y monitorea tu cartera de clientes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/weekly-payments")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Cobranza Semanal
          </button>

          <button
            onClick={() => navigate("/create-loan")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Nuevo Prestamo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Préstamos activos</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.active_loans || 0}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Capital activo</p>
          <h3 className="text-3xl font-bold text-blue-600 mt-2">
            ${stats?.total_lent || 0}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Pagos pendientes</p>
          <h3 className="text-3xl font-bold text-orange-500 mt-2">
            {stats?.pending_payments || 0}
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <p className="text-sm text-gray-500">Monto pendiente</p>
          <h3 className="text-3xl font-bold text-red-500 mt-2">
            ${stats?.pending_amount || 0}
          </h3>
        </div>
      </div>

      <div className="grid gap-5">
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
    </Layout>
  );
}

export default Dashboard;
