"use client";
import React, { useState, useEffect, useRef } from "react";

import PaymentModal from "./PaymentModal";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaDollarSign, FaUserCircle } from "react-icons/fa";
import { VscSend } from "react-icons/vsc";

interface ChatWindowProps {
  chatId: string;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
  showPaymentButton?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial AI greeting
    const initialMessage: Message = {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isAI: true,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(inputText);
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();

    if (
      lowerInput.includes("payment") ||
      lowerInput.includes("pay") ||
      lowerInput.includes("money")
    ) {
      return {
        id: (Date.now() + 1).toString(),
        text: "I can help you with payments! Would you like to make a payment?",
        isAI: true,
        timestamp: new Date(),
        showPaymentButton: true,
      };
    }

    return {
      id: (Date.now() + 1).toString(),
      text: "That's interesting! I'm here to help with various tasks. You can ask me about payments, or anything else you need assistance with.",
      isAI: true,
      timestamp: new Date(),
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[url('/mask.png')] bg-cover bg-center">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 w-full z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center transition-colors"
          >
            <MdOutlineKeyboardArrowLeft className="text-[#1c1b1b] text-[30px]" />
          </button>
          <FaUserCircle className="text-[40px] text-[#9598a3] " />
          <div>
            <h2 className="font-semibold text-gray-900">AI Assistant</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        <div className="flex justify-center flex-col items-center mb-4">
          <span className="text-xs font-medium text-gray-600 py-2 px-1 bg-[#fefdfd] rounded">
            Today
          </span>
          <div className="bg-yellow-100 rounded-2xl px-4 py-3 max-w-xs">
            <div className="flex items-center space-x-2 mb-2"></div>
            <p className="text-xs text-gray-700 text-center">
              🔒 Messages and calls are end-to-end encrypted. Only people in
              this chat can read, listen to, or share them.{" "}
              <span className="font-medium">Learn more</span>
            </p>
          </div>
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
          >
            <div className="max-w-[80%]">
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.isAI
                    ? "bg-white/80 border border-gray-200/50 text-gray-800"
                    : "bg-black text-white"
                } shadow-sm`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p
                className={`text-xs text-gray-500 mt-1 ${
                  message.isAI ? "text-left" : "text-right"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
              {message.showPaymentButton && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <FaDollarSign />
                  <span>Make Payment</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/80 border border-gray-200/50 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center "
          >
            <VscSend className="text-white text-[20px]" />
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
};

export default ChatWindow;
