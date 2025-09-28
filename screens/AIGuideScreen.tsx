
import React, { useState, useRef, useEffect } from 'react';
import { getAIGuideResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

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

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: input }],
      image: imagePreview || undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    setImageFile(null);
    setImagePreview(null);
    
    try {
      const responseText = await getAIGuideResponse(input, imageFile || undefined);
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: responseText }],
      };
      setMessages((prev) => [...prev, modelMessage]);
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

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Automatically trigger send for quick questions
    const userMessage: ChatMessage = { role: 'user', parts: [{ text: question }] };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    
    getAIGuideResponse(question).then(responseText => {
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
      setMessages(prev => [...prev, modelMessage]);
    }).catch(error => {
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: 'Sorry, an error occurred.' }] };
      setMessages(prev => [...prev, errorMessage]);
    }).finally(() => setIsLoading(false));
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
        <div className="p-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-text-secondary mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
                <button onClick={() => handleQuickQuestion("What should I plant this month?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">What to plant now?</button>
                <button onClick={() => handleQuickQuestion("How to treat maize rust?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">Treat maize rust</button>
                <button onClick={() => handleQuickQuestion("Best practices for poultry farming?")} className="px-3 py-1.5 bg-secondary/30 text-secondary-dark rounded-full text-sm">Poultry tips</button>
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
