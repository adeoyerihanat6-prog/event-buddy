import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import EventCard from "../components/ui/EventCard";
import BottomNav from "../components/ui/BottomNav";

const MyEvents = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("attending"); // "attending" or "hosting"
  const [myEvents, setMyEvents] = useState([]);
  
  // Unread badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    // Load events from localStorage or user data
    const storedEvents = JSON.parse(localStorage.getItem("eventBuddy_saved")) || [];
    setMyEvents(storedEvents);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Sticky Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <BackButton />
        <h1 className="text-sm font-bold">My Events & Bookings</h1>
        <div className="w-9" />
      </div>

      {/* Independent Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-28 overscroll-contain">
        
        {/* Tabs */}
        <div className="flex bg-[#17171C] p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setTab("attending")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition active:scale-95 ${
              tab === "attending" ? "bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/20" : "text-gray-400 hover:text-white"
            }`}
          >
            Attending
          </button>
          <button
            onClick={() => setTab("hosting")}
            className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition active:scale-95 ${
              tab === "hosting" ? "bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/20" : "text-gray-400 hover:text-white"
            }`}
          >
            Hosting
          </button>
        </div>

        {/* Content */}
        {myEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-[#17171C] border border-white/10 rounded-3xl">
            <Calendar size={40} className="text-gray-600 mb-3" />
            <h2 className="text-sm font-bold mb-1">No events found</h2>
            <p className="text-xs text-gray-400 max-w-xs mb-5 leading-relaxed">
              {tab === "attending" 
                ? "You haven't joined any events yet. Explore events to find your crowd!" 
                : "You aren't hosting any events yet. Create one and invite event buddies!"}
            </p>
            <button
              onClick={() => navigate(tab === "attending" ? "/home" : "/create")}
              className="px-5 py-3 bg-[#FF6B6B] text-white font-semibold text-xs rounded-xl flex items-center gap-2 hover:opacity-90 transition active:scale-95 shadow-lg shadow-[#FF6B6B]/20"
            >
              <PlusCircle size={16} />
              {tab === "attending" ? "Explore Events" : "Host an Event"}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {myEvents.map((event, index) => (
              <EventCard
                key={index}
                image={event.image}
                title={event.title}
                location={event.location}
                date={event.date}
                attendees={event.attendees}
                rating={event.rating}
                onClick={() => navigate(`/event/${index + 1}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Persistent Bottom Nav with dynamic unread state */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default MyEvents;