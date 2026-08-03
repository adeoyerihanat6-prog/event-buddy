import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import BackButton from "../components/ui/BackButton";
import BottomNav from "../components/ui/BottomNav";

const Safety = () => {
  const navigate = useNavigate();
  
  // Dynamic unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-32"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-xl font-bold">Safety & Verification</h1>
        <div className="w-10" />
      </div>

      {/* Verification Card */}
      <div className="bg-[#17171C] border border-white/10 p-5 rounded-3xl mb-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-sm font-bold">Account Verification</h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Verify your identity with a phone number or ID badge to build trust with your event buddies.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 size={16} />
              Verified Member
            </div>
          </div>
        </div>
      </div>

      {/* Safety Guidelines Sections */}
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Community Rules</h2>
      <div className="space-y-3">
        <div className="bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-2.5 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-xl">
            <Lock size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Meet in Public Spaces</p>
            <p className="text-xs text-gray-400 mt-0.5">Always meet your event buddies at public venues.</p>
          </div>
        </div>

        <div className="bg-[#17171C] border border-white/10 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-xl">
            <AlertTriangle size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Report Suspicious Behavior</p>
            <p className="text-xs text-gray-400 mt-0.5">Contact support immediately if you feel unsafe.</p>
          </div>
        </div>
      </div>

      {/* Dynamic Bottom Nav */}
      <BottomNav unreadMessagesCount={unreadMessages} />
    </motion.div>
  );
};

export default Safety;