import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import BackButton from "../components/ui/BackButton";
import BottomNav from "../components/ui/BottomNav";
import API from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchAndMarkRead = async () => {
      try {
        const { data } = await API.get("/notifications");
        setNotifications(data);

        // Instantly mark them as read on the backend when opened
        await API.put("/notifications/read");

        // Optional: Fetch unread message count here if your backend supports a summary route
        const unreadRes = await API.get("/chats/unread-count").catch(() => ({ data: { count: 0 } }));
        setUnreadMessages(unreadRes.data.count || 0);

      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMarkRead();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Sticky Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center gap-3 shrink-0 z-20">
        <BackButton />
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] shrink-0">
            <Bell size={18} />
          </div>
          <h1 className="text-sm font-bold">Notifications</h1>
        </div>
      </div>

      {/* Independent Scrollable Feed Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 pb-28 overscroll-contain">
        {loading ? (
          <div className="text-center text-gray-500 text-xs mt-10">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs leading-relaxed">
            You have no notifications right now. Check back later! ✨
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif._id}
              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition ${
                notif.read ? "bg-[#17171C]/50 border-white/5" : "bg-[#17171C] border-white/10 shadow-lg shadow-black/20"
              }`}
            >
              <img
                src={notif.sender?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border border-white/10 mt-0.5 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-200 leading-relaxed">
                  <span className="font-bold text-white">{notif.sender?.name || "Someone"}</span> {notif.text}
                </p>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom Nav with dynamic unread message count */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Notifications;