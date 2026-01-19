import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatWindow from "./Chat/ChatWindow";
import { getOrCreateChat } from "../services/chatServices";
import "../../src/chat.css";

// ✅ USE SAME BACKEND URL AS API (NO /api)
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

export default function ChatPopup({ productId, otherUserId, onClose }) {
  const [chat, setChat] = useState(null);
  const [socket, setSocket] = useState(null);

  // ✅ STOP executing if data not available
  if (!productId || !otherUserId) return null;

  useEffect(() => {
    const s = io(SOCKET_URL, {
      withCredentials: true
    });
    setSocket(s);

    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const init = async () => {
      try {
        const data = await getOrCreateChat(productId, otherUserId);

        if (data.chat) {
          setChat(data.chat);
          socket.emit("joinRoom", data.chat._id);
        }
      } catch (err) {
        console.error("Chat init error:", err);
      }
    };

    init();
  }, [socket, productId, otherUserId]);

  if (!chat) return null;

  return (
    <div className="chat-popup-backdrop">
      <div className="chat-popup-box">
        <ChatWindow chat={chat} onClose={onClose} socket={socket} />
      </div>
    </div>
  );
}
