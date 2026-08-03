import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, Sparkles, UserPlus, Check, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

import BottomNav from "../components/ui/BottomNav";
import API from "../services/api";

const Discover = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Unread badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Fetch all registered users from backend on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle sending a friend request
  const handleSendRequest = async (userId) => {
    try {
      await API.post(`/users/request/${userId}`);
      
      // Dynamically update state so the button switches instantly without refreshing
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, friendshipStatus: "requested" } : user
        )
      );
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert(error.response?.data?.error || "Failed to send friend request.");
    }
  };

  // Filter users based on search query (name or bio)
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B]">
            <Users size={22} />
          </div>
          <h1 className="text-xl font-bold">Discover Buddies</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search buddies by name or interests..."
          className="w-full bg-[#17171C] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
        />
      </div>

      {/* Section Title */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-[#FF6B6B]" />
        <h2 className="text-base font-bold">Community Members</h2>
      </div>

      {/* Users List Feed */}
      {loading ? (
        <p className="text-center text-gray-500 text-xs mt-10">Finding event buddies...</p>
      ) : filteredUsers.length === 0 ? (
        <div className="p-8 bg-[#17171C] border border-white/10 rounded-3xl text-center text-gray-400 text-xs">
          No buddies found matching your search. Check back later as more people join!
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((userItem) => {
            const status = userItem.friendshipStatus; // "connect" | "requested" | "pending" | "friends"

            return (
              <div
                key={userItem._id}
                className="flex items-center justify-between p-4 bg-[#17171C] border border-white/10 rounded-2xl hover:border-[#FF6B6B]/50 transition"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => navigate(`/profile/${userItem._id}`)}
                >
                  <img
                    src={userItem.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                    alt={userItem.name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{userItem.name}</h3>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {userItem.bio || "Ready to explore awesome events!"}
                    </p>
                  </div>
                </div>

                {/* Dynamic Action Button */}
                {status === "friends" ? (
                  <button
                    onClick={() => navigate(`/chat/private/${userItem._id}`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                  >
                    <MessageCircle size={14} /> Buddied
                  </button>
                ) : status === "requested" ? (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 text-gray-400 cursor-default border border-white/10"
                  >
                    <Check size={14} /> Requested
                  </button>
                ) : status === "pending" ? (
                  <button
                    onClick={() => navigate(`/notifications`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white transition"
                  >
                    <Clock size={14} /> Respond
                  </button>
                ) : (
                  <button
                    onClick={() => handleSendRequest(userItem._id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition"
                  >
                    <UserPlus size={14} /> Connect
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Nav with dynamic state */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Discover;