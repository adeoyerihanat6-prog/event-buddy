import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center justify-center active:scale-95"
    >
      <ArrowLeft size={20} className="text-white" />
    </button>
  );
};

export default BackButton;