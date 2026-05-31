function WeekSelector({ offset, setOffset }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={() => setOffset(0)}
        className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition ${
          offset === 0
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Semana Actual
      </button>

      <button
        onClick={() => setOffset(1)}
        className={`w-full sm:w-auto px-5 py-2 rounded-xl font-semibold transition ${
          offset === 1
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Próxima Semana
      </button>
    </div>
  );
}

export default WeekSelector;