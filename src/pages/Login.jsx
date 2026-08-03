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
      
      // Handle potential nested data wrappers from backend controllers safely
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

        // Handle potential nested data wrappers safely
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

      {errorMsg && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-lg text-center">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleLogin} className="mt-8 space-y-6">
        <div className="relative">
          <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input 
            type="email"
            placeholder="Email address"
            className="pl-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="pl-12 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

        <Button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <Divider />

      <SocialButton
        onClick={handleGoogleLogin}
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