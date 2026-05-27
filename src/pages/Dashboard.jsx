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

      <h1 className="text-3xl font-bold mb-6">
        Prestamos
      </h1>

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