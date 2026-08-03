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
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2.5 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
          <Users size={22} />
        </div>
        <h1 className="text-xl font-bold">My Friends</h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-xs mt-10">Loading friends...</p>
      ) : friends.length === 0 ? (
        <div className="p-8 bg-[#17171C] border border-white/10 rounded-3xl text-center text-gray-400 text-xs">
          No friends added yet. Go to Discover and connect with people!
        </div>
      ) : (
        <div className="space-y-3">
          {friends.map((friend) => (
            <div
              key={friend._id}
              className="flex items-center justify-between p-4 bg-[#17171C] border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <img
                  src={friend.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{friend.name}</h3>
                  <p className="text-xs text-gray-400 truncate max-w-[180px]">
                    {friend.bio || "Event Buddy"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => startChat(friend._id)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-semibold rounded-xl hover:bg-[#FF6B6B] hover:text-white transition"
              >
                <MessageSquare size={14} /> Message
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic unread message count passed into BottomNav */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Friends;