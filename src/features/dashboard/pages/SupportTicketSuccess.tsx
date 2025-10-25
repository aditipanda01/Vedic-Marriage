import React from 'react';

export default function SupportTicketSuccess() {
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
                <h1 className="text-2xl font-semibold text-gray-900">Support Ticket</h1>
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

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Ticket ID */}
          <div className="text-sm text-gray-500 mb-4">Support ID: ACC!3424</div>

          {/* Success Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Support Ticket created successfully</h2>

          {/* Success Message */}
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Thank you for reaching out about Password & Login Issues. Your request has been received.
            </p>
            <p>
              An agent will review your request and get back to you shortly.
            </p>
            <p>
              Thank you for your patience!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
              View My Tickets
            </button>
            <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Back to Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
