import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare, Users, User, Compass } from "lucide-react";

const BottomNav = ({ unreadMessagesCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home", icon: <Home size={20} /> },
    { label: "Discover", path: "/discover", icon: <Compass size={20} /> },
    { label: "Buddies", path: "/friends", icon: <Users size={20} /> },
    { 
      label: "Chats", 
      path: "/chat", 
      icon: <MessageSquare size={20} />, 
      badge: unreadMessagesCount > 0 ? (unreadMessagesCount > 9 ? "9+" : unreadMessagesCount) : null 
    },
    { label: "Profile", path: "/profile", icon: <User size={20} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0B0B0F]/90 backdrop-blur-md border-t border-white/10 px-6 py-3 flex items-center justify-between z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`relative flex flex-col items-center gap-1 transition-all ${
              isActive ? "text-[#FF6B6B]" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {item.badge && (
              <span className="absolute -top-1 -right-2 bg-[#FF6B6B] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-md animate-pulse">
                {item.badge}
              </span>
            )}
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;