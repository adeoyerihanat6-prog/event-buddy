import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";
import AppLayout from "../components/ui/AppLayout";
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
    <AppLayout
      unreadMessagesCount={unreadCount}
      header={
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#FF6B6B]/15 text-[#FF6B6B] shrink-0">
            <MessageSquare size={18} />
          </div>
          <h1 className="text-sm font-bold">Messages</h1>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Group Rooms Section */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">Group Rooms</h2>
          <div className="space-y-3">
            <div
              onClick={() => {
                setUnreadCount(0);
                navigate("/chat/general");
              }}
              className="flex items-center gap-3 p-3.5 bg-[#17171C] border border-white/10 rounded-2xl cursor-pointer hover:border-[#FF6B6B]/50 transition active:scale-[0.98]"
            >
              <div className="p-2.5 bg-[#FF6B6B]/15 text-[#FF6B6B] rounded-xl shrink-0">
                <Users size={18} />
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-white truncate">General Event Community</h3>
                <p className="text-[10px] text-gray-400 truncate">Chat with all event buddies globally</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Messages Section */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">Direct Messages (Buddies)</h2>
          {loading ? (
            <p className="text-center text-gray-500 text-xs mt-6">Loading chats...</p>
          ) : friends.length === 0 ? (
            <div className="p-5 bg-[#17171C] border border-white/10 rounded-2xl text-center text-gray-400 text-xs leading-relaxed">
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
                  className="flex items-center gap-3 p-3.5 bg-[#17171C] border border-white/10 rounded-2xl cursor-pointer hover:border-[#FF6B6B]/50 transition active:scale-[0.98]"
                >
                  <img
                    src={friend.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <div className="overflow-hidden truncate">
                    <h3 className="text-xs font-bold text-white truncate">{friend.name}</h3>
                    <p className="text-[10px] text-gray-400 truncate">
                      {friend.bio || "Tap to chat"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatInbox;