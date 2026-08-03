import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CircleUserRound, Flame, Plus, Music2, Trophy, PartyPopper, Tent, Coffee, Gamepad2, Search } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
import CategoryChip from "../components/ui/CategoryChip";
import EventCard from "../components/ui/EventCard";
import Button from "../components/ui/Button";

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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-sm font-bold">
              Ready for your next adventure?
            </h1>
          </div>

          <div className="flex gap-2 shrink-0">
            {/* Notification Bell with Dynamic Badge */}
            <button 
              onClick={() => {
                setUnreadNotifications(0); // Clear badge locally immediately on click
                navigate("/notifications");
              }} 
              className="relative w-8 h-8 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition active:scale-95"
            >
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[9px] font-bold px-1 py-0.2 rounded-full min-w-[14px] text-center shadow-md animate-pulse">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
              <Bell size={14} className="text-gray-200" />
            </button>

            {/* Profile Icon */}
            <button 
              onClick={() => navigate("/profile")}
              className="w-8 h-8 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition active:scale-95"
            >
              <CircleUserRound size={16} className="text-gray-200" />
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Search Input Bar */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search events, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#17171C] border border-white/10 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition select-text"
          />
        </div>

        {/* Hero / Host Event Banner */}
        <div 
          onClick={() => navigate("/create")}
          className="rounded-2xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] p-4 shadow-lg shadow-[#FF6B6B]/20 cursor-pointer hover:opacity-95 transition active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <div className="pr-3">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">
                Host Your Own Event
              </h2>
              <p className="mt-0.5 text-white/90 text-[10px] leading-relaxed">
                Bring people together and create unforgettable memories.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Plus size={16} />
            </div>
          </div>

          <Button 
            onClick={(e) => {
              e.stopPropagation(); 
              navigate("/create");
            }}
            className="mt-3.5 bg-white text-black hover:bg-gray-100 font-semibold w-full text-xs py-2 rounded-xl"
          >
            Create Event
          </Button>
        </div>

        {/* Categories Selection */}
        <section>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
            Categories
          </h2>

          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => {
              let icon = <Music2 size={15} />;
              if (cat === "Party") icon = <PartyPopper size={15} />;
              if (cat === "Festival") icon = <Tent size={15} />;
              if (cat === "Meetup") icon = <Coffee size={15} />;
              if (cat === "Sports") icon = <Trophy size={15} />;
              if (cat === "Gaming") icon = <Gamepad2 size={15} />;

              return (
                <div key={cat} onClick={() => setSelectedCategory(cat)} className="cursor-pointer shrink-0">
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
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Flame className="text-[#FF6B6B]" size={16} />
              <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-300">
                {selectedCategory === "All" ? "Trending Events" : `${selectedCategory} Events`}
              </h2>
            </div>

            <span className="text-[10px] text-gray-400 font-medium">
              {filteredEvents.length} found
            </span>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-10 text-gray-400 text-xs">Loading events from database...</div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-5 bg-[#17171C] border border-white/10 rounded-2xl text-center">
                <p className="text-xs font-semibold text-gray-300">No events found</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Try searching for something else or create a new event!</p>
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
      </div>
    </AppLayout>
  );
};

export default Home;