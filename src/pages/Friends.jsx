import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "../components/ui/BottomNav";
import API from "../services/api";

const Friends = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dynamic unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch accepted friends list
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const { data } = await API.get("/users/friends");
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // Open direct message route and clear badge count locally
  const startChat = (friendId) => {
    setUnreadMessages(0);
    navigate(`/chat/private/${friendId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Sticky Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center gap-2.5 shrink-0 z-20">
        <div className="p-2 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] shrink-0">
          <Users size={18} />
        </div>
        <h1 className="text-sm font-bold">My Friends</h1>
      </div>

      {/* Independent Scrollable Feed Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 pb-28 overscroll-contain">
        {loading ? (
          <div className="text-center text-gray-500 text-xs mt-10">Loading friends...</div>
        ) : friends.length === 0 ? (
          <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs">
            No friends added yet. Go to Discover and connect with people!
          </div>
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center justify-between p-3.5 bg-[#17171C] border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3 truncate">
                <img
                  src={friend.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                />
                <div className="truncate">
                  <h3 className="text-xs font-bold text-white truncate">{friend.name}</h3>
                  <p className="text-[10px] text-gray-400 truncate max-w-[160px] mt-0.5">
                    {friend.bio || "Event Buddy"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => startChat(friend._id)}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FF6B6B]/10 text-[#FF6B6B] text-[11px] font-semibold rounded-xl hover:bg-[#FF6B6B] hover:text-white transition active:scale-95 shrink-0 ml-2"
              >
                <MessageSquare size={14} /> Message
              </button>
            </div>
          ))
        )}
      </div>

      {/* Dynamic unread message count passed into BottomNav */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Friends;