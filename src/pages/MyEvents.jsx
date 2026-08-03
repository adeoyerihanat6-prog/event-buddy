import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, PlusCircle } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";
import EventCard from "../components/ui/EventCard";

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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center justify-between w-full">
          <BackButton />
          <h1 className="text-sm font-bold">My Events & Bookings</h1>
          <div className="w-8" /> {/* Spacer to center title */}
        </div>
      }
    >
      <div className="space-y-5">
        {/* Tabs */}
        <div className="flex bg-[#17171C] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setTab("attending")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition active:scale-95 ${
              tab === "attending" ? "bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/20" : "text-gray-400 hover:text-white"
            }`}
          >
            Attending
          </button>
          <button
            onClick={() => setTab("hosting")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition active:scale-95 ${
              tab === "hosting" ? "bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/20" : "text-gray-400 hover:text-white"
            }`}
          >
            Hosting
          </button>
        </div>

        {/* Content */}
        {myEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-14 px-4 bg-[#17171C] border border-white/10 rounded-2xl">
            <Calendar size={36} className="text-gray-600 mb-2.5" />
            <h2 className="text-xs font-bold mb-1 text-white uppercase tracking-wider">No events found</h2>
            <p className="text-[11px] text-gray-400 max-w-xs mb-4 leading-relaxed">
              {tab === "attending" 
                ? "You haven't joined any events yet. Explore events to find your crowd!" 
                : "You aren't hosting any events yet. Create one and invite event buddies!"}
            </p>
            <button
              onClick={() => navigate(tab === "attending" ? "/home" : "/create")}
              className="px-4 py-2.5 bg-[#FF6B6B] text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 hover:opacity-90 transition active:scale-95 shadow-md shadow-[#FF6B6B]/20"
            >
              <PlusCircle size={15} />
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
    </AppLayout>
  );
};

export default MyEvents;