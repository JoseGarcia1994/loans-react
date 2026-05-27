function PaymentList({ payments, fetchLoans, loan }) {
  const paymentAmount = loan.amount / 10; // si usas 10 pagos (ajústalo si cambia)

  const totalDebt = paymentAmount * loan.payments.length;

  const totalPaid = loan.payments.filter((p) => p.paid).length * paymentAmount;

  const remaining = totalDebt - totalPaid;

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

      // refrescar loans
      fetchLoans();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 border-t pt-3">
      <div className="bg-gray-100 p-3 rounded-xl mb-4">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-gray-700">Total a pagar:</span>
          <span>${totalDebt}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-semibold text-green-700">Pagado:</span>
          <span>${totalPaid}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-semibold text-red-700">Restante:</span>
          <span>${remaining}</span>
        </div>
      </div>
      <h3 className="font-semibold text-gray-700 mb-3">Pagos</h3>

      <div className="space-y-2">
        {[...payments]
          .sort((a, b) => a.payment_number - b.payment_number)
          .map((payment) => (
            <div
              key={payment.payment_id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm"
            >
              <span>Pago #{payment.payment_number}</span>

              <span>{payment.payment_date}</span>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    payment.paid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {payment.paid ? "Paid" : "Pending"}
                </span>

                {!payment.paid && (
                  <button
                    onClick={() => markAsPaid(payment.payment_id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                  >
                    Pay
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PaymentList;
