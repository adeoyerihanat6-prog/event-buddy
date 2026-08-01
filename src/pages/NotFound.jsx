import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import Button from "../components/ui/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center px-6 text-center"
    >
      {/* Icon Graphic */}
      <div className="w-20 h-20 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 flex items-center justify-center text-[#FF6B6B] mb-6">
        <Compass size={40} className="animate-pulse" />
      </div>

      {/* Error Code */}
      <span className="text-xs font-semibold uppercase tracking-widest text-[#FF6B6B] mb-2">
        Error 404
      </span>

      {/* Title */}
      <h1 className="text-3xl font-black mb-3">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
        Looks like this event or page wandered off. Let's get you back to finding your next adventure!
      </p>

      {/* Action Button */}
      <div className="w-full max-w-xs">
        <Button
          onClick={() => navigate("/home")}
          className="flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;