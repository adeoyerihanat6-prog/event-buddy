const SocialButton = ({ icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
    >
      {icon}

      <span className="font-medium text-white">
        {children}
      </span>
    </button>
  );
};

export default SocialButton;