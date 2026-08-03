import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import googleLogo from "../assets/google.svg";

import AppLayout from "../components/ui/AppLayout";
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
    <AppLayout
      noBottomNav
      header={
        <div>
          <BackButton />
          <div className="mt-3.5">
            <AuthHeader
              title="Welcome Back"
              subtitle="Sign in to discover events, connect with people and create unforgettable memories."
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col justify-between min-h-[calc(100%-80px)] py-2">
        <div className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                type="email"
                placeholder="Email address"
                className="pl-11 py-2.5 text-xs bg-[#17171C] border-white/10 rounded-xl select-text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-11 pr-11 py-2.5 text-xs bg-[#17171C] border-white/10 rounded-xl select-text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 active:scale-95"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex justify-end pt-0.5">
              <button type="button" className="text-[11px] text-[#FF6B6B] font-semibold active:opacity-80">
                Forgot Password?
              </button>
            </div>

            <div className="pt-1">
              <Button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#FF6B6B] text-xs font-semibold active:scale-[0.98] transition shadow-md shadow-[#FF6B6B]/20">
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>

          <Divider className="my-5" />

          <div className="active:scale-[0.98] transition">
            <SocialButton
              onClick={handleGoogleLogin}
              icon={<img src={googleLogo} alt="Google" className="w-4 h-4" />}
              className="py-2.5 text-xs rounded-xl bg-[#17171C] border border-white/10"
            >
              Continue with Google
            </SocialButton>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-8 pb-4 text-center text-gray-400 text-xs">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#FF6B6B] font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;