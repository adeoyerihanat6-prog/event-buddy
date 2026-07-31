const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-14 rounded-2xl bg-[#FF6B6B] text-white font-semibold hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;