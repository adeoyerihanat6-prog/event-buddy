import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
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
        // Ensure we fallback to an empty array if data isn't an array
        setFriends(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setFriends([]);
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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] shrink-0">
            <Users size={18} />
          </div>
          <h1 className="text-sm font-bold">My Friends</h1>
        </div>
      }
    >
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-gray-500 text-xs mt-10">Loading friends...</div>
        ) : (friends || []).length === 0 ? (
          <div className="p-6 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs leading-relaxed">
            No friends added yet. Go to Discover and connect with people!
          </div>
        ) : (
          (friends || []).map((friend) => (
            <div
              key={friend._id}
              className="flex items-center justify-between p-3.5 bg-[#17171C] border border-white/10 rounded-2xl hover:border-[#FF6B6B]/50 transition"
            >
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0 mr-2"
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                <img
                  src={friend.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                />
                <div className="truncate">
                  <h3 className="text-xs font-bold text-white truncate">{friend.name}</h3>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {friend.bio || "Event Buddy"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => startChat(friend._id)}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FF6B6B]/15 text-[#FF6B6B] text-[11px] font-semibold rounded-xl hover:bg-[#FF6B6B] hover:text-white transition active:scale-95 shrink-0"
              >
                <MessageSquare size={13} /> Message
              </button>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default Friends;