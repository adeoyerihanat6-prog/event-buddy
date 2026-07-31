const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full h-14 px-4 rounded-2xl bg-[#1A1A1A] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6B6B] transition ${className}`}
    />
  );
};

export default Input;