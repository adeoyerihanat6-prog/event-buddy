import { Bookmark } from "lucide-react";
import { useState } from "react";

const EventCard = ({ image, title, location, date, attendees, rating, onClick }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevents clicking the bookmark from opening the event details page
    setIsSaved(!isSaved);

    // Optional: Save to localStorage so Profile can read it later
    const savedEvents = JSON.parse(localStorage.getItem("eventBuddy_saved")) || [];
    const eventData = { title, location, date, image, attendees, rating };

    if (!isSaved) {
      localStorage.setItem("eventBuddy_saved", JSON.stringify([...savedEvents, eventData]));
    } else {
      const filtered = savedEvents.filter((item) => item.title !== title);
      localStorage.setItem("eventBuddy_saved", JSON.stringify(filtered));
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-[#17171C] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-white/20 transition group"
    >
      {/* Image & Bookmark Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmarkClick}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition ${
            isSaved ? "bg-[#FF6B6B] text-white" : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          <Bookmark size={18} fill={isSaved ? "white" : "none"} />
        </button>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs text-gray-400 mt-1">{location} • {date}</p>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <span className="text-xs text-gray-400">{attendees} Going</span>
          <span className="text-xs font-semibold text-[#FFD166]">⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;