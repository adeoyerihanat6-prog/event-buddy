import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CircleUserRound, Flame, Plus, Music2, Trophy, PartyPopper, Tent, Coffee, Gamepad2, Search } from "lucide-react";
import { motion } from "framer-motion";

import CategoryChip from "../components/ui/CategoryChip";
import EventCard from "../components/ui/EventCard";
import Button from "../components/ui/Button";
import BottomNav from "../components/ui/BottomNav";

// Import your API service functions
import { fetchEvents, fetchNotifications } from "../services/api";

const Home = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Real unread counts state initialized to 0
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const categories = ["All", "Music", "Party", "Festival", "Meetup", "Sports", "Gaming"];

  // Fetch events and real unread notification counts from backend on load
  useEffect(() => {
    const getHomeData = async () => {
      try {
        // Fetch events and notifications concurrently
        const [eventsRes, notifsRes] = await Promise.all([
          fetchEvents(),
          fetchNotifications().catch(() => ({ data: [] })) // Fallback if notifications fail
        ]);

        setEvents(eventsRes.data || []);

        // Calculate unread notifications dynamically from backend data
        const unreadNotifsList = (notifsRes.data || []).filter((n) => !n.read);
        setUnreadNotifications(unreadNotifsList.length);

      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    getHomeData();
  }, []);

  // Filter events based on search query and category selection
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white pb-24"
    >
      {/* Header */}
      <div className="px-6 pt-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">
            Ready for your next adventure?
          </h1>
        </div>

        <div className="flex gap-3">
          {/* Notification Bell with Dynamic Badge */}
          <button 
            onClick={() => {
              setUnreadNotifications(0); // Clear badge locally immediately on click
              navigate("/notifications");
            }} 
            className="relative w-11 h-11 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-md animate-pulse">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
            <Bell size={20} className="text-gray-200" />
          </button>

          {/* Profile Icon */}
          <button 
            onClick={() => navigate("/profile")}
            className="w-11 h-11 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            <CircleUserRound size={22} className="text-gray-200" />
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="px-6 mt-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search events, locations, or buddies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#17171C] border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition"
          />
        </div>
      </div>

      {/* Hero / Host Event Banner */}
      <div className="px-6 mt-6">
        <div 
          onClick={() => navigate("/create")}
          className="rounded-3xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] p-6 shadow-lg shadow-[#FF6B6B]/20 cursor-pointer hover:opacity-95 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Host Your Own Event
              </h2>
              <p className="mt-1 text-white/90 text-xs leading-relaxed">
                Bring people together and create unforgettable memories.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Plus size={22} />
            </div>
          </div>

          <Button 
            onClick={(e) => {
              e.stopPropagation(); 
              navigate("/create");
            }}
            className="mt-5 bg-white text-black hover:bg-gray-100 font-semibold w-full text-xs py-3"
          >
            Create Event
          </Button>
        </div>
      </div>

      {/* Categories Selection */}
      <section className="mt-8 px-6">
        <h2 className="text-lg font-bold mb-4">
          Categories
        </h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => {
            let icon = <Music2 size={18} />;
            if (cat === "Party") icon = <PartyPopper size={18} />;
            if (cat === "Festival") icon = <Tent size={18} />;
            if (cat === "Meetup") icon = <Coffee size={18} />;
            if (cat === "Sports") icon = <Trophy size={18} />;
            if (cat === "Gaming") icon = <Gamepad2 size={18} />;

            return (
              <div key={cat} onClick={() => setSelectedCategory(cat)} className="cursor-pointer">
                <CategoryChip 
                  icon={icon} 
                  title={cat} 
                  active={selectedCategory === cat} 
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending / Live Events Feed Section */}
      <section className="mt-8">
        <div className="px-6 flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="text-[#FF6B6B]" size={20} />
            <h2 className="text-lg font-bold">
              {selectedCategory === "All" ? "Trending Events" : `${selectedCategory} Events`}
            </h2>
          </div>

          <span className="text-xs text-gray-400 font-medium">
            {filteredEvents.length} found
          </span>
        </div>

        <div className="px-6 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400 text-xs">Loading events from database...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center">
              <p className="text-xs font-semibold text-gray-300">No events found</p>
              <p className="text-[11px] text-gray-500 mt-1">Try searching for something else or create a new event!</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                image={event.image}
                title={event.title}
                location={event.location}
                date={event.date}
                attendees={event.attendees?.length || 12}
                rating={event.rating || "4.9"}
                onClick={() => navigate(`/event/${event._id}`)}
              />
            ))
          )}
        </div>
      </section>

      {/* Persistent Bottom Nav with active dynamic unread message badge count */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Home;