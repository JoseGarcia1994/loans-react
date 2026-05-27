import { useEffect, useState } from "react";
import LoanCard from "../components/LoanCard";

function Dashboard() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
            Prestamos
        </h1>

        <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition"
        >
            Nuevo Prestamo
        </button>

       </div>

      <div className="grid gap-5">

        {loans.map((loan) => (
          <LoanCard
            key={loan.id}
            loan={loan}
            fetchLoans={fetchLoans}
          />
        ))}

      </div>

    </div>
  );
}

export default Dashboard;