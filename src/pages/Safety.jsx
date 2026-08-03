import { useState } from "react";
import { ShieldCheck, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";

const Safety = () => {
  // Dynamic unread message badge state for BottomNav
  const [unreadMessages, setUnreadMessages] = useState(0);

  return (
    <AppLayout
      unreadMessagesCount={unreadMessages}
      header={
        <div className="flex items-center justify-between w-full">
          <BackButton />
          <h1 className="text-sm font-bold">Safety & Verification</h1>
          <div className="w-8" /> {/* Spacer to center title */}
        </div>
      }
    >
      <div className="space-y-5">
        {/* Verification Card */}
        <div className="bg-[#17171C] border border-white/10 p-5 rounded-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-xl shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Account Verification</h2>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed select-text">
                Verify your identity with a phone number or ID badge to build trust with your event buddies.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 size={15} />
                Verified Member
              </div>
            </div>
          </div>
        </div>

        {/* Safety Guidelines Sections */}
        <div>
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2.5">Community Rules</h2>
          <div className="space-y-2.5">
            <div className="bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center gap-3.5">
              <div className="p-2 bg-[#FF6B6B]/15 text-[#FF6B6B] rounded-xl shrink-0">
                <Lock size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold">Meet in Public Spaces</p>
                <p className="text-[10px] text-gray-400 mt-0.5 select-text">Always meet your event buddies at public venues.</p>
              </div>
            </div>

            <div className="bg-[#17171C] border border-white/10 p-3.5 rounded-2xl flex items-center gap-3.5">
              <div className="p-2 bg-yellow-500/15 text-yellow-400 rounded-xl shrink-0">
                <AlertTriangle size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold">Report Suspicious Behavior</p>
                <p className="text-[10px] text-gray-400 mt-0.5 select-text">Contact support immediately if you feel unsafe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Safety;