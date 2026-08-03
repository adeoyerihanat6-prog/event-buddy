import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  MessageSquare, 
  Share2, 
  ShieldCheck 
} from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";

// Import your API services
import { fetchEventById, joinEventById } from "../services/api";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGoing, setIsGoing] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(0);

  // Fetch event details on load
  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const { data } = await fetchEventById(id);
        setEvent(data);
        
        // Check if currently logged-in user has already joined
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && data.attendees) {
          const alreadyJoined = data.attendees.includes(userInfo._id);
          setIsGoing(alreadyJoined);
        }
        
        setAttendeeCount(data.attendees ? data.attendees.length : 0);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [id]);

  // Handle joining/leaving via API
  const handleToggleGoing = async () => {
    try {
      const { data } = await joinEventById(id);
      setIsGoing(!isGoing);
      setAttendeeCount(data.event.attendees.length);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to update RSVP status");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex items-center justify-center">
        <p className="text-gray-400 text-xs">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col items-center justify-center px-6">
        <p className="text-gray-400 mb-4 text-xs">Event not found</p>
        <Button onClick={() => navigate("/home")} className="text-xs py-2.5">Back to Home</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Independent Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto pb-28 overscroll-contain">
        
        {/* Top Image & Absolute Navigation */}
        <div className="relative h-60 w-full shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-black/40" />

          <div className="absolute top-4 left-4 z-10">
            <BackButton />
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="w-9 h-9 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition active:scale-95">
              <Share2 size={16} />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-3 left-6 z-10">
            <span className="bg-[#FF6B6B] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-lg">
              {event.category || "General"}
            </span>
          </div>
        </div>

        {/* Main Content Info */}
        <div className="px-6 pt-5 space-y-5">
          
          {/* Title and Rating */}
          <div>
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-lg font-bold text-white">{event.title}</h1>
              <div className="flex items-center gap-1 bg-[#17171C] border border-white/10 px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0">
                <Star size={14} className="text-[#FFD166] fill-[#FFD166]" />
                <span>{event.rating || "4.9"}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Hosted by {event.creator?.name || "Event Creator"} • Verified Host ✓
            </p>
          </div>

          {/* Date, Time & Location Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Date</p>
                <p className="text-xs font-semibold mt-0.5">{event.date}</p>
              </div>
            </div>

            <div className="bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#FFD166]/10 text-[#FFD166] shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400">Time</p>
                <p className="text-xs font-semibold mt-0.5">6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Location Row */}
          <div className="bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 truncate">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <MapPin size={18} />
              </div>
              <div className="truncate">
                <p className="text-[10px] text-gray-400">Location</p>
                <p className="text-xs font-semibold mt-0.5 truncate">{event.location}</p>
              </div>
            </div>
            <button className="text-[11px] text-[#FF6B6B] font-semibold hover:underline shrink-0 ml-2">
              View Map
            </button>
          </div>

          {/* Vibe Tag / Looking For */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20 flex items-center gap-3">
            <ShieldCheck size={18} className="text-[#FF6B6B] shrink-0" />
            <p className="text-[11px] text-gray-300">
              <span className="font-semibold text-white">Group Vibe:</span> Introvert friendly 🌙 • Just looking for company
            </p>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">About Event</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Attendees Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">Attendees ({attendeeCount})</h2>
              <button className="text-[11px] text-gray-400 hover:text-white">See all</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="User" />
                <img className="w-8 h-8 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="User" />
              </div>
              <p className="text-[11px] text-gray-400">+{Math.max(0, attendeeCount - 3)} others are going</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#17171C]/95 backdrop-blur-md border-t border-white/10 px-6 py-3.5 flex items-center gap-3 z-50 shrink-0">
        <Button
          onClick={() => navigate("/chat")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs rounded-xl ${
            isGoing ? "bg-[#0B0B0F] text-white border border-white/20 hover:bg-white/10" : "bg-[#17171C] text-white border border-white/10"
          }`}
        >
          <MessageSquare size={16} />
          {isGoing ? "Open Chat" : "Join Group Chat"}
        </Button>

        <button
          onClick={handleToggleGoing}
          className={`px-5 py-3 rounded-xl font-semibold text-xs transition-all shadow-lg active:scale-[0.98] ${
            isGoing
              ? "bg-emerald-500 text-white shadow-emerald-500/20"
              : "bg-[#FF6B6B] text-white shadow-[#FF6B6B]/20 hover:bg-[#ff5252]"
          }`}
        >
          {isGoing ? "✓ Going" : "I'm Going"}
        </button>
      </div>
    </motion.div>
  );
};

export default EventDetails;