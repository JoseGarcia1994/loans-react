function WeeklyHeader({ weekInfo, totalWeekly }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Cobranza Semanal
        </h1>

        <p className="text-gray-500 mt-1">
          {weekInfo.start} → {weekInfo.end}
        </p>
      </div>

      <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl shadow-sm">
        <p className="text-sm font-semibold">
          Total a cobrar
        </p>

        <p className="text-2xl font-bold">
          ${totalWeekly}
        </p>
      </div>
    </div>
  );
}

export default WeeklyHeader;