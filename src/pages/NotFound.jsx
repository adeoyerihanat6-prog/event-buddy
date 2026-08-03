import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

import AppLayout from "../components/ui/AppLayout";
import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <AppLayout noBottomNav>
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[calc(100vh-100px)]">
        {/* Icon Graphic */}
        <div className="w-16 h-16 rounded-full bg-[#FF6B6B]/15 border border-[#FF6B6B]/30 flex items-center justify-center text-[#FF6B6B] mb-5">
          <Compass size={32} className="animate-pulse" />
        </div>

        {/* Error Code */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF6B6B] mb-1.5">
          Error 404
        </span>

        {/* Title */}
        <h1 className="text-2xl font-black mb-2.5">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-xs max-w-xs mb-7 leading-relaxed">
          Looks like this event or page wandered off. Let's get you back to finding your next adventure!
        </p>

        {/* Action Button */}
        <div className="w-full max-w-xs">
          <Button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center gap-2 py-3 text-xs rounded-xl shadow-md shadow-[#FF6B6B]/20"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;