function WeekSelector({ offset, goPrevWeek, goNextWeek, goToCurrentWeek }) {
  return (
    <div className="bg-white border shadow-sm rounded-xl px-4 py-2 text-sm w-full max-w-xs mx-auto mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goPrevWeek}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ←
          </button>

          <div className="flex flex-col items-center leading-tight">
            <p className="font-semibold text-gray-700 text-xs text-center">
              {offset === 0
                ? "Semana actual"
                : `${offset < 0 ? "Hace" : "En"} ${Math.abs(offset)} sem`}
            </p>

            <button
              onClick={goToCurrentWeek}
              className="text-[10px] text-blue-600 hover:underline"
            >
              hoy
            </button>
          </div>

          <button
            onClick={goNextWeek}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            →
          </button>
        </div>
      </div>
  );
}

export default WeekSelector;