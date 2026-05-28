import { io } from "socket.io-client";

let socket;

/**
 * Initialize socket connection (singleton)
 */
export const initSocket = () => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }

  return socket;
};

/**
 * Join a campaign room
 */
export const joinCampaignRoom = (campaignId) => {
  const socket = initSocket();
  if (!socket) return;

  socket.emit("join-campaign", campaignId);
};

/**
 * Listen for new donations (prevents duplicate listeners)
 */
export const listenToDonations = (callback) => {
  const socket = initSocket();
  if (!socket) return;

  socket.off("new-donation"); // important fix (prevents duplicates)
  socket.on("new-donation", callback);
};

/**
 * Listen for campaign updates (optional extension)
 */
export const listenToCampaignUpdates = (callback) => {
  const socket = initSocket();
  if (!socket) return;

  socket.off("campaign-update");
  socket.on("campaign-update", callback);
};

/**
 * Disconnect socket (logout / cleanup)
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};