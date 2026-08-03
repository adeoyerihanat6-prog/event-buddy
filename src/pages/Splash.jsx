import { useNavigate } from "react-router-dom";
import AppLayout from "../components/ui/AppLayout";
import Button from "../components/ui/Button";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <AppLayout noHeader noBottomNav>
      <div className="absolute inset-0 h-screen w-screen bg-[#111111] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white tracking-tight select-text">
            Event <span className="text-[#FF6B6B]">Buddy</span>
          </h1>

          <p className="text-xs text-gray-400 mt-2 select-text">
            Never attend an event alone.
          </p>
        </div>

        <div className="w-full max-w-xs mt-10">
          <Button 
            onClick={() => navigate("/onboarding")}
            className="w-full py-3 text-xs rounded-xl shadow-lg shadow-[#FF6B6B]/25 active:scale-95 transition"
          >
            Get Started
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Splash;