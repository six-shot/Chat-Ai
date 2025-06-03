"use client";
import React, { useState } from "react";

import ChatWindow from "./ChatWindow";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";


const MessagingScreen = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const aiChats = [
    {
      id: "ai-assistant",
      name: "AI Assistant",
      lastMessage: "Hi! I can help you with payments and more.",
      time: "2:34 PM",
      unread: 1,
      avatar: "🤖",
    },
  ];

  if (selectedChat) {
    return (
      <ChatWindow chatId={selectedChat} onBack={() => setSelectedChat(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-3 sticky top-0 z-10  flex justify-between items-center">
        <div className="flex items-center gap-3">
          <MdOutlineKeyboardArrowLeft className="text-[#1c1b1b] text-[30px]" />
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-[36px] text-[#9598a3] " />
            <h6 className="text-[#1c1b1b] text-[16px] ">
              Testuser
            </h6>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <IoCallOutline className="text-[#1c1b1b] text-[22px]" />
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 py-6 space-y-3">
        {aiChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setSelectedChat(chat.id)}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:bg-white/90 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center space-x-4">
              
                <FaUserCircle className="text-[40px] text-[#9598a3] " />
            
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {chat.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagingScreen;
