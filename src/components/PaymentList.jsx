function PaymentList({ payments, loan }) {
  const sortedPayments = [...payments].sort(
    (a, b) => a.payment_number - b.payment_number,
  );

  const formatCurrency = (amount) =>
    amount.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  // Total a cobrar
  const totalDebt = sortedPayments.reduce(
    (sum, payment) => sum + payment.payment_amount,
    0,
  );

  // Total pagado
  const totalPaid = sortedPayments
    .filter((payment) => payment.paid)
    .reduce((sum, payment) => sum + payment.payment_amount, 0);

  // Restante
  const remaining = totalDebt - totalPaid;

  // Fecha actual
  // Fecha actual
  const today = new Date();

  // Convertir YYYY-MM-DD a fecha local
  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  // Obtener lunes de la semana actual
  const startOfWeek = new Date(today);
  const dayOfWeek = startOfWeek.getDay(); // 0=Domingo

  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  startOfWeek.setDate(startOfWeek.getDate() + daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Obtener domingo de la semana actual
  const endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Buscar pago que pertenece a la semana actual
  const currentWeekPayment = sortedPayments.find((payment) => {
    const paymentDate = parseDate(payment.payment_date);

    return paymentDate >= startOfWeek && paymentDate <= endOfWeek;
  });

  return (
    <div className="mt-4 border-t pt-3">
      {/* Resumen */}
      <div className="bg-gray-100 p-3 rounded-xl mb-4">
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-gray-700">Total a pagar:</span>
          <span>{formatCurrency(totalDebt)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-semibold text-green-700">Pagado:</span>
          <span>{formatCurrency(totalPaid)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="font-semibold text-red-700">Restante:</span>
          <span>{formatCurrency(remaining)}</span>
        </div>
      </div>

      <h3 className="font-semibold text-gray-700 mb-3">Pagos</h3>

      <div className="space-y-2">
        {sortedPayments.map((payment) => {
          const isCurrentWeek =
            currentWeekPayment?.payment_id === payment.payment_id;

          return (
            <div
              key={payment.payment_id}
              className={`flex justify-between items-center p-2 rounded-lg text-sm transition-all ${
                isCurrentWeek
                  ? "bg-blue-50 border border-blue-300 shadow-sm"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>Pago #{payment.payment_number}</span>
              </div>

              <span>{payment.payment_date}</span>

              <div className="flex items-center gap-3">
                <span
                  className={`font-semibold ${
                    payment.paid ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {payment.paid ? "Pagado" : "Pendiente"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentList;
