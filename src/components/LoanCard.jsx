import { useState } from "react";
import PaymentList from "./PaymentList";

function LoanCard({ loan, fetchLoans, deleteLoan, editLoan }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-3 rounded-2xl shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{loan.name}</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
            ${loan.amount}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => editLoan(loan)}
            className="text-blue-500 hover:text-blue-700 transition"
            title="Editar préstamo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
          </button>

          {/* Eliminate Button */}
          <button
            onClick={() => deleteLoan(loan.id)}
            className="text-red-500 hover:text-red-700 transition text-lg"
          >
            🗑
          </button>
        </div>
      </div>

      <div className="mt-1 flex items-center flex-wrap gap-4 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Fecha:</span> {loan.date}
        </p>

        <p>
          <span className="font-semibold">Pago:</span> ${loan.amount / 10}
        </p>

        <p>
          <span className="font-semibold">Status:</span> Active
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto text-gray-500 hover:text-gray-700 transition font-semibold"
        >
          {open ? "▲" : "▼"}
        </button>
      </div>

      {open && <PaymentList payments={loan.payments} fetchLoans={fetchLoans} loan={loan} />}
    </div>
  );
}

export default LoanCard;
