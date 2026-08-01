const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-[#FF6B6B] text-white hover:bg-[#ff5b5b]",
    gold: "bg-[#FFD166] text-black hover:bg-[#ffc933]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full h-14 rounded-2xl font-semibold transition-all duration-300 active:scale-95 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;