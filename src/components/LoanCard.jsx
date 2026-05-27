import { useState } from "react";
import PaymentList from "./PaymentList";

function LoanCard({ loan }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-3 rounded-2xl shadow-md">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {loan.name}
          </h2>
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          ${loan.amount}
        </div>

      </div>

      <div className="mt-1 flex items-center flex-wrap gap-4 text-sm text-gray-700">

        <p>
          <span className="font-semibold">
            Fecha:
          </span>{" "}
          {loan.date}
        </p>

        <p>
          <span className="font-semibold">
            Pagos:
          </span>{" "}
          {loan.payments.length}
        </p>

        <p>
          <span className="font-semibold">
            Status:
          </span>{" "}
          Active
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="ml-auto text-gray-500 hover:text-gray-700 transition font-semibold"
        >
          {open ? "▲" : "▼"}
        </button>

      </div>

      {open && (
        <PaymentList payments={loan.payments} />
      )}

    </div>
  );
}

export default LoanCard;