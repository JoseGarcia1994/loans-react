function Input({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
}

export default Input;