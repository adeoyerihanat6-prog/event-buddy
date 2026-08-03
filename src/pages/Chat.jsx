import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

import BackButton from "../components/ui/BackButton";
import API from "../services/api";

const socket = io("http://localhost:5000");

const Chat = () => {
  const { eventId, friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [friendInfo, setFriendInfo] = useState(null);
  const messagesEndRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const currentUserId = userInfo?._id;

  const isPrivate = Boolean(friendId);
  const roomId = isPrivate
    ? [currentUserId, friendId].sort().join("_")
    : eventId
    ? `event_${eventId}`
    : "general";

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        // 1. Fetch messages
        const endpoint = isPrivate ? `/chats/private/${friendId}` : `/chats/${eventId || "general"}`;
        const msgRes = await API.get(endpoint);
        setMessages(msgRes.data);

        // 2. If it's a private chat, fetch buddy details for the header
        if (isPrivate) {
          const userRes = await API.get(`/users/${friendId}`);
          setFriendInfo(userRes.data);
        }

        // 3. Automatically mark messages as read to clear notification badges
        const readEndpoint = isPrivate ? `/chats/read/private/${friendId}` : `/chats/read/${eventId || "general"}`;
        await API.put(readEndpoint);

      } catch (error) {
        console.error("Error fetching chat data or marking read:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();

    // Join room
    socket.emit("join_room", roomId);

    // Listen for incoming messages
    const handleReceiveMessage = (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [eventId, friendId, roomId, isPrivate]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const endpoint = isPrivate ? `/chats/private/${friendId}` : `/chats/${eventId || "general"}`;
      const { data } = await API.post(endpoint, {
        text: newMessage,
      });

      socket.emit("send_message", { roomId, ...data });

      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white flex flex-col justify-between"
    >
      {/* Top Header */}
      <div className="bg-[#17171C]/80 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BackButton />
          
          <div className="flex items-center gap-3">
            {isPrivate && (
              <img
                src={friendInfo?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                alt="buddy avatar"
                className="w-9 h-9 rounded-full object-cover border border-white/10"
              />
            )}
            <div>
              <h1 className="text-sm font-bold">
                {isPrivate
                  ? friendInfo?.name || "Direct Message"
                  : eventId
                  ? "Event Group Chat"
                  : "General Community Chat"}
              </h1>
              <p className="text-[10px] text-emerald-400">
                {isPrivate ? "● Online" : "● Live Connection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 pb-24">
        {loading ? (
          <p className="text-center text-gray-500 text-xs mt-10">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xs">
            No messages yet. Start the conversation! 👋
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender?._id === currentUserId;
            return (
              <div
                key={index}
                className={`flex items-end gap-2.5 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isMe && (
                  <img
                    src={msg.sender?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                  />
                )}
                <div
                  className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? "bg-[#FF6B6B] text-white rounded-br-none"
                      : "bg-[#17171C] border border-white/10 text-gray-200 rounded-bl-none"
                  }`}
                >
                  {!isMe && <p className="font-bold text-[#FF6B6B] mb-1 text-[11px]">{msg.sender?.name}</p>}
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={handleSend}
        className="fixed bottom-0 left-0 right-0 bg-[#0B0B0F]/90 backdrop-blur-md border-t border-white/10 p-4 px-6 flex items-center gap-3 z-50"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-[#17171C] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition"
        />
        <button
          type="submit"
          className="p-3 bg-[#FF6B6B] text-white rounded-2xl hover:bg-[#ff5252] transition shadow-lg shadow-[#FF6B6B]/20"
        >
          <Send size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default Chat;