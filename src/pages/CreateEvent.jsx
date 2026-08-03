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

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center justify-between">
          <BackButton />
          <h1 className="text-sm font-bold">Host an Event</h1>
          <div className="w-8" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B6B]/20 to-[#FF8E53]/20 border border-[#FF6B6B]/30 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#FF6B6B]/20 text-[#FF6B6B] shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="font-semibold text-xs">Bring people together</h2>
            <p className="text-[10px] text-gray-400 mt-0.5">Choose a public venue and keep it safe!</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Event Title */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Event Title
            </label>
            <div className="relative">
              <FileText size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="e.g., Indie Rock Night at the Park"
                className="pl-11 text-xs select-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Event Cover Image
            </label>
            <div className="relative flex items-center bg-[#17171C] border border-white/10 rounded-xl px-3 py-2.5">
              <ImageIcon size={18} className="text-gray-400 mr-3 shrink-0" />
              <input 
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full text-[11px] text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-[#FF6B6B] file:text-white hover:file:opacity-90 transition cursor-pointer"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Category
            </label>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    category === cat
                      ? "bg-[#FF6B6B] text-white shadow-md shadow-[#FF6B6B]/30"
                      : "bg-[#17171C] text-gray-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="date"
                  className="pl-10 text-xs text-gray-200 select-text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Time
              </label>
              <div className="relative">
                <Clock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="time"
                  className="pl-10 text-xs text-gray-200 select-text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Public Location / Venue
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="e.g., Central Park Amphitheater"
                className="pl-11 text-xs select-text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Max Attendees */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Max Buddies (Optional limit)
            </label>
            <div className="relative">
              <Users size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="number"
                placeholder="e.g., 5"
                className="pl-11 text-xs select-text"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
              />
            </div>
          </div>

          {/* Vibe / Looking For */}
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Group Vibe
            </label>
            <div className="grid grid-cols-2 gap-2">
              {vibeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setVibe(option)}
                  className={`p-2.5 rounded-xl text-[11px] font-medium text-left transition-all border ${
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
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Description & Meetup Instructions
            </label>
            <textarea
              rows="3"
              placeholder="Tell people what to expect, where exactly to meet up inside the venue, etc."
              className="w-full bg-[#17171C] border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition text-xs resize-none select-text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" className="w-full py-3 text-xs font-bold rounded-xl shadow-lg active:scale-95" disabled={loading}>
              {loading ? "Publishing Event..." : "Publish Event"}
            </Button>
          </div>

        </form>
      </div>
    </AppLayout>
  );
};

export default CreateEvent;