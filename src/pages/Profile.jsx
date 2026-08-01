import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Calendar, 
  LogOut, 
  Edit3, 
  ChevronRight, 
  Star,
  Bookmark
} from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import EventCard from "../components/ui/EventCard";
import BottomNav from "../components/ui/BottomNav";

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data state
  const [user, setUser] = useState({
    name: "Alex Johnson",
    age: 24,
    location: "Lagos, Nigeria",
    bio: "Music lover, weekend explorer, and looking for cool people to hit up concerts with! 🎸",
    vibe: "Introvert friendly 🌙",
    intent: "Just looking for company",
    rating: "4.9",
    eventsAttended: 14,
    eventsHosted: 3,
    isVerified: true,
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  });

  // Saved events state
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    // Load bookmarked events from localStorage
    const stored = JSON.parse(localStorage.getItem("eventBuddy_saved")) || [];
    setSavedEvents(stored);
  }, []);

  const handleLogout = () => {
    // TODO: Clear auth tokens / session
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-xl font-bold">My Profile</h1>
        <button 
          onClick={() => navigate("/settings")} 
          className="w-10 h-10 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* User Info Card */}
      <div className="flex flex-col items-center text-center bg-[#17171C] border border-white/10 p-6 rounded-3xl relative overflow-hidden">
        
        {/* Background Accent Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF6B6B]/10 rounded-full blur-2xl" />

        {/* Avatar */}
        <div className="relative mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#FF6B6B]"
          />
          {user.isVerified && (
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#0B0B0F]" title="Verified User">
              <ShieldCheck size={14} />
            </div>
          )}
        </div>

        {/* Name & Age */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black">{user.name}, {user.age}</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">{user.location}</p>

        {/* Bio */}
        <p className="text-sm text-gray-300 mt-4 leading-relaxed max-w-xs">
          {user.bio}
        </p>

        {/* Vibe Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <span className="text-xs font-medium bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20 px-3 py-1 rounded-full">
            {user.vibe}
          </span>
          <span className="text-xs font-medium bg-white/5 text-gray-300 border border-white/10 px-3 py-1 rounded-full">
            {user.intent}
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 w-full gap-2 mt-6 pt-6 border-t border-white/10 text-center">
          <div>
            <p className="text-lg font-bold text-white">{user.eventsAttended}</p>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Attended</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white">{user.eventsHosted}</p>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Hosted</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1">
              <Star size={14} className="text-[#FFD166] fill-[#FFD166]" />
              <p className="text-lg font-bold text-white">{user.rating}</p>
            </div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">Rating</p>
          </div>
        </div>
      </div>

      {/* Menu Navigation Options */}
      <div className="mt-8 space-y-3">
        
        <button 
          onClick={() => navigate("/edit-profile")}
          className="w-full bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
              <Edit3 size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Edit Profile & Vibe</p>
              <p className="text-xs text-gray-400 mt-0.5">Update your tags, bio, and preferences</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>

        <button 
          onClick={() => navigate("/my-events")}
          className="w-full bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">My Events & Bookings</p>
              <p className="text-xs text-gray-400 mt-0.5">View events you're going to or hosting</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>

        <button 
          onClick={() => navigate("/safety")}
          className="w-full bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">Safety & Verification</p>
              <p className="text-xs text-gray-400 mt-0.5">Phone verification, safety guidelines & reports</p>
            </div>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>

      </div>

      {/* Saved Events Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark size={18} className="text-[#FF6B6B]" />
          <h2 className="text-base font-bold">Saved Events ({savedEvents.length})</h2>
        </div>

        {savedEvents.length === 0 ? (
          <div className="p-5 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs">
            No saved events yet. Tap the bookmark icon on any event card to save it here!
          </div>
        ) : (
          <div className="space-y-4">
            {savedEvents.map((event, index) => (
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

      {/* Logout Button */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-500/20 transition"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
<BottomNav/>
    </motion.div>
  );
};

export default Profile;