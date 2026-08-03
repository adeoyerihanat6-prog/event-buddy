import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send } from "lucide-react";
import { io } from "socket.io-client";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";
import API from "../services/api";

const SOCKET_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://event-buddy-backend.onrender.com";

const socket = io(SOCKET_URL);

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
        const endpoint = isPrivate ? `/chats/private/${friendId}` : `/chats/${eventId || "general"}`;
        const msgRes = await API.get(endpoint);
        setMessages(msgRes.data);

        if (isPrivate) {
          const userRes = await API.get(`/users/${friendId}`);
          setFriendInfo(userRes.data);
        }

        const readEndpoint = isPrivate ? `/chats/read/private/${friendId}` : `/chats/read/${eventId || "general"}`;
        await API.put(readEndpoint);
      } catch (error) {
        console.error("Error fetching chat data or marking read:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();

    socket.emit("join_room", roomId);

    const handleReceiveMessage = (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [eventId, friendId, roomId, isPrivate]);

  // Smooth scroll to bottom when messages update
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
    <AppLayout
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <div className="flex items-center gap-3 truncate">
              {isPrivate && (
                <img
                  src={friendInfo?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                  alt="buddy avatar"
                  className="w-8 h-8 rounded-full object-cover border border-white/10 shrink-0"
                />
              )}
              <div className="truncate">
                <h1 className="text-xs font-bold truncate max-w-[180px]">
                  {isPrivate
                    ? friendInfo?.name || "Direct Message"
                    : eventId
                    ? "Event Group Chat"
                    : "General Community Chat"}
                </h1>
                <p className="text-[10px] text-emerald-400 mt-0.5">
                  {isPrivate ? "● Online" : "● Live Connection"}
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Chat Messages Feed Container */}
      <div className="space-y-3 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-xs">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-xs">
            <p>No messages yet. Start the conversation! 👋</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender?._id === currentUserId;
            return (
              <div
                key={index}
                className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isMe && (
                  <img
                    src={msg.sender?.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover border border-white/10 shrink-0 mb-1"
                  />
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? "bg-[#FF6B6B] text-white rounded-br-xs"
                      : "bg-[#17171C] border border-white/10 text-gray-200 rounded-bl-xs"
                  }`}
                >
                  {!isMe && <p className="font-bold text-[#FF6B6B] mb-0.5 text-[10px]">{msg.sender?.name}</p>}
                  <p className="break-words select-text">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Pinned Input Form Bar (Sits directly above BottomNav/Keyboard) */}
      <div className="absolute bottom-[72px] left-0 right-0 bg-[#17171C]/95 backdrop-blur-md border-t border-white/10 p-3 px-6 z-30">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-[#0B0B0F] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition select-text"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#FF6B6B] text-white rounded-xl hover:bg-[#ff5252] transition shadow-md shadow-[#FF6B6B]/20 active:scale-95 shrink-0"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </AppLayout>
  );
};

export default Chat;