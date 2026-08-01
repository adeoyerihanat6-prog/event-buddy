import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "framer-motion";

import googleLogo from "../assets/google.svg";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import BackButton from "../components/ui/BackButton";
import AuthHeader from "../components/ui/AuthHeader";
import Divider from "../components/ui/Divider";
import SocialButton from "../components/ui/SocialButton";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Add state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Send email and password to your backend API
    console.log("Logging in with:", email, password);
    navigate("/home"); // Redirect to home feed after login
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 flex flex-col"
    >
      <BackButton />
      
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to discover events, connect with people and create unforgettable memories."
      />

      {/* Wrap in a form to handle submission nicely */}
      <form onSubmit={handleLogin} className="mt-12 space-y-6">
        
        {/* Email */}
        <div className="relative">
          <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            type="email"
            placeholder="Email address"
            className="pl-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-12 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-sm text-[#FF6B6B]">
            Forgot Password?
          </button>
        </div>

        <Button type="submit">
          Sign In
        </Button>
      </form>

      <Divider />

      <SocialButton
        icon={<img src={googleLogo} alt="Google" className="w-5 h-5" />}
      >
        Continue with Google
      </SocialButton>

      <div className="mt-auto text-center text-gray-400 pt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#FF6B6B] font-semibold">
          Create Account
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;