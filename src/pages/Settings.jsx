import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Shield, User, Globe, HelpCircle, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import BottomNav from "../components/ui/BottomNav";

const Settings = () => {
  const navigate = useNavigate();

  // Toggle states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  // Dynamic unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  const handleLogout = () => {
    // Clear user session from browser storage
    localStorage.removeItem("userInfo");
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col overflow-hidden"
    >
      {/* Pinned Sticky Header */}
      <div className="bg-[#17171C]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <BackButton />
        <h1 className="text-sm font-bold">Settings</h1>
        <div className="w-9" />
      </div>

      {/* Independent Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-28 overscroll-contain">
        
        {/* Section: Preferences */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
            Preferences & Privacy
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            {/* Toggle 1: Push Notifications */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Bell size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Push Notifications</p>
                  <p className="text-[10px] text-gray-400 truncate">Get alerts for messages & buddies</p>
                </div>
              </div>
              <button 
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 shrink-0 ml-3 active:scale-95 ${
                  pushNotifications ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pushNotifications ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 2: Location Sharing */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Globe size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Live Location Sharing</p>
                  <p className="text-[10px] text-gray-400 truncate">Visible to event buddies on meetups</p>
                </div>
              </div>
              <button 
                onClick={() => setLocationSharing(!locationSharing)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 shrink-0 ml-3 active:scale-95 ${
                  locationSharing ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  locationSharing ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 3: Public Profile */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-[#FFD166]/10 text-[#FFD166] shrink-0">
                  <User size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Public Profile Discovery</p>
                  <p className="text-[10px] text-gray-400 truncate">Allow others to see your events</p>
                </div>
              </div>
              <button 
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-11 h-6 rounded-full transition-colors relative p-1 shrink-0 ml-3 active:scale-95 ${
                  publicProfile ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  publicProfile ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Section: Support & Security */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
            Support & Safety
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            <button 
              onClick={() => navigate("/safety")}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Shield size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Safety Guidelines</p>
                  <p className="text-[10px] text-gray-400 truncate">Learn how to stay safe at meetups</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-500 shrink-0 ml-2" />
            </button>

            <button className="w-full p-3.5 flex items-center justify-between text-left hover:bg-white/5 transition active:scale-[0.99]">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
                  <HelpCircle size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Help & FAQ</p>
                  <p className="text-[10px] text-gray-400 truncate">Get support or report an issue</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-500 shrink-0 ml-2" />
            </button>

          </div>
        </div>

        {/* Section: Account Session */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
            Session
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl overflow-hidden">
            <button 
              onClick={handleLogout}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-red-500/10 transition group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/20 shrink-0">
                  <LogOut size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-red-400">Log Out</p>
                  <p className="text-[10px] text-gray-400 truncate">Sign out of your account on this device</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-500 shrink-0 ml-2" />
            </button>
          </div>
        </div>

      </div>

      {/* Persistent Bottom Nav with dynamic unread count */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Settings;