import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  Tag,
  ChevronDown,
  ShoppingBag,
  Zap,
  Flame,
  Check
} from 'lucide-react';
import { ProductCardItem } from './ProductCardItem';
import { LeadCaptureForm } from './LeadCaptureForm';

export const SalesWidget: React.FC = () => {
  const {
    isWidgetOpen,
    setIsWidgetOpen,
    chatMessages,
    sendChatMessage,
    activeProactiveCallout,
    setActiveProactiveCallout,
    isAiTyping,
    businessProfile,
    trackVisitorEvent
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isWidgetOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isWidgetOpen, isAiTyping]);

  const handleOpenWidget = () => {
    setIsWidgetOpen(true);
    setActiveProactiveCallout(null);
    trackVisitorEvent('chat_open', 'Opened AI Sales Widget');
  };

  const handleCloseWidget = () => {
    setIsWidgetOpen(false);
  };

  const handleProactiveEngage = (replyText?: string) => {
    setIsWidgetOpen(true);
    setActiveProactiveCallout(null);
    if (replyText) {
      sendChatMessage(replyText);
    } else {
      trackVisitorEvent('chat_open', 'Engaged with proactive intervention popup');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const msg = inputVal;
    setInputVal('');
    sendChatMessage(msg);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto">
      {/* Proactive Intervention Bubble Callout */}
      {!isWidgetOpen && activeProactiveCallout && (
        <div className="mb-3 max-w-sm w-[90vw] sm:w-80 p-4 rounded-3xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl backdrop-blur-xl animate-slide-up space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-white">
                {businessProfile.name} Fit Specialist
              </span>
            </div>
            <button
              onClick={() => setActiveProactiveCallout(null)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "{activeProactiveCallout.message}"
          </p>

          {/* Quick Replies */}
          {activeProactiveCallout.quickReplies && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeProactiveCallout.quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleProactiveEngage(reply)}
                  className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 text-[11px] font-medium border border-slate-700 transition-all text-left"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => handleProactiveEngage()}
            className="w-full py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 text-center"
          >
            Chat with AI Specialist →
          </button>
        </div>
      )}

      {/* Full Chat Drawer Window */}
      {isWidgetOpen ? (
        <div className="w-[94vw] sm:w-96 h-[540px] max-h-[85vh] rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-xs font-bold text-white">{businessProfile.name} AI Sales</h3>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Contextual Footwear & Sizing Advisor
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleCloseWidget}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                onClick={handleCloseWidget}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 animate-fade-in`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                {/* Structured Product Cards Attachment */}
                {msg.productCards && msg.productCards.length > 0 && (
                  <div className="space-y-2 pt-1 w-full">
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Recommended Matches:
                    </div>
                    <div className="flex flex-col gap-2">
                      {msg.productCards.map(p => (
                        <ProductCardItem key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Lead Form */}
                {msg.showLeadForm && (
                  <div className="pt-1 w-full">
                    <LeadCaptureForm />
                  </div>
                )}

                {/* Quick Reply Chips */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendChatMessage(reply)}
                        className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] border border-slate-700 transition-all text-left"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isAiTyping && (
              <div className="flex items-center space-x-1.5 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 w-20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about size, cushioning, returns..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Launcher Bubble */
        <button
          onClick={handleOpenWidget}
          className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all group ring-2 ring-white/20"
          aria-label="Open AI Sales Assistant"
        >
          <Bot className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping"></span>
        </button>
      )}
    </div>
  );
};
