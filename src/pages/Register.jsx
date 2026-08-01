import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";
import { motion } from "framer-motion";

import googleLogo from "../assets/google.svg";

import BackButton from "../components/ui/BackButton";
import AuthHeader from "../components/ui/AuthHeader";
import Button from "../components/ui/Button";
import Divider from "../components/ui/Divider";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import SocialButton from "../components/ui/SocialButton";

const Register = () => {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic frontend check
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    console.log("Registering:", { fullName, email, password });
    
    // TODO: Send data to your backend API, then navigate to onboarding
    navigate("/onboarding");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 flex flex-col"
    >
      {/* Back Button */}
      <BackButton />

      {/* Header */}
      <AuthHeader
        title="Create Account"
        subtitle="Join Event Buddy and start finding your people today."
      />

      {/* Error Message Alert */}
      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleRegister} className="mt-8 space-y-5">
        
        {/* Full Name */}
        <div className="relative">
          <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Full name"
            className="pl-12"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
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

        {/* Password */}
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password */}
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Create Account Button */}
        <Button type="submit">
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <Divider />

      {/* Google */}
      <SocialButton
        icon={<img src={googleLogo} alt="Google" className="w-5 h-5" />}
      >
        Continue with Google
      </SocialButton>

      {/* Footer */}
      <div className="mt-auto pt-10 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#FF6B6B] font-semibold hover:underline"
        >
          Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;