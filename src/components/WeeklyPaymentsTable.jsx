function WeeklyPaymentsTable({payments, markAsPaid}) {
  return (
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
  );
}

export default WeeklyPaymentsTable;
