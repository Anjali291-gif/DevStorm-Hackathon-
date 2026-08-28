'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Flame } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recipeSuggestion?: string;
}

interface AiKitchenAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const AiKitchenAssistant: React.FC<AiKitchenAssistantProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello Chef! 🍳 I am your FridgeWise AI Culinary Assistant. I monitor your inventory in real-time. What would you like to cook or rescue today?',
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'What can I cook with Baby Spinach & Eggs?',
    'How do I revive wilted leafy greens?',
    'Emergency 10-minute zero-waste dinner',
    'Can I freeze Greek yogurt & sourdough?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let aiReply = '';
      const q = query.toLowerCase();

      if (q.includes('spinach') && (q.includes('egg') || q.includes('omelette'))) {
        aiReply =
          '✨ Perfect zero-waste pairing! Since your Spinach expires tomorrow and you have farm eggs, make a 12-minute "Spinach & Herb Omelette". Sauté the spinach with minced garlic for 45s, then pour in 3 beaten eggs with butter. Saves ₹80 in ingredients!';
      } else if (q.includes('wilt') || q.includes('revive')) {
        aiReply =
          '🥬 Pro Kitchen Hack: Submerge wilted greens (spinach, cilantro, lettuce) in an ice water bath with a squeeze of lemon juice for 15-20 minutes. Cellular turgor pressure will restore crispy crunch!';
      } else if (q.includes('10-minute') || q.includes('quick') || q.includes('emergency')) {
        aiReply =
          '⚡ 10-Minute Rescue: "Garlic Butter Pan-Toasted Sourdough with Melted Cheese & Spinach". Toast day-old sourdough in olive oil, top with wilting spinach, tomatoes and paneer/cheese. Cover pan for 2 mins to melt!';
      } else if (q.includes('freeze') || q.includes('yogurt') || q.includes('cheese')) {
        aiReply =
          '❄️ Storage Masterclass: Sourdough freezes amazingly well sliced (keeps 3 months; pop directly in toaster). Greek yogurt can be frozen into high-protein yogurt bark with honey and berries!';
      } else {
        aiReply = `👨‍🍳 Great question! Looking at your current fridge stock (Spinach, Eggs, Yogurt, Tomatoes, Paneer, Sourdough), you have great options. You can whip up a creamy Palak Paneer, Sourdough French Toast, or a Shakshuka-style skillet with tomatoes and eggs!`;
      }

      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
          <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 pl-1 pr-4 py-1 rounded-full pill-gradient shadow-[0_0_30px_rgba(82,141,255,0.6)] flex items-center gap-2 group transition-transform hover:scale-110"
          aria-label="Open AI Chef Assistant"
        >
          <div className="relative w-11 h-11 flex-shrink-0">
            <Image
              src="/ai-chef-original.png"
              alt="AI Chef"
              width={44}
              height={44}
              className="w-11 h-11 object-contain drop-shadow-lg rounded-full"
            />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-tertiary rounded-full animate-ping" />
          </div>
          <span className="font-mono text-xs font-bold hidden sm:inline tracking-wider">
            ASK AI CHEF
          </span>
        </button>

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[600px] h-[80vh] rounded-3xl glass-panel-deep border border-secondary/30 shadow-2xl flex flex-col overflow-hidden glass-edge animate-in slide-in-from-bottom-6 duration-200">
          {/* Drawer Header */}
          <div className="p-4 border-b border-white/10 bg-surface-container/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-secondary/40 shadow-[0_0_12px_rgba(82,141,255,0.4)]">
                <Image
                  src="/ai-chef-original.png"
                  alt="AI Chef"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <span>FridgeWise AI Chef</span>
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                </h3>
                <span className="font-mono text-[10px] text-tertiary">Real-time Culinary Intelligence</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full glass-panel text-on-surface-variant hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 overflow-y-auto space-y-3.5 flex-grow font-body text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5 border border-secondary/40 shadow-[0_0_8px_rgba(82,141,255,0.3)]">
                    <Image
                      src="/ai-chef-original.png"
                      alt="AI"
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary-container text-white rounded-br-none shadow-md'
                      : 'glass-panel text-on-surface rounded-bl-none border border-white/10'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border border-secondary/40 shadow-[0_0_8px_rgba(82,141,255,0.3)]">
                  <Image
                    src="/ai-chef-original.png"
                    alt="AI"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain animate-bounce"
                  />
                </div>
                <div className="p-3 rounded-2xl glass-panel text-on-surface-variant rounded-bl-none flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>●</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>●</span>
                  <span className="ml-1 text-tertiary">Consulting kitchen intelligence...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 border-t border-white/10 bg-surface/40 flex gap-2 overflow-x-auto">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full glass-panel text-[10px] font-mono text-tertiary hover:bg-tertiary/20 hover:text-white whitespace-nowrap border border-tertiary/20 transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-white/10 bg-surface-container/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask for zero-waste ideas, recipe tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-on-surface-variant/50 text-xs font-sans focus:outline-none focus:border-secondary/60"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-2xl bg-secondary-container hover:bg-secondary text-white hover:text-background transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
