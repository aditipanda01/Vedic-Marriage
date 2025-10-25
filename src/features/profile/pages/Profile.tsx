import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Personal Information
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={user?.name?.split(' ')[0] || ''}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={user?.name?.split(' ')[1] || ''}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={user?.email || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 