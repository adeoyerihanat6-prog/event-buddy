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
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-xl font-bold">My Events & Bookings</h1>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex bg-[#17171C] p-1 rounded-2xl border border-white/10 mb-6">
        <button
          onClick={() => setTab("attending")}
          className={`flex-1 py-3 text-xs font-semibold rounded-xl transition ${
            tab === "attending" ? "bg-[#FF6B6B] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Attending
        </button>
        <button
          onClick={() => setTab("hosting")}
          className={`flex-1 py-3 text-xs font-semibold rounded-xl transition ${
            tab === "hosting" ? "bg-[#FF6B6B] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          Hosting
        </button>
      </div>

      {/* Content */}
      {myEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4 bg-[#17171C] border border-white/10 rounded-3xl">
          <Calendar size={48} className="text-gray-600 mb-4" />
          <h2 className="text-base font-bold mb-1">No events found</h2>
          <p className="text-xs text-gray-400 max-w-xs mb-6">
            {tab === "attending" 
              ? "You haven't joined any events yet. Explore events to find your crowd!" 
              : "You aren't hosting any events yet. Create one and invite event buddies!"}
          </p>
          <button
            onClick={() => navigate(tab === "attending" ? "/home" : "/create")}
            className="px-6 py-3 bg-[#FF6B6B] text-white font-semibold text-xs rounded-xl flex items-center gap-2 hover:opacity-90 transition"
          >
            <PlusCircle size={16} />
            {tab === "attending" ? "Explore Events" : "Host an Event"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
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

      {/* Persistent Bottom Nav with dynamic unread state */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default MyEvents;