
import React from 'react';
import type { Conversation } from '../types';
import type { ChatDetails } from '../App';

const mockConversations: Conversation[] = [
    { id: 1, userName: 'Maria N.', userPhoto: 'https://picsum.photos/seed/seller2/100', lastMessage: 'Yes, the maize is still available. How many bags do you need?', timestamp: '10:42 AM', unreadCount: 2, listingTitle: 'Organic Maize' },
    { id: 2, userName: 'Peter A.', userPhoto: 'https://picsum.photos/seed/seller3/100', lastMessage: 'The plot has direct access to the lake.', timestamp: 'Yesterday', listingTitle: 'Lakeside Plot' },
    { id: 3, userName: 'Agro Supplies Ltd', userPhoto: 'https://picsum.photos/seed/seller5/100', lastMessage: 'We deliver country-wide for an extra fee.', timestamp: 'Mon', listingTitle: 'NPK Fertilizer' },
    { id: 4, userName: 'David O.', userPhoto: 'https://picsum.photos/seed/seller9/100', lastMessage: 'You can come view the land this weekend.', timestamp: 'Sun', listingTitle: 'Gulu Farmland' },
];

interface ConversationItemProps {
    convo: Conversation;
    onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ convo, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-3 hover:bg-gray-50 transition-colors text-left">
        <img src={convo.userPhoto} alt={convo.userName} className="w-14 h-14 rounded-full object-cover mr-4" />
        <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
                <p className="font-poppins text-text-primary truncate">{convo.userName}</p>
                <p className="text-xs text-text-secondary flex-shrink-0 ml-2">{convo.timestamp}</p>
            </div>
            <div className="flex justify-between items-start mt-1">
                <p className="text-sm text-text-secondary truncate">{convo.lastMessage}</p>
                {convo.unreadCount && convo.unreadCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                        {convo.unreadCount}
                    </span>
                )}
            </div>
        </div>
    </button>
);


interface MessagesScreenProps {
  onStartChat: (details: ChatDetails) => void;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ onStartChat }) => {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-gray-200 bg-surface">
        <h1 className="font-poppins text-2xl text-text-primary">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto">
        {mockConversations.map(convo => (
            <div key={convo.id}>
                <ConversationItem convo={convo} onClick={() => onStartChat({ userName: convo.userName, userPhoto: convo.userPhoto, listingTitle: convo.listingTitle })} />
                <div className="border-t border-gray-100 mx-4"></div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesScreen;
