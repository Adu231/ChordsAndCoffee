import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const PRESETS = [
  { label: 'How to book a gig?', query: 'how to book a gig' },
  { label: 'How to withdraw earnings?', query: 'how to withdraw' },
  { label: 'Are there course fees?', query: 'course fees' },
  { label: 'How to reserve tickets?', query: 'reserve tickets' },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your Chords & Coffee AI Assistant. ☕✨ How can I help you navigate the platform today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Hide the chatbot on the payment page
  if (location.pathname === '/confirm-payment') {
    return null;
  }

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response based on keyword matching
    setTimeout(() => {
      let aiText = "I'm here to help, but I didn't quite catch that. Could you try rephrasing or ask about booking, course fees, ticket reservations, or withdrawals?";
      const lower = textToSend.toLowerCase();

      if (lower.includes('hello') || lower.includes('hi ') || lower.includes('hey')) {
        aiText = "Hi there! Welcome to Chords & Coffee. How can I assist you with your music journey today? 🎙️";
      } else if (lower.includes('book') || lower.includes('gig') || lower.includes('performance')) {
        aiText = "To book performances as a Musician, go to the 'Book Performances' tab in your Musician Dashboard. For Venues, you can invite artists from the 'Book Artists' tab in the Café Owner Panel! 📅";
      } else if (lower.includes('withdraw') || lower.includes('payout') || lower.includes('earning') || lower.includes('money')) {
        aiText = "You can withdraw your accumulated earnings from your dashboard! For Musicians, head to the 'Monetize Music' section. For Teachers, go to 'Revenue Split'. Verify your account details in the payout modal to initiate transfer. 💰";
      } else if (lower.includes('fee') || lower.includes('price') || lower.includes('schedule') || lower.includes('cost')) {
        aiText = "In the Learn Music section, click on 'View Details' for any course/workshop to view complete schedule details, duration, pricing, and description before enrolling! 🎓";
      } else if (lower.includes('ticket') || lower.includes('reserve') || lower.includes('event')) {
        aiText = "To reserve tickets, go to the 'Attend Events' section in the Music Lover panel, select your event, fill in the reservation details, and confirm to proceed to checkout! 🎟️";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiText,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* FAB Launcher Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg gradient-brand text-white hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none"
        )}
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in spin-in-90 duration-300" />
        ) : (
          <div className="relative">
            <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border border-white"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-[360px] h-[480px] bg-card/95 border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 text-left">
          {/* Header */}
          <div className="gradient-brand p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Chords AI Assistant
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-white/70">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm animate-in fade-in zoom-in-95 duration-200",
                  msg.sender === 'user'
                    ? "bg-coffee text-white ml-auto rounded-tr-none"
                    : "bg-card border border-border text-foreground mr-auto rounded-tl-none"
                )}
              >
                <p>{msg.text}</p>
                <span
                  className={cn(
                    "text-[9px] mt-1 block text-right",
                    msg.sender === 'user' ? "text-white/60" : "text-muted-foreground"
                  )}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="bg-card border border-border text-foreground mr-auto rounded-2xl rounded-tl-none p-3 text-xs shadow-sm max-w-[80%] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Buttons / Quick Prompt Chips */}
          <div className="px-4 py-2 bg-muted/5 border-t border-border flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handleSend(preset.query)}
                className="px-2.5 py-1.5 bg-card border border-border hover:border-coffee/40 hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-semibold rounded-full transition-all flex items-center gap-1"
              >
                {preset.label}
                <ArrowRight className="w-2.5 h-2.5 text-coffee" />
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-border bg-card flex gap-2">
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend(input);
                }
              }}
              className="flex-1 px-3 py-2 border border-border rounded-xl bg-muted/20 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-coffee/50"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 gradient-brand text-white rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md flex items-center justify-center focus:outline-none"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
