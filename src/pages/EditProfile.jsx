import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Loader2, Save, Trash2 } from "lucide-react";
import axios from "axios";

import AppLayout from "../components/ui/AppLayout";
import BackButton from "../components/ui/BackButton";

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
      <div className="h-screen w-screen fixed inset-0 bg-[#0B0B0F] text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-[#FF6B6B]" size={28} />
      </div>
    );
  }

  return (
    <AppLayout
      header={
        <div className="flex items-center justify-between">
          <BackButton />
          <h1 className="text-sm font-bold">Edit Profile</h1>
          <div className="w-8" />
        </div>
      }
    >
      <div className="space-y-5">
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload & Actions */}
          <div className="flex flex-col items-center mb-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            <div className="relative w-24 h-24 mb-2.5 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="w-full h-full rounded-full object-cover border-2 border-[#FF6B6B]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-800 border-2 border-[#FF6B6B] flex items-center justify-center text-gray-400">
                  <Camera size={26} />
                </div>
              )}
              
              {/* Hover overlay indicator */}
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <Camera size={20} className="text-white" />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] text-[#FF6B6B] font-semibold hover:underline"
              >
                Upload New Photo
              </button>
              {formData.avatar && (
                <>
                  <span className="text-gray-600">•</span>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-[11px] text-red-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={11} /> Remove
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] select-text"
            />
          </div>

          {/* Age & Location Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] select-text"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lagos, Nigeria"
                className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] select-text"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell people a bit about yourself..."
              className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] resize-none select-text"
            />
          </div>

          {/* Vibe & Intent Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Vibe Tag</label>
              <input
                type="text"
                name="vibe"
                value={formData.vibe}
                onChange={handleChange}
                placeholder="e.g. Introvert friendly 🌙"
                className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] select-text"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 block font-semibold">Intent</label>
              <input
                type="text"
                name="intent"
                value={formData.intent}
                onChange={handleChange}
                placeholder="e.g. Just looking for company"
                className="w-full bg-[#17171C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B6B] select-text"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-[#FF6B6B] text-white font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 shadow-md shadow-[#FF6B6B]/20 active:scale-95"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditProfile;