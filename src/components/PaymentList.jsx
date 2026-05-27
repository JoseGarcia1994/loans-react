function PaymentList({ payments }) {
  return (
    <div className="mt-4 border-t pt-3">

      <h3 className="font-semibold text-gray-700 mb-3">
        Pagos
      </h3>

      <div className="space-y-2">

        {payments.map((payment) => (
          <div
            key={payment.payment_id}
            className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm"
          >
            <span>
              Pago #{payment.payment_number}
            </span>

            <span>
              {payment.payment_date}
            </span>

            <span
              className={`font-semibold ${
                payment.paid
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {payment.paid ? "Paid" : "Pending"}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default PaymentList;