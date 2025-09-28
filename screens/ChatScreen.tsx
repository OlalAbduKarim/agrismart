
import React, { useState, useEffect, useRef } from 'react';
import type { DirectMessage } from '../types';

interface ChatScreenProps {
  userName: string;
  userPhoto: string;
  listingTitle: string;
  onBack: () => void;
}

const mockMessages: DirectMessage[] = [
    { id: 1, text: "Hello, is this still available?", timestamp: "10:40 AM", senderId: "me" },
    { id: 2, text: "Yes, the maize is still available. How many bags do you need?", timestamp: "10:42 AM", senderId: "other" },
    { id: 3, text: "I need 5 bags. Can you deliver to Kampala?", timestamp: "10:43 AM", senderId: "me" },
];


const ChatScreen: React.FC<ChatScreenProps> = ({ userName, userPhoto, listingTitle, onBack }) => {
    const [messages, setMessages] = useState<DirectMessage[]>(mockMessages);
    const [input, setInput] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessage: DirectMessage = {
            id: messages.length + 1,
            text: input,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            senderId: 'me',
        };
        setMessages(prev => [...prev, newMessage]);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <div className="flex items-center p-3 border-b border-gray-200 bg-surface">
                <button onClick={onBack} className="p-2 text-text-secondary hover:text-primary">
                    <span className="material-icons-outlined">arrow_back</span>
                </button>
                <img src={userPhoto} alt={userName} className="w-10 h-10 rounded-full object-cover ml-2" />
                <div className="ml-3">
                    <h2 className="font-poppins text-text-primary">{userName}</h2>
                    <p className="text-xs text-text-secondary">Active now</p>
                </div>
            </div>
            
            {/* Context Banner */}
            <div className="p-2 text-center bg-gray-100 border-b">
                <p className="text-xs text-text-secondary">
                    Conversation about: <span className="font-semibold">{listingTitle}</span>
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.senderId === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-surface text-text-primary rounded-bl-none'}`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'text-gray-200' : 'text-text-secondary'} text-right`}>{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-surface">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-full border-transparent focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <button onClick={handleSend} className="p-3 bg-primary text-white rounded-full disabled:bg-gray-400">
                        <span className="material-icons-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
