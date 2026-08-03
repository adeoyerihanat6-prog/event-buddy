import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen fixed inset-0 bg-[#111111] flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Event <span className="text-[#FF6B6B]">Buddy</span>
        </h1>

        <p className="text-xs text-gray-400 mt-2">
          Never attend an event alone.
        </p>
      </div>

      <div className="w-full max-w-xs mt-12">
        <Button 
          onClick={() => navigate("/onboarding")}
          className="w-full py-3 text-xs rounded-xl shadow-lg active:scale-95 transition"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Splash;