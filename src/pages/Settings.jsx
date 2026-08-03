import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Shield, User, Globe, HelpCircle, ChevronRight, LogOut } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";

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
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center justify-between w-full">
          <BackButton />
          <h1 className="text-sm font-bold">Settings</h1>
          <div className="w-8" /> {/* Spacer to center title */}
        </div>
      }
    >
      <div className="space-y-5">
        
        {/* Section: Preferences */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Preferences & Privacy
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            {/* Toggle 1: Push Notifications */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 shrink-0">
                  <Bell size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Push Notifications</p>
                  <p className="text-[10px] text-gray-400 truncate">Get alerts for messages & buddies</p>
                </div>
              </div>
              <button 
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 shrink-0 ml-3 active:scale-95 ${
                  pushNotifications ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  pushNotifications ? "translate-x-4.5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 2: Location Sharing */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
                  <Globe size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Live Location Sharing</p>
                  <p className="text-[10px] text-gray-400 truncate">Visible to event buddies on meetups</p>
                </div>
              </div>
              <button 
                onClick={() => setLocationSharing(!locationSharing)}
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 shrink-0 ml-3 active:scale-95 ${
                  locationSharing ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  locationSharing ? "translate-x-4.5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Toggle 3: Public Profile */}
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-[#FFD166]/15 text-[#FFD166] shrink-0">
                  <User size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Public Profile Discovery</p>
                  <p className="text-[10px] text-gray-400 truncate">Allow others to see your events</p>
                </div>
              </div>
              <button 
                onClick={() => setPublicProfile(!publicProfile)}
                className={`w-10 h-5.5 rounded-full transition-colors relative p-0.5 shrink-0 ml-3 active:scale-95 ${
                  publicProfile ? "bg-[#FF6B6B]" : "bg-gray-700"
                }`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                  publicProfile ? "translate-x-4.5" : "translate-x-0"
                }`} />
              </button>
            </div>

          </div>
        </div>

        {/* Section: Support & Security */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Support & Safety
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl divide-y divide-white/5">
            
            <button 
              onClick={() => navigate("/safety")}
              className="w-full p-3 flex items-center justify-between text-left hover:bg-white/5 transition active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 shrink-0">
                  <Shield size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Safety Guidelines</p>
                  <p className="text-[10px] text-gray-400 truncate">Learn how to stay safe at meetups</p>
                </div>
              </div>
              <ChevronRight size={15} className="text-gray-500 shrink-0 ml-2" />
            </button>

            <button className="w-full p-3 flex items-center justify-between text-left hover:bg-white/5 transition active:scale-[0.99]">
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 shrink-0">
                  <HelpCircle size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold">Help & FAQ</p>
                  <p className="text-[10px] text-gray-400 truncate">Get support or report an issue</p>
                </div>
              </div>
              <ChevronRight size={15} className="text-gray-500 shrink-0 ml-2" />
            </button>

          </div>
        </div>

        {/* Section: Account Session */}
        <div>
          <h2 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Session
          </h2>
          <div className="bg-[#17171C] border border-white/10 rounded-2xl overflow-hidden">
            <button 
              onClick={handleLogout}
              className="w-full p-3 flex items-center justify-between text-left hover:bg-red-500/10 transition group active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="p-2 rounded-xl bg-red-500/15 text-red-400 group-hover:bg-red-500/25 shrink-0">
                  <LogOut size={15} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-red-400">Log Out</p>
                  <p className="text-[10px] text-gray-400 truncate">Sign out of your account on this device</p>
                </div>
              </div>
              <ChevronRight size={15} className="text-gray-500 shrink-0 ml-2" />
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default Settings;