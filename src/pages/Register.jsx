import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";

import googleLogo from "../assets/google.svg";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";
import AuthHeader from "../components/ui/AuthHeader";
import Button from "../components/ui/Button";
import Divider from "../components/ui/Divider";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import SocialButton from "../components/ui/SocialButton";

// Import your API registration service and Firebase auth
import { registerUser } from "../services/api";
import { signInWithGoogle } from "../services/firebase";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend check for password matching
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Send data to backend API (mapping fullName to name as expected by User model)
      const { data } = await registerUser({ 
        name: fullName, 
        email, 
        password 
      });

      // Save user session & token to localStorage securely for subsequent API requests
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Navigate to onboarding after successful account creation
      navigate("/onboarding");
    } catch (err) {
      // Catch backend error response or fallback
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      // 1. Trigger Firebase Google Popup sign-in
      const googleUser = await signInWithGoogle();
      
      if (googleUser) {
        // 2. Send Google profile data to backend API to create/login user and get app JWT token
        const { data } = await API.post("/auth/google", {
          name: googleUser.displayName,
          email: googleUser.email,
          avatar: googleUser.photoURL,
        });

        // 3. Save user session & token locally
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // 4. Navigate to onboarding
        navigate("/onboarding");
      }
    } catch (err) {
      console.error("Google Auth Error:", err);
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <AppLayout
      noBottomNav
      header={
        <div>
          <BackButton />
          <div className="mt-3">
            <AuthHeader
              title="Create Account"
              subtitle="Join Event Buddy and start finding your people today."
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col justify-between min-h-[calc(100%-80px)] py-2">
        <div className="space-y-3.5">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-3">
            {/* Full Name */}
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Full name"
                className="pl-11 py-2.5 text-xs bg-[#17171C] border-white/10 rounded-xl select-text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
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

            {/* Password */}
            <PasswordInput
              placeholder="Password"
              className="py-2.5 text-xs bg-[#17171C] border-white/10 rounded-xl select-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Confirm Password */}
            <PasswordInput
              placeholder="Confirm Password"
              className="py-2.5 text-xs bg-[#17171C] border-white/10 rounded-xl select-text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {/* Create Account Button */}
            <div className="pt-1">
              <Button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-[#FF6B6B] text-xs font-semibold active:scale-[0.98] transition shadow-md shadow-[#FF6B6B]/20">
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <Divider className="my-4" />

          {/* Google */}
          <div className="active:scale-[0.98] transition">
            <SocialButton
              onClick={handleGoogleRegister}
              icon={<img src={googleLogo} alt="Google" className="w-4 h-4" />}
              className="py-2.5 text-xs rounded-xl bg-[#17171C] border border-white/10"
            >
              Continue with Google
            </SocialButton>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 pb-2 text-center text-gray-400 text-xs">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#FF6B6B] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Register;