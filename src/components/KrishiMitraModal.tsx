import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { X, Sparkles, Send, Mic, MicOff, Volume2, VolumeX, Bot, User as UserIcon, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  suggestions?: string[];
  actionLink?: { label: string; viewId: string };
}

export const KrishiMitraModal: React.FC<{ onNavigate?: (view: string) => void }> = ({ onNavigate }) => {
  const { isKrishiMitraOpen, setIsKrishiMitraOpen } = useStore();
  const { speak, isSpeaking, stopSpeaking } = useAccessibility();

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste! I am Krishi Mitra (कृषि मित्र), your 24/7 AI Agronomy & Digital Ecosystem Advisor. How can I assist your farm today?',
      time: 'Just now',
      suggestions: [
        'How to cure tomato yellow leaf curl organically?',
        'How do I prepare Jeevamrut bio-fertilizer?',
        'Which APMC is giving highest price for Wheat today?',
        'Am I eligible for PM-KUSUM 60% Solar Pump subsidy?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isKrishiMitraOpen) return null;

  const quickResponses: Record<string, { answer: string; action?: { label: string; viewId: string } }> = {
    tomato: {
      answer: `🍅 **Organic Treatment for Tomato Leaf Curl & Early Blight:**
1. **Neem Oil Spray:** Dilute 5ml cold-pressed Neem Oil + 2ml liquid soap in 1 litre water. Spray both upper and lower leaf surfaces during cool evening hours.
2. **Sour Buttermilk & Hing Spray:** Mix 1L fermented sour buttermilk (Khatta Chhachh) with 10L water and 20g asafoetida (Hing). Spray every 7 days as a potent natural fungicide.
3. **Soil Care:** Avoid overhead sprinkler wetting; maintain drip irrigation at the root zone to suppress fungal spores.`,
      action: { label: 'Explore 16L Battery Sprayers in Tools', viewId: 'equipment' }
    },
    jeevamrut: {
      answer: `🌱 **Standard 200-Litre Jeevamrut (जीवामृत) Recipe:**
- **Ingredients:** 10 kg Desi Cow Dung, 5-10 L Desi Cow Urine, 2 kg Jaggery (Gur), 2 kg Gram Flour (Besan), and 1 handful of virgin soil from under a banyan tree or field bund.
- **Preparation:** Mix in a 200L plastic drum filled with clean water. Stir clockwise with a wooden stick twice daily for 4-7 days in shade.
- **Application:** Apply 200L per acre through drip irrigation or flooding during irrigation every 15 days. Restores billions of beneficial soil microbes!`,
      action: { label: 'Learn More in PKVY Organic Scheme', viewId: 'schemes' }
    },
    mandi: {
      answer: `📊 **Live Mandi Advisory & Price Outlook:**
- **Wheat (Sharbati):** Currently trading strong at Indore APMC (₹3,100 - ₹3,400/qtl, ▲ +₹80). Steady flour mill procurement is supporting prices.
- **Desi Tomatoes:** Nashik APMC is seeing high demand at ₹3,200/qtl (₹32/kg). Peak arrivals expected next week, so harvesting and direct platform dispatch this weekend is optimal!`,
      action: { label: 'View Full Live APMC Ticker', viewId: 'home' }
    },
    kusum: {
      answer: `☀️ **PM-KUSUM 60% Solar Pump Eligibility:**
- **Subsidy Breakdown:** 30% Central Govt + 30% State Govt = **60% total financial subsidy**!
- **Eligibility:** Farmers with verified land ownership (7/12 extract) and an open well or borewell.
- **Capacity:** Available for 3 HP, 5 HP, and 7.5 HP standalone solar pump systems.
- **How to Apply:** Apply directly on your state renewable agency portal (MahaUrja/UPNEDA). 5-year warranty included.`,
      action: { label: 'Open PM-KUSUM Scheme Details', viewId: 'schemes' }
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate intelligent AI Agronomy response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = `Dhanyawad for asking about "${query}". In organic agricultural ecosystems, balanced soil biological health, timely irrigation scheduling, and zero chemical toxicity yield the highest harvest value. Would you like me to connect you with our certified agronomists or explore relevant government subsidies?`;
      let action: { label: string; viewId: string } | undefined;

      if (lower.includes('tomato') || lower.includes('leaf') || lower.includes('pest') || lower.includes('blight') || lower.includes('insect')) {
        replyText = quickResponses.tomato.answer;
        action = quickResponses.tomato.action;
      } else if (lower.includes('jeevamrut') || lower.includes('organic') || lower.includes('fertilizer') || lower.includes('compost')) {
        replyText = quickResponses.jeevamrut.answer;
        action = quickResponses.jeevamrut.action;
      } else if (lower.includes('price') || lower.includes('mandi') || lower.includes('apmc') || lower.includes('rate') || lower.includes('sell')) {
        replyText = quickResponses.mandi.answer;
        action = quickResponses.mandi.action;
      } else if (lower.includes('kusum') || lower.includes('solar') || lower.includes('pump') || lower.includes('scheme') || lower.includes('subsidy')) {
        replyText = quickResponses.kusum.answer;
        action = quickResponses.kusum.action;
      }

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: 'Just now',
        actionLink: action
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  const toggleMic = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate speech recognition result after 2.5s
      setTimeout(() => {
        setIsRecording(false);
        setInput('What are the best organic fertilizers for tomato fruit growth?');
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-2xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold">Krishi Mitra (कृषि मित्र)</h3>
                <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                  AI Agronomist
                </span>
              </div>
              <p className="text-[11px] text-gray-200">Instant Crop Diagnostics, Organic Recipes & Scheme Advisory</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setIsKrishiMitraOpen(false);
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  m.sender === 'ai' ? 'bg-[#1B5E3B]' : 'bg-amber-600'
                }`}
              >
                {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                  m.sender === 'ai'
                    ? 'bg-white border border-[#E5E0D5] text-[#2D3A26] shadow-xs'
                    : 'bg-[#1B5E3B] text-white shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Optional Action Button */}
                {m.actionLink && (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setIsKrishiMitraOpen(false);
                        onNavigate?.(m.actionLink!.viewId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#1B5E3B] font-bold text-xs transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{m.actionLink.label} →</span>
                    </button>
                  </div>
                )}

                {/* Suggestions Pills */}
                {m.suggestions && (
                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Common Queries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.suggestions.map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(s)}
                          className="text-[11px] text-left px-2.5 py-1 rounded-xl bg-[#FAF9F6] hover:bg-[#EBF1E8] border border-[#E5E0D5] text-[#2D3A26] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TTS Speaker icon for AI messages */}
                {m.sender === 'ai' && (
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => (isSpeaking ? stopSpeaking() : speak(m.text.replace(/[*#]/g, '')))}
                      className="p-1 text-gray-400 hover:text-emerald-700 transition-colors"
                      title={isSpeaking ? 'Stop speaking' : 'Read aloud in Hindi/English'}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E5E0D5] space-y-2">
          {isRecording && (
            <div className="flex items-center justify-center gap-2 py-1 text-xs text-rose-600 font-bold animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>Listening to voice query (Speak in English, Hindi, or Marathi)...</span>
            </div>
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2.5 rounded-xl border transition-colors ${
                isRecording
                  ? 'bg-rose-100 border-rose-400 text-rose-600 animate-bounce'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
              title="Voice Input (Speech-to-Text)"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder="Ask Krishi Mitra about crops, pest cure, Mandi rates..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26] focus:outline-emerald-600"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white disabled:opacity-40 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
