const Avatar = ({ src, alt = "User avatar", size = "md", className = "" }) => {
  // Size mapping dictionary
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 border border-white/10 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <img
        src={src || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;