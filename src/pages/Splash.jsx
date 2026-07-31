import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          Event <span className="text-[#FF6B6B]">Buddy</span>
        </h1>

        <p className="text-gray-400 mt-4">
          Never attend an event alone.
        </p>
      </div>

      <div className="w-full max-w-sm mt-16">
        <Button onClick={() => navigate("/onboarding")}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Splash;