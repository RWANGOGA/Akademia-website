"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  User,
  MessageSquare,
  X,
  Minimize2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

type ChatAction = {
  type: "whatsapp" | "call" | "email" | string;
  label: string;
  url: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

function ActionIcon({ type }: { type: string }) {
  if (type === "whatsapp") return <MessageCircle className="w-3.5 h-3.5" />;
  if (type === "call") return <Phone className="w-3.5 h-3.5" />;
  if (type === "email") return <Mail className="w-3.5 h-3.5" />;
  return null;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! Welcome to DYNA WISDOM. How can our team help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [projectKey, setProjectKey] = useState("akademia");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  // Lock background scroll while the mobile sheet is open
  useEffect(() => {
    if (isOpen && typeof window !== "undefined" && window.innerWidth < 640) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Try Google Chrome.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Play audio response via TTS backend endpoint.
  const playAudio = async (text: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        new Audio(audioUrl).play();
      }
    } catch (err) {
      console.error("TTS playback failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsThinking(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, project_key: projectKey })
      });
      const data = await res.json();
      const botResponse: string = data.response || "I'm sorry, I couldn't process that.";
      const botActions: ChatAction[] = Array.isArray(data.actions) ? data.actions : [];

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse, actions: botActions }
      ]);
      playAudio(botResponse);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error with DYNA WISDOM core server." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <>
      {/* Dimmed backdrop — mobile only, tap to close */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

        {/* Chat Container: bottom-sheet on mobile, floating window on desktop */}
        {isOpen && (
          <div
            className="
              fixed sm:static
              inset-x-0 bottom-0 sm:inset-auto
              w-full sm:w-[380px] md:w-[420px]
              h-[85vh] sm:h-[580px]
              bg-white text-gray-900 shadow-2xl
              rounded-t-3xl sm:rounded-2xl
              border border-gray-200
              flex flex-col overflow-hidden
              sm:mb-4
              transition-all animate-in fade-in slide-in-from-bottom-5
              z-50
            "
          >
            {/* Drag handle — mobile only, signals "this is a sheet, swipe/tap to dismiss" */}
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-white shrink-0">
              <div className="w-10 h-1.5 rounded-full bg-gray-300" />
            </div>

            {/* Header & Project Selector */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-b border-gray-200 shrink-0">
              <div className="flex items-center space-x-2 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping absolute" />
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full relative" />
                </div>
                <h2 className="text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent truncate">
                  DYNA WISDOM Assistant
                </h2>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <select
                  value={projectKey}
                  onChange={(e) => setProjectKey(e.target.value)}
                  className="bg-white border border-gray-300 text-[10px] sm:text-xs rounded-md px-1.5 sm:px-2 py-1 text-gray-700 focus:outline-none focus:border-indigo-500 max-w-[92px] sm:max-w-none"
                >
                  <option value="akademia">Core Portal</option>
                  <option value="ai-dojo">AI Dojo</option>
                  <option value="makerere">Makerere API</option>
                  <option value="ai-pod">AI-POD Reports</option>
                  <option value="ai-avatar">AI Avatar</option>
                  <option value="world">World Workspace</option>
                  <option value="ai-recruiter">UICT Recruiter</option>
                </select>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-700 p-1.5 sm:p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 sm:hidden" />
                  <Minimize2 className="w-4 h-4 hidden sm:block" />
                </button>
              </div>
            </div>

            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-white">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 sm:gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500" />
                    </div>
                  )}

                  <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%] sm:max-w-[80%]`}>
                    <div
                      className={`rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-gray-50 border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Action buttons */}
                    {msg.role === "assistant" && msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                        {msg.actions.map((action, actionIndex) => (
                          /* FIXED: Added the missing <a tag here */
                          <a
                            key={actionIndex}
                            href={action.url}
                            target={action.type === "whatsapp" ? "_blank" : undefined}
                            rel={action.type === "whatsapp" ? "noopener noreferrer" : undefined}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-colors shadow-sm ${
                              action.type === "whatsapp"
                                ? "bg-[#25D366] hover:bg-[#1ebe5b] text-white"
                                : action.type === "call"
                                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                            }`}
                          >
                            <ActionIcon type={action.type} />
                            {action.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex items-center space-x-2 text-indigo-500 animate-pulse bg-indigo-50 border border-indigo-100 px-3 py-2 rounded-2xl w-fit">
                  <Sparkles className="w-4 h-4 animate-spin text-indigo-500" />
                  <span className="text-xs font-medium tracking-wide">Synthesizing response...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar & Mic */}
            <form
              onSubmit={handleSubmit}
              className="p-2.5 sm:p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
              style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
            >
              <button
                type="button"
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-500 border border-gray-200"
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening actively..." : "Type a message..."}
                className="flex-1 min-w-0 bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl font-medium transition-all flex items-center justify-center shadow-lg shadow-indigo-600/20 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        {/* Floating Launcher Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-indigo-400/30 hover:scale-105 mb-4 mr-4 sm:mb-0 sm:mr-0"
          aria-label="Toggle chat widget"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
        </button>

      </div>
    </>
  );
}