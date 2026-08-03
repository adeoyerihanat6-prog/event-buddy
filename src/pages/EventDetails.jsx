import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
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
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center px-6">
        <p className="text-gray-400 mb-4">Event not found</p>
        <Button onClick={() => navigate("/home")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0B0B0F] text-white pb-32"
    >
      {/* Top Image & Absolute Navigation */}
      <div className="relative h-72 w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-black/40" />

        <div className="absolute top-6 left-6 z-10">
          <BackButton />
        </div>

        <div className="absolute top-6 right-6 z-10 flex gap-3">
          <button className="w-10 h-10 rounded-full bg-black/40 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition">
            <Share2 size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-6 z-10">
          <span className="bg-[#FF6B6B] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            {event.category || "General"}
          </span>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="px-6 pt-6 space-y-6">
        
        {/* Title and Rating */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-white">{event.title}</h1>
            <div className="flex items-center gap-1 bg-[#17171C] border border-white/10 px-2.5 py-1 rounded-xl text-sm font-semibold">
              <Star size={16} className="text-[#FFD166] fill-[#FFD166]" />
              <span>{event.rating || "4.9"}</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Hosted by {event.creator?.name || "Event Creator"} • Verified Host ✓
          </p>
        </div>

        {/* Date, Time & Location Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Date</p>
              <p className="text-sm font-semibold mt-0.5">{event.date}</p>
            </div>
          </div>

          <div className="bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFD166]/10 text-[#FFD166]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Time</p>
              <p className="text-sm font-semibold mt-0.5">6:00 PM</p>
            </div>
          </div>
        </div>

        {/* Location Row */}
        <div className="bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm font-semibold mt-0.5">{event.location}</p>
            </div>
          </div>
          <button className="text-xs text-[#FF6B6B] font-semibold hover:underline">
            View Map
          </button>
        </div>

        {/* Vibe Tag / Looking For */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B]/10 to-transparent border border-[#FF6B6B]/20 flex items-center gap-3">
          <ShieldCheck size={22} className="text-[#FF6B6B] shrink-0" />
          <p className="text-xs text-gray-300">
            <span className="font-semibold text-white">Group Vibe:</span> Introvert friendly 🌙 • Just looking for company
          </p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-bold mb-2">About Event</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Attendees Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Attendees ({attendeeCount})</h2>
            <button className="text-xs text-gray-400 hover:text-white">See all</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#0B0B0F] object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="User" />
            </div>
            <p className="text-xs text-gray-400">+{Math.max(0, attendeeCount - 3)} others are going</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0B0B0F]/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex items-center gap-4 z-50">
        <Button
          onClick={() => navigate("/chat")}
          className={`flex-1 flex items-center justify-center gap-2 ${
            isGoing ? "bg-[#17171C] text-white border border-white/20 hover:bg-white/10" : ""
          }`}
        >
          <MessageSquare size={18} />
          {isGoing ? "Open Event Chat" : "Join Group Chat"}
        </Button>

        <button
          onClick={handleToggleGoing}
          className={`px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-lg ${
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