import React from 'react';

interface SupportTicket {
  id: string;
  category: string;
  status: 'created' | 'in-progress' | 'resolved';
  date: string;
}

export default function SupportTicketsList() {
  const supportTickets: SupportTicket[] = [
    {
      id: 'SUP1242421',
      category: 'Account & Profile Management',
      status: 'created',
      date: '24 Feb 2025',
    },
    {
      id: 'SUP1242422',
      category: 'Account & Profile Management',
      status: 'in-progress',
      date: '23 Feb 2025',
    },
    {
      id: 'SUP1242423',
      category: 'Account & Profile Management',
      status: 'resolved',
      date: '22 Feb 2025',
    },
  ];

  const supportCategories = [
    {
      icon: 'account-settings',
      title: 'Account & Profile Management',
      description: 'Help with passwords, login issues, profile updates, and verification.',
    },
    {
      icon: 'message',
      title: 'Matches & Communication',
      description: 'Support for match preferences, messaging issues, and blocking/reporting users.',
    },
    {
      icon: 'payment',
      title: 'Subscription & Billing',
      description: 'Assistance with subscription plans, payment processing, and billing issues.',
    },
    {
      icon: 'support',
      title: 'Technical & General Support',
      description: 'Troubleshooting technical problems, security and privacy concerns, feedback, events, and other general inquiries.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'created':
        return 'Ticket created';
      case 'in-progress':
        return 'In progress';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
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
              <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
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
        {/* Support Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Action Categories</h3>
          <div className="space-y-4">
            {supportCategories.map((category, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {category.icon === 'account-settings' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      )}
                      {category.icon === 'message' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      )}
                      {category.icon === 'payment' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      )}
                      {category.icon === 'support' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                      )}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{category.title}</h4>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create New Ticket */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Create new Support ticket
          </button>
        </div>

        {/* Support Tickets List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Your support tickets</h3>
          <div className="space-y-4">
            {supportTickets.map((ticket, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm text-gray-500">Support ID: {ticket.id}</span>
                    </div>
                    <div className="font-medium text-gray-900 mb-1">{ticket.category}</div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
