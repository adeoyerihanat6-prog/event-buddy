import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Lock, Shield, User, Globe, HelpCircle, ChevronRight, LogOut } from "lucide-react";
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
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <BackButton />
        <h1 className="text-xl font-bold">Settings</h1>
        <div className="w-10" />
      </div>

      <div className="space-y-6">
        
        {/* Section: Preferences */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Preferences & Privacy
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            {/* Toggle 1: Push Notifications */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Push Notifications</p>
                  <p className="text-xs text-gray-400">Get alerts for messages & buddies</p>
                </div>
              </div>
              <button 
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  pushNotifications ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  pushNotifications ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 2: Location Sharing */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Live Location Sharing</p>
                  <p className="text-xs text-gray-400">Visible to event buddies on meetups</p>
                </div>
              </div>
              <button 
                onClick={() => setLocationSharing(!locationSharing)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  locationSharing ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  locationSharing ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 3: Public Profile */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#FFD166]/10 text-[#FFD166]">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Public Profile Discovery</p>
                  <p className="text-xs text-gray-400">Allow others to see your events</p>
                </div>
              </div>
              <button 
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  publicProfile ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  publicProfile ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Section: Support & Security */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Support & Safety
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            <button 
              onClick={() => navigate("/safety")}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Safety Guidelines</p>
                  <p className="text-xs text-gray-400">Learn how to stay safe at meetups</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>

            <button className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Help & FAQ</p>
                  <p className="text-xs text-gray-400">Get support or report an issue</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>

          </div>
        </div>

        {/* Section: Account Session */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Session
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl overflow-hidden">
            <button 
              onClick={handleLogout}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-red-500/10 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/20">
                  <LogOut size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-400">Log Out</p>
                  <p className="text-xs text-gray-400">Sign out of your account on this device</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
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