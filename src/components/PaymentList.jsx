function PaymentList({ payments, fetchLoans }) {

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
        }
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

      <h3 className="font-semibold text-gray-700 mb-3">
        Pagos
      </h3>

      <div className="space-y-2">

        {[...payments]
            .sort((a, b) => a.payment_number - b.payment_number)
            .map((payment) => (
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

            <div className="flex items-center gap-3">

              <span
                className={`font-semibold ${
                  payment.paid
                    ? "text-green-600"
                    : "text-red-500"
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