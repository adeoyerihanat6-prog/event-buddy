import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Image, MapPin, ShieldCheck, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import BottomNav from "../components/ui/BottomNav";

const Chat = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah (Host)", text: "Hey everyone! So excited for the festival tomorrow 🎉", time: "5:30 PM", isMe: false },
    { id: 2, sender: "David", text: "Same here! Is everyone meeting at the main entrance?", time: "5:32 PM", isMe: false },
    { id: 3, sender: "You", text: "Yes, I'll be there right around 6:00 PM!", time: "5:35 PM", isMe: true },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageObj = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, messageObj]);
    setNewMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-screen bg-[#0B0B0F] text-white"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#17171C]/80 backdrop-blur-md border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-sm font-bold truncate max-w-[180px]">Summer Music Festival</h1>
            <p className="text-xs text-emerald-400 font-medium">327 buddies connected</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Pinned Event Info Banner */}
      <div className="bg-[#FF6B6B]/10 border-b border-[#FF6B6B]/20 px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <MapPin size={14} className="text-[#FF6B6B] shrink-0" />
          <span>Meetup: Main Entrance • Sat, 20 Aug at 6:00 PM</span>
        </div>
        <span className="text-[10px] bg-[#FF6B6B] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Pinned
        </span>
      </div>

      {/* Message History Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Safety Disclaimer */}
        <div className="text-center my-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-[#FF6B6B]" />
            Keep meetups in public areas & look out for each other!
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
          >
            {!msg.isMe && (
              <span className="text-[11px] text-gray-400 mb-1 ml-1 font-medium">
                {msg.sender}
              </span>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.isMe
                  ? "bg-[#FF6B6B] text-white rounded-br-none shadow-lg shadow-[#FF6B6B]/20"
                  : "bg-[#17171C] border border-white/10 text-gray-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 mx-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="px-6 py-4 bg-[#17171C] border-t border-white/10 flex items-center gap-3 shrink-0"
      >
        <button
          type="button"
          className="text-gray-400 hover:text-white transition p-2"
        >
          <Image size={20} />
        </button>

        <input
          type="text"
          placeholder="Type a message to your event buddies..."
          className="flex-1 bg-[#0B0B0F] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B6B] transition"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button
          type="submit"
          className="w-11 h-11 rounded-2xl bg-[#FF6B6B] text-white flex items-center justify-center shadow-lg shadow-[#FF6B6B]/30 hover:bg-[#ff5252] transition shrink-0"
        >
          <Send size={18} />
        </button>
      </form>
     
    </motion.div>
  );
};

export default Chat;