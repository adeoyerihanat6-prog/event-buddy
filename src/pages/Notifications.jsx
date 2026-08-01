import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, MessageSquare, UserPlus, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";

const Notifications = () => {
  const navigate = useNavigate();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "chat",
      title: "New Message in Summer Music Festival",
      description: "Sarah (Host): 'Hey everyone! So excited for the festival tomorrow 🎉'",
      time: "10m ago",
      read: false,
    },
    {
      id: 2,
      type: "buddy",
      title: "New Buddy Request",
      description: "David wants to connect for Indie Rock Night at the Park.",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      type: "event",
      title: "Event Reminder",
      description: "Your event 'Summer Music Festival' starts tomorrow at 6:00 PM.",
      time: "5h ago",
      read: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-24"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-xl font-bold">Notifications</h1>
        <button 
          onClick={markAllAsRead}
          className="text-xs text-[#FF6B6B] font-semibold hover:underline"
        >
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition flex items-start gap-3.5 ${
              item.read 
                ? "bg-[#17171C]/50 border-white/5 text-gray-400" 
                : "bg-[#17171C] border-white/10 text-white shadow-lg"
            }`}
          >
            {/* Icon Based on Type */}
            <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
              item.type === "chat" ? "bg-indigo-500/10 text-indigo-400" :
              item.type === "buddy" ? "bg-[#FF6B6B]/10 text-[#FF6B6B]" :
              "bg-[#FFD166]/10 text-[#FFD166]"
            }`}>
              {item.type === "chat" && <MessageSquare size={18} />}
              {item.type === "buddy" && <UserPlus size={18} />}
              {item.type === "event" && <Calendar size={18} />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold truncate">{item.title}</h2>
                <span className="text-[10px] text-gray-500 shrink-0 ml-2">{item.time}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notifications;