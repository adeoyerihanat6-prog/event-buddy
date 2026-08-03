import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, Sparkles, UserPlus, Check, MessageCircle, Clock } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] shrink-0">
            <Users size={18} />
          </div>
          <h1 className="text-sm font-bold">Discover Buddies</h1>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search buddies by name or interests..."
            className="w-full bg-[#17171C] border border-white/10 rounded-xl pl-10 pr-3.5 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition select-text"
          />
        </div>

        {/* Section Title */}
        <div className="flex items-center gap-2 pt-1">
          <Sparkles size={16} className="text-[#FF6B6B]" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Community Members</h2>
        </div>

        {/* Users List Feed */}
        {loading ? (
          <p className="text-center text-gray-500 text-xs mt-10">Finding event buddies...</p>
        ) : filteredUsers.length === 0 ? (
          <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs leading-relaxed">
            No buddies found matching your search. Check back later as more people join!
          </div>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((userItem) => {
              const status = userItem.friendshipStatus; // "connect" | "requested" | "pending" | "friends"

              return (
                <div
                  key={userItem._id}
                  className="flex items-center justify-between p-3.5 bg-[#17171C] border border-white/10 rounded-2xl hover:border-[#FF6B6B]/50 transition"
                >
                  <div 
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 mr-2"
                    onClick={() => navigate(`/profile/${userItem._id}`)}
                  >
                    <img
                      src={userItem.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                      alt={userItem.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div className="truncate">
                      <h3 className="text-xs font-bold text-white truncate">{userItem.name}</h3>
                      <p className="text-[10px] text-gray-400 truncate">
                        {userItem.bio || "Ready to explore awesome events!"}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Action Button */}
                  <div className="shrink-0">
                    {status === "friends" ? (
                      <button
                        onClick={() => navigate(`/chat/private/${userItem._id}`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-white transition"
                      >
                        <MessageCircle size={13} /> Buddied
                      </button>
                    ) : status === "requested" ? (
                      <button
                        disabled
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-white/5 text-gray-400 cursor-default border border-white/10"
                      >
                        <Check size={13} /> Requested
                      </button>
                    ) : status === "pending" ? (
                      <button
                        onClick={() => navigate(`/notifications`)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-amber-500/15 text-amber-400 hover:bg-amber-500 hover:text-white transition"
                      >
                        <Clock size={13} /> Respond
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSendRequest(userItem._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-[#FF6B6B]/15 text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition"
                      >
                        <UserPlus size={13} /> Connect
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Discover;