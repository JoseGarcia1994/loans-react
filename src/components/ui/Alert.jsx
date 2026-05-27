function Alert({ type = "error", message }) {
  const styles = {
    error: "bg-red-100 border-red-300 text-red-700",
    success: "bg-green-100 border-green-300 text-green-700",
  };

  return (
    <div
      className={`mb-4 border px-4 py-3 rounded-xl ${styles[type]}`}
    >
      {message}
    </div>
  );
}

export default Alert;