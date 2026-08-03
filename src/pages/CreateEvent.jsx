import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Sparkles,
  Image as ImageIcon
} from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BottomNav from "../components/ui/BottomNav";

// Import your API service helper
import { createEvent } from "../services/api";

const CreateEvent = () => {
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Music");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [vibe, setVibe] = useState("Just looking for company");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  const categories = ["Music", "Party", "Festival", "Meetup", "Sports", "Gaming"];
  const vibeOptions = [
    "Introvert friendly 🌙", 
    "Extrovert ☀️", 
    "Just looking for company", 
    "Looking to make friends"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("date", `${date} • ${time}`);
      formData.append("location", location);
      formData.append("maxAttendees", maxAttendees);
      formData.append("vibe", vibe);
      formData.append("description", description);
      
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        // Fallback default picture if none uploaded
        formData.append("image", "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg");
      }

      await createEvent(formData);
      navigate("/home");
    } catch (error) {
      console.error("Error creating event:", error);
      alert(error.response?.data?.error || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-xl font-bold">Host an Event</h1>
        <div className="w-10" />
      </div>

      {/* Header Banner */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20 border border-[#FF6B6B]/30 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#FF6B6B]/20 text-[#FF6B6B]">
          <Sparkles size={22} />
        </div>
        <div>
          <h2 className="font-semibold text-sm">Bring people together</h2>
          <p className="text-xs text-gray-400 mt-0.5">Choose a public venue and keep it safe!</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Event Title */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Event Title
          </label>
          <div className="relative">
            <FileText size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="e.g., Indie Rock Night at the Park"
              className="pl-12"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Event Cover Image
          </label>
          <div className="relative flex items-center bg-[#17171C] border border-white/10 rounded-2xl px-4 py-3">
            <ImageIcon size={20} className="text-gray-400 mr-3 shrink-0" />
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#FF6B6B] file:text-white hover:file:opacity-90 transition cursor-pointer"
            />
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Category
          </label>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat
                    ? "bg-[#FF6B6B] text-white shadow-lg shadow-[#FF6B6B]/30"
                    : "bg-[#17171C] text-gray-400 border border-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="date"
                className="pl-12 text-sm text-gray-200"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Time
            </label>
            <div className="relative">
              <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="time"
                className="pl-12 text-sm text-gray-200"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Public Location / Venue
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="e.g., Central Park Amphitheater"
              className="pl-12"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Max Attendees */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Max Buddies (Optional limit)
          </label>
          <div className="relative">
            <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="number"
              placeholder="e.g., 5"
              className="pl-12"
              value={maxAttendees}
              onChange={(e) => setMaxAttendees(e.target.value)}
            />
          </div>
        </div>

        {/* Vibe / Looking For */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Group Vibe
          </label>
          <div className="grid grid-cols-2 gap-2">
            {vibeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setVibe(option)}
                className={`p-3 rounded-xl text-xs font-medium text-left transition-all border ${
                  vibe === option
                    ? "bg-[#FF6B6B]/10 border-[#FF6B6B] text-[#FF6B6B]"
                    : "bg-[#17171C] border-white/10 text-gray-300 hover:border-white/20"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Description & Meetup Instructions
          </label>
          <textarea
            rows="3"
            placeholder="Tell people what to expect, where exactly to meet up inside the venue, etc."
            className="w-full bg-[#17171C] border border-white/10 rounded-2xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition text-sm resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button type="submit" className="w-full py-4 font-bold" disabled={loading}>
            {loading ? "Publishing Event..." : "Publish Event"}
          </Button>
        </div>

      </form>

      {/* Persistent Bottom Nav with active unread state */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default CreateEvent;