import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "../components/ui/BottomNav";
import API from "../services/api";

const ChatInbox = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchChatInboxData = async () => {
      try {
        const friendsRes = await API.get("/users/friends");
        setFriends(friendsRes.data);

        const unreadRes = await API.get("/chats/unread-count").catch(() => ({ data: { count: 0 } }));
        setUnreadCount(unreadRes.data.count || 0);
      } catch (error) {
        console.error("Error fetching chat inbox data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatInboxData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Native Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center gap-3 shrink-0 z-20">
        <div className="p-2.5 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
          <MessageSquare size={22} />
        </div>
        <h1 className="text-xl font-bold">Messages</h1>
      </div>

      {/* Independent Scrollable Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-28 overscroll-contain">
        {/* Group Rooms Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Group Rooms</h2>
          <div className="space-y-3">
            <div
              onClick={() => {
                setUnreadCount(0);
                navigate("/chat/general");
              }}
              className="flex items-center gap-3 p-4 bg-[#17171C] border border-white/10 rounded-2xl cursor-pointer hover:border-[#FF6B6B]/50 transition active:scale-[0.98]"
            >
              <div className="p-3 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-xl shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">General Event Community</h3>
                <p className="text-xs text-gray-400">Chat with all event buddies globally</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Messages Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Direct Messages (Buddies)</h2>
          {loading ? (
            <p className="text-center text-gray-500 text-xs mt-6">Loading chats...</p>
          ) : friends.length === 0 ? (
            <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs">
              No friends connected yet. Head over to Discover to add buddies!
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => (
                <div
                  key={friend._id}
                  onClick={() => {
                    setUnreadCount(0);
                    navigate(`/chat/private/${friend._id}`);
                  }}
                  className="flex items-center gap-3 p-4 bg-[#17171C] border border-white/10 rounded-2xl cursor-pointer hover:border-[#FF6B6B]/50 transition active:scale-[0.98]"
                >
                  <img
                    src={friend.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                    alt={friend.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h3 className="text-sm font-bold text-white truncate">{friend.name}</h3>
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">
                      {friend.bio || "Tap to chat"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <BottomNav unreadMessagesCount={unreadCount} />
    </motion.div>
  );
};

export default ChatInbox;