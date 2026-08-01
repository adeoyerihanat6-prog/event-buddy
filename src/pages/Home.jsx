import { useNavigate } from "react-router-dom";
import { Hand, Bell, CircleUserRound, Flame, ChevronRight, Plus, Music2, Trophy, PartyPopper, Tent, Coffee, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";

import SearchBar from "../components/ui/SearchBar";
import CategoryChip from "../components/ui/CategoryChip";
import EventCard from "../components/ui/EventCard";
import Button from "../components/ui/Button";
import BottomNav from "../components/ui/BottomNav"; // Make sure to import your BottomNav

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white pb-24"
    >
      {/* Header */}
      <div className="px-6 pt-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Hand size={18} className="text-[#FFD166]" />
            <p className="text-gray-400">Good Evening</p>
          </div>
          <h1 className="text-3xl font-black mt-2">
            Ready for your next adventure?
          </h1>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigate("/notifications")} 
            className="w-11 h-11 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            <Bell size={20} />
          </button>

          <button 
            onClick={() => navigate("/profile")}
            className="w-11 h-11 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
          >
            <CircleUserRound size={22} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mt-8">
        <SearchBar />
      </div>

      {/* Hero / Host Event Banner */}
      <div className="px-6 mt-8">
        <div 
          onClick={() => navigate("/create")}
          className="rounded-3xl bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] p-6 shadow-lg shadow-[#FF6B6B]/20 cursor-pointer hover:opacity-95 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Host Your Own Event
              </h2>
              <p className="mt-2 text-white/80 text-sm">
                Bring people together and create unforgettable memories.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Plus size={24} />
            </div>
          </div>

          <Button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent double triggering with the card click
              navigate("/create");
            }}
            className="mt-6 bg-white text-black hover:bg-gray-100 font-semibold w-full"
          >
            Create Event
          </Button>
        </div>
      </div>

      {/* Trending */}
      <section className="mt-10">
        <div className="px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="text-[#FF6B6B]" />
            <h2 className="text-2xl font-bold">
              Trending
            </h2>
          </div>

          <button className="flex items-center gap-1 text-[#FF6B6B] font-medium text-sm">
            See all
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="px-6 mt-5">
          <EventCard
            image="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
            title="Summer Music Festival"
            location="Lagos, Nigeria"
            date="20 Aug • 6:00 PM"
            attendees="326"
            rating="4.9"
            onClick={() => navigate("/event/1")}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-5">
          Categories
        </h2>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          <CategoryChip icon={<Music2 size={18} />} title="Music" active />
          <CategoryChip icon={<PartyPopper size={18} />} title="Party" />
          <CategoryChip icon={<Tent size={18} />} title="Festival" />
          <CategoryChip icon={<Coffee size={18} />} title="Meetup" />
          <CategoryChip icon={<Trophy size={18} />} title="Sports" />
          <CategoryChip icon={<Gamepad2 size={18} />} title="Gaming" />
        </div>
      </section>

      {/* Persistent Bottom Nav */}
      <BottomNav />
    </motion.div>
  );
};

export default Home;