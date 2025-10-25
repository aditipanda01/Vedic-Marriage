import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';

interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export default function MessageList({ messages, currentUser, onSendMessage }: MessageListProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[600px] flex-col rounded-lg bg-white shadow">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.sender.id === currentUser.id
                  ? 'bg-orange text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-2">
                {message.sender.id !== currentUser.id && (
                  <img
                    src={message.sender.profileImage || '/default-avatar.png'}
                    alt={message.sender.firstName}
                    className="h-6 w-6 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">
                  {message.sender.id === currentUser.id ? 'You' : message.sender.firstName}
                </span>
              </div>
              <p className="mt-1">{message.content}</p>
              <div className="mt-1 text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
                {message.isRead && message.sender.id === currentUser.id && (
                  <span className="ml-2">✓ Read</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="input flex-1"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="btn btn-primary"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            <span className="ml-2">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
} 