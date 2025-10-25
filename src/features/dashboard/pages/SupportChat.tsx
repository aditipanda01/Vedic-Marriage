import React, { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  avatar?: string;
}

export default function SupportChat() {
  const [newMessage, setNewMessage] = useState('');

  const messages: Message[] = [
    {
      id: '1',
      text: 'I am not able to login',
      sender: 'user',
      timestamp: '24 Feb 2025 • Raghav',
      avatar: '/img/user-avatar.png',
    },
    {
      id: '2',
      text: 'Your ticket has been successfully created. We\'ll get in touch with you.',
      sender: 'support',
      timestamp: 'Message from Vedic Matrimony Support',
      avatar: '/img/support-avatar.png',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Support ID: SUP1242421</div>
                  <div className="font-medium text-gray-900">Account and Profile Management</div>
                </div>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Chat Messages */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 min-h-96">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type here to ask anything"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
