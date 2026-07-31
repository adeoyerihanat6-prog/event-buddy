const Card = ({
  title,
  location,
  date,
  attendees,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h2 className="text-white text-xl font-bold">{title}</h2>

        <p className="text-gray-400 mt-2">📍 {location}</p>

        <p className="text-gray-400">📅 {date}</p>

        <p className="text-[#FF6B6B] font-semibold mt-4">
          👥 {attendees} attending
        </p>
      </div>
    </div>
  );
};

export default Card;