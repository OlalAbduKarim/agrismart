import React, { useState, useRef, useEffect } from 'react';
import { getAIGuideResponseStream } from '../services/geminiService';
import type { ChatMessage } from '../types';

const trendingTips = [
    {
        icon: 'wb_sunny',
        title: 'Dry Season Prep',
        prompt: 'How should I prepare my farm for the upcoming dry season in Uganda?'
    },
    {
        icon: 'bug_report',
        title: 'Pest Control',
        prompt: 'What are common pests for maize right now and how do I control them?'
    },
    {
        icon: 'water_drop',
        title: 'Irrigation Tips',
        prompt: 'What are some water-saving irrigation techniques for vegetables?'
    },
    {
        icon: 'inventory_2',
        title: 'Harvest Storage',
        prompt: 'Tell me the best practices for storing harvested beans to prevent spoilage.'
    },
];

const AIGuideScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Hello! I'm your AI Farming Guide. Ask me anything about farming in Uganda, or upload a photo of a plant for diagnosis." }],
    },
  ]);
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessageAndStreamResponse = async (prompt: string, image?: File) => {
    setIsLoading(true);
    try {
      const stream = getAIGuideResponseStream(prompt, image);
      
      let firstChunk = true;
      for await (const chunk of stream) {
        if (firstChunk) {
          setIsLoading(false);
          setMessages((prev) => [...prev, { role: 'model', parts: [{ text: chunk }] }]);
          firstChunk = false;
        } else {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
              lastMessage.parts[0].text += chunk;
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
       const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: 'Sorry, something went wrong. Please check your connection and try again.' }],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: input }],
      image: imagePreview || undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    const currentImageFile = imageFile;

    setInput('');
    setImageFile(null);
    setImagePreview(null);
    
    await sendMessageAndStreamResponse(currentInput, currentImageFile || undefined);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: ChatMessage = { role: 'user', parts: [{ text: question }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    sendMessageAndStreamResponse(question);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-gray-200 bg-surface">
        <h1 className="font-poppins text-2xl text-text-primary">AI Guide</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-surface text-text-primary rounded-bl-none'}`}>
              {msg.image && <img src={msg.image} alt="upload preview" className="rounded-lg mb-2" />}
              <p className="whitespace-pre-wrap">{msg.parts.map(p => p.text).join('')}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="max-w-xs p-3 rounded-2xl bg-surface text-text-primary rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
           <div className="mb-4">
            <p className="text-sm font-semibold text-text-secondary mb-2">Seasonal Advice</p>
            <div className="grid grid-cols-2 gap-3">
                {trendingTips.map((tip) => (
                    <button key={tip.title} onClick={() => handleQuickQuestion(tip.prompt)} className="flex flex-col items-start p-3 bg-surface rounded-lg shadow-sm text-left hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary">
                        <span className="material-icons-outlined text-primary mb-1">{tip.icon}</span>
                        <p className="font-semibold text-text-primary text-sm">{tip.title}</p>
                    </button>
                ))}
            </div>
        </div>
        <div>
            <p className="text-sm font-semibold text-text-secondary mb-2">Or ask something else:</p>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => handleQuickQuestion("What should I plant this month?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">What to plant now?</button>
                <button onClick={() => handleQuickQuestion("How to treat maize rust?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">Treat maize rust</button>
                <button onClick={() => handleQuickQuestion("Best practices for poultry farming?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">Poultry tips</button>
            </div>
        </div>
        </div>
      )}

      <div className="p-4 border-t border-gray-200 bg-surface">
        {imagePreview && (
          <div className="relative w-24 h-24 mb-2">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            >&times;</button>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-text-secondary hover:text-primary transition-colors">
            <span className="material-icons-outlined">attach_file</span>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button onClick={handleSend} disabled={isLoading} className="p-3 bg-primary text-white rounded-full disabled:bg-gray-400">
            <span className="material-icons-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIGuideScreen;