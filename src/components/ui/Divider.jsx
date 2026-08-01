const Divider = ({ text = "OR" }) => {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-white/10"></div>

      <span className="text-sm text-gray-500">
        {text}
      </span>

      <div className="flex-1 h-px bg-white/10"></div>
    </div>
  );
};

export default Divider;