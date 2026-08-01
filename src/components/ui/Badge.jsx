const Badge = ({ children, variant = "default", className = "" }) => {
  // Variant styles matching your app color palette
  const variantClasses = {
    default: "bg-[#17171C] text-gray-300 border-white/10",
    primary: "bg-[#FF6B6B] text-white border-transparent shadow-md shadow-[#FF6B6B]/20",
    accent: "bg-[#FF6B6B]/10 text-[#FF6B6B] border-[#FF6B6B]/30",
    warning: "bg-[#FFD166]/10 text-[#FFD166] border-[#FFD166]/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
        variantClasses[variant] || variantClasses.default
      } ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;