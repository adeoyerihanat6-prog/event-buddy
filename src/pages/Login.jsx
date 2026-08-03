import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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

import { loginUser } from "../services/api";
import { signInWithGoogle } from "../services/firebase";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const userData = response.data.data || response.data;
      
      if (!userData.token) {
        throw new Error("Authentication token missing from server response.");
      }
      
      localStorage.setItem("userInfo", JSON.stringify(userData));
      navigate("/home"); 
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMsg(error.response?.data?.error || error.message || "Failed to log in. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    try {
      const googleUser = await signInWithGoogle();
      
      if (googleUser) {
        const response = await API.post("/auth/google", {
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL,
        });

        const userData = response.data.data || response.data;

        if (!userData.token) {
          throw new Error("Authentication token missing from Google auth response.");
        }

        localStorage.setItem("userInfo", JSON.stringify(userData));
        navigate("/home");
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      setErrorMsg(error.response?.data?.error || error.message || "Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header Section (Locked) */}
      <div className="px-6 pt-6 shrink-0">
        <BackButton />
        <div className="mt-4">
          <AuthHeader
            title="Welcome Back"
            subtitle="Sign in to discover events, connect with people and create unforgettable memories."
          />
        </div>
      </div>

      {/* Form Content Area (Scrollable within boundaries) */}
      <div className="flex-1 overflow-y-auto px-6 py-4 overscroll-contain flex flex-col justify-center">
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 text-red-400 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input 
              type="email"
              placeholder="Email address"
              className="pl-12 py-3 text-xs bg-[#17171C] border-white/10 rounded-2xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-12 pr-12 py-3 text-xs bg-[#17171C] border-white/10 rounded-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 active:scale-95"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-[#FF6B6B] font-semibold active:opacity-80">
              Forgot Password?
            </button>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={loading} className="w-full py-3.5 rounded-2xl bg-[#FF6B6B] text-xs font-semibold active:scale-[0.98] transition">
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <Divider className="my-6" />

        <div className="active:scale-[0.98] transition">
          <SocialButton
            onClick={handleGoogleLogin}
            icon={<img src={googleLogo} alt="Google" className="w-4 h-4" />}
            className="py-3 text-xs rounded-2xl bg-[#17171C] border border-white/10"
          >
            Continue with Google
          </SocialButton>
        </div>
      </div>

      {/* Footer Link (Anchored at the bottom) */}
      <div className="p-6 text-center text-gray-400 text-xs shrink-0 bg-[#0B0B0F]">
        Don't have an account?{" "}
        <Link to="/register" className="text-[#FF6B6B] font-semibold hover:underline">
          Create Account
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;