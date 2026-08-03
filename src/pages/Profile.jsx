import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Settings, 
  ShieldCheck, 
  Calendar, 
  LogOut, 
  Edit3, 
  ChevronRight, 
  Star,
  Bookmark,
  User as UserIcon
} from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import EventCard from "../components/ui/EventCard";
import BottomNav from "../components/ui/BottomNav";

// Import your user API services
import { fetchUserProfile } from "../services/api";

const Profile = () => {
  const navigate = useNavigate();

  // User state initialized empty so it doesn't show hardcoded placeholder text
  const [user, setUser] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    vibe: "",
    intent: "",
    rating: "",
    eventsAttended: 0,
    eventsHosted: 0,
    isVerified: false,
    avatar: ""
  });

  const [loading, setLoading] = useState(true);

  // Saved events state
  const [savedEvents, setSavedEvents] = useState([]);
  
  // Dynamic unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    // Fetch real logged-in user profile from backend
    const getUserData = async () => {
      try {
        const { data } = await fetchUserProfile();
        setUser({
          name: data.name || "",
          age: data.age || "",
          location: data.location || "",
          bio: data.bio || "",
          vibe: data.vibe || "",
          intent: data.intent || "",
          rating: data.rating || "",
          eventsAttended: data.eventsAttended || 0,
          eventsHosted: data.eventsHosted || 0,
          isVerified: data.isVerified || false,
          avatar: data.avatar || ""
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();

    // Load bookmarked events from localStorage
    const stored = JSON.parse(localStorage.getItem("eventBuddy_saved")) || [];
    setSavedEvents(stored);
  }, []);

  const handleLogout = () => {
    // Clear user session from browser storage
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex items-center justify-center">
        <p className="text-gray-400 text-xs">Loading your profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Sticky Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <BackButton />
        <h1 className="text-sm font-bold">My Profile</h1>
        <button 
          onClick={() => navigate("/settings")} 
          className="w-9 h-9 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition active:scale-95"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Independent Scrollable Feed Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-28 overscroll-contain">
        {/* User Info Card */}
        <div className="flex flex-col items-center text-center bg-[#17171C] border border-white/10 p-6 rounded-3xl relative overflow-hidden">
          
          {/* Background Accent Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FF6B6B]/10 rounded-full blur-2xl" />

          {/* Avatar */}
          <div className="relative mb-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#FF6B6B]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-800 border-2 border-[#FF6B6B] flex items-center justify-center">
                <UserIcon size={30} className="text-gray-400" />
              </div>
            )}
            {user.isVerified && (
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-[#0B0B0F]" title="Verified User">
                <ShieldCheck size={12} />
              </div>
            )}
          </div>

          {/* Name & Age */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">
              {user.name ? `${user.name}${user.age ? `, ${user.age}` : ""}` : "Complete Your Profile"}
            </h2>
          </div>
          {user.location && <p className="text-xs text-gray-400 mt-0.5">{user.location}</p>}

          {/* Bio - Displays only if user has added one */}
          {user.bio ? (
            <p className="text-xs text-gray-300 mt-3 leading-relaxed max-w-xs">
              {user.bio}
            </p>
          ) : (
            <button 
              onClick={() => navigate("/edit-profile")}
              className="text-xs text-[#FF6B6B] mt-2 underline hover:opacity-80 transition"
            >
              + Add a bio to tell people about yourself
            </button>
          )}

          {/* Vibe Tags - Render only if they exist */}
          {(user.vibe || user.intent) && (
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {user.vibe && (
                <span className="text-[10px] font-medium bg-[#FF6B6B]/10 text-[#FF6B6B] border border-[#FF6B6B]/20 px-2.5 py-1 rounded-full">
                  {user.vibe}
                </span>
              )}
              {user.intent && (
                <span className="text-[10px] font-medium bg-white/5 text-gray-300 border border-white/10 px-2.5 py-1 rounded-full">
                  {user.intent}
                </span>
              )}
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-3 w-full gap-2 mt-5 pt-5 border-t border-white/10 text-center">
            <div>
              <p className="text-base font-bold text-white">{user.eventsAttended}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Attended</p>
            </div>
            <div>
              <p className="text-base font-bold text-white">{user.eventsHosted}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Hosted</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Star size={12} className="text-[#FFD166] fill-[#FFD166]" />
                <p className="text-base font-bold text-white">{user.rating || "0.0"}</p>
              </div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Rating</p>
            </div>
          </div>
        </div>

        {/* Menu Navigation Options */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate("/edit-profile")}
            className="w-full bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] shrink-0">
                <Edit3 size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold">Edit Profile & Vibe</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Update your tags, bio, and preferences</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <button 
            onClick={() => navigate("/my-events")}
            className="w-full bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold">My Events & Bookings</p>
                <p className="text-[10px] text-gray-400 mt-0.5">View events you're going to or hosting</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>

          <button 
            onClick={() => navigate("/safety")}
            className="w-full bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center justify-between text-left hover:border-white/20 transition active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold">Safety & Verification</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Phone verification, safety guidelines & reports</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Saved Events Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bookmark size={16} className="text-[#FF6B6B]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">Saved Events ({savedEvents.length})</h2>
          </div>

          {savedEvents.length === 0 ? (
            <div className="p-4 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs">
              No saved events yet. Tap the bookmark icon on any event card to save it here!
            </div>
          ) : (
            <div className="space-y-3">
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
        <div>
          <button
            onClick={handleLogout}
            className="w-full py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-red-500/20 transition active:scale-[0.98]"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Dynamic Bottom Nav */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Profile;