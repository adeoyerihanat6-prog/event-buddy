import { useNavigate, useLocation } from "react-router-dom";
import { Home, MessageSquare, Calendar, User } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/home", icon: <Home size={20} /> },
    { label: "Chats", path: "/chat", icon: <MessageSquare size={20} /> },
    { label: "Create", path: "/create", icon: <Calendar size={20} /> },
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
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive ? "text-[#FF6B6B]" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;