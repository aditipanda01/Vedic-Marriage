import React, { useState } from 'react';

export default function SupportTicket() {
  const [formData, setFormData] = useState({
    category: 'Account & Profile Management',
    subCategory: '',
    issue: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Support ticket submitted:', formData);
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
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Need Help with Account & Profile Management?
          </h2>
          <p className="text-sm text-gray-600">
            We're here to assist you! Select an option below to get started, and one of our support agents will get back to you shortly.
          </p>
        </div>

        {/* Support Ticket Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Account & Profile Management">Account & Profile Management</option>
                  <option value="Matches & Communication">Matches & Communication</option>
                  <option value="Subscription & Billing">Subscription & Billing</option>
                  <option value="Technical & General Support">Technical & General Support</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sub-category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select sub-category
              </label>
              <div className="relative">
                <select
                  value={formData.subCategory}
                  onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a sub-category</option>
                  {formData.category === 'Account & Profile Management' && (
                    <>
                      <option value="Password & Login Issues">Password & Login Issues</option>
                      <option value="Profile Updates">Profile Updates</option>
                      <option value="Account Verification">Account Verification</option>
                      <option value="Privacy Settings">Privacy Settings</option>
                    </>
                  )}
                  {formData.category === 'Matches & Communication' && (
                    <>
                      <option value="Match Preferences">Match Preferences</option>
                      <option value="Messaging Issues">Messaging Issues</option>
                      <option value="Blocking/Reporting">Blocking/Reporting Users</option>
                    </>
                  )}
                  {formData.category === 'Subscription & Billing' && (
                    <>
                      <option value="Payment Issues">Payment Issues</option>
                      <option value="Plan Changes">Plan Changes</option>
                      <option value="Billing Questions">Billing Questions</option>
                    </>
                  )}
                  {formData.category === 'Technical & General Support' && (
                    <>
                      <option value="Technical Problems">Technical Problems</option>
                      <option value="Security Concerns">Security Concerns</option>
                      <option value="General Inquiries">General Inquiries</option>
                    </>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your issue
              </label>
              <textarea
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                placeholder="Type your issue here"
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              />
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
