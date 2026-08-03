import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Loader2, Save, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

// Automatically uses Localhost during development and Render when live on Vercel
const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000"
  : "https://event-buddy-backend.onrender.com";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    bio: "",
    vibe: "",
    intent: "",
    avatar: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch current user details on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        const { data } = await axios.get(`${API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setFormData({
          name: data.name || "",
          age: data.age || "",
          location: data.location || "",
          bio: data.bio || "",
          vibe: data.vibe || "",
          intent: data.intent || "",
          avatar: data.avatar || ""
        });
      } catch (err) {
        console.error("Failed to load user data", err);
        setError("Could not load your profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle direct device file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove profile picture
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, avatar: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      // Send update request to backend user route
      const { data } = await axios.put(
        `${API_URL}/api/users/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Update local storage name and avatar
      userInfo.name = data.name;
      userInfo.avatar = data.avatar;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Redirect back to profile page
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.response?.data?.error || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF6B6B]" size={32} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0B0B0F] text-white px-6 py-8 pb-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#17171C] border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <div className="w-10" />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Picture Upload & Actions */}
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />

          <div className="relative w-28 h-28 mb-3 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Avatar Preview"
                className="w-full h-full rounded-full object-cover border-2 border-[#FF6B6B]"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-800 border-2 border-[#FF6B6B] flex items-center justify-center text-gray-400">
                <Camera size={32} />
              </div>
            )}
            
            {/* Hover overlay indicator */}
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera size={24} className="text-white" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-[#FF6B6B] font-semibold hover:underline"
            >
              Upload New Photo
            </button>
            {formData.avatar && (
              <>
                <span className="text-gray-600">•</span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-xs text-red-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
          />
        </div>

        {/* Age & Location Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Lagos, Nigeria"
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Bio</label>
          <textarea
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell people a bit about yourself..."
            className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B] resize-none"
          />
        </div>

        {/* Vibe & Intent Tags */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Vibe Tag</label>
            <input
              type="text"
              name="vibe"
              value={formData.vibe}
              onChange={handleChange}
              placeholder="e.g. Introvert friendly 🌙"
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Intent</label>
            <input
              type="text"
              name="intent"
              value={formData.intent}
              onChange={handleChange}
              placeholder="e.g. Just looking for company"
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B6B]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full mt-6 py-4 rounded-2xl bg-[#FF6B6B] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default EditProfile;