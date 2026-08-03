import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash";
import Onboarding from "../pages/Onboarding";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import CreateEvent from "../pages/CreateEvent";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import ChatInbox from "../pages/ChatInbox"; 
import Chat from "../pages/Chat";             
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import MyEvents from "../pages/MyEvents";
import Safety from "../pages/Safety";
import Discover from "../pages/Discover";
import Friends from "../pages/Friends";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (Requires active session) */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
        
        {/* Chat Inbox & Room Routes */}
        <Route path="/chat" element={<ProtectedRoute><ChatInbox /></ProtectedRoute>} />
        <Route path="/chat/general" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat/event/:eventId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/chat/private/:friendId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        
        {/* Profile Routes (Fixed to support viewing other user profiles) */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
        <Route path="/safety" element={<ProtectedRoute><Safety /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
        
        {/* Fallback Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;