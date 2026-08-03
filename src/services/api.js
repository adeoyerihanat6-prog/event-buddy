import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://event-buddy-backend.onrender.com/api",
});

// Automatically attach JWT token to requests if user is logged in
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const user = JSON.parse(userInfo);
    if (user && user.token) {
      req.headers.authorization = `Bearer ${user.token}`;
      console.log("INTERCEPTOR: Attached token to header ->", req.headers.authorization);
    } else {
      console.error("INTERCEPTOR ERROR: 'userInfo' found, but NO 'token' property inside it!", user);
    }
  } else {
    console.error("INTERCEPTOR ERROR: No 'userInfo' found in localStorage!");
  }
  return req;
});

// Auth endpoints
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

// Event endpoints
export const fetchEvents = () => API.get("/events");
export const createEvent = (formData) => API.post("/events", formData);
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const joinEventById = (id) => API.post(`/events/${id}/join`);

// User Profile endpoints
export const fetchUserProfile = () => API.get("/users/profile");
export const updateUserProfile = (formData) => API.put("/users/profile", formData);
export const fetchUserById = (userId) => API.get(`/users/${userId}`);

// Friend & Buddy System endpoints
export const fetchAllUsers = () => API.get("/users");
export const sendFriendRequest = (userId) => API.post(`/users/request/${userId}`);
export const acceptFriendRequest = (userId) => API.post(`/users/accept/${userId}`);
export const fetchFriends = () => API.get("/users/friends");
export const fetchFriendRequests = () => API.get("/users/requests");

// Notifications endpoints
export const fetchNotifications = () => API.get("/notifications");
export const markNotificationsRead = () => API.put("/notifications/read");

// Chat endpoints
export const fetchChatMessages = (roomId) => API.get(`/chats/${roomId}`);
export const sendChatMessage = (roomId, text) => API.post(`/chats/${roomId}`, { text });
export const fetchPrivateChatMessages = (friendId) => API.get(`/chats/private/${friendId}`);
export const sendPrivateChatMessage = (friendId, text) => API.post(`/chats/private/${friendId}`, { text });
export const markChatAsRead = (chatId) => API.put(`/chats/read/${chatId}`);
export const markPrivateChatAsRead = (friendId) => API.put(`/chats/read/private/${friendId}`);

export default API;