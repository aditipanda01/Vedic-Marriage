import React from 'react';

const Chat = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Chat</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="bg-white shadow rounded-lg">
            <div className="flex h-[600px]">
              {/* Chat list */}
              <div className="w-1/3 border-r border-gray-200">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {/* Chat list items will go here */}
                    <div className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://via.placeholder.com/40"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            Sample User
                          </p>
                          <p className="text-sm text-gray-500">
                            Last message preview...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto">
                  {/* Messages will go here */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-8 w-8">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://via.placeholder.com/32"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          Sample User
                        </div>
                        <div className="mt-1 text-sm text-gray-700 bg-gray-100 rounded-lg p-3">
                          Hello! How are you?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 