function WeeklyPaymentCard({payment, markAsPaid}) {
  return (
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
  );
}

export default WeeklyPaymentCard;