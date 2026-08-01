const CategoryChip = ({
  icon,
  title,
  active = false,
}) => {
  return (
    <button
      className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
        active
          ? "bg-[#FF6B6B] text-white"
          : "bg-[#17171C] text-gray-300"
      }`}
    >
      {icon}

      {title}
    </button>
  );
};

export default CategoryChip;