import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Tab } from '@headlessui/react';
import { 
  UserCircleIcon, 
  HeartIcon, 
  ChatBubbleLeftRightIcon, 
  BellIcon,
  Cog6ToothIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: 'Profile', icon: UserCircleIcon },
    { name: 'Matches', icon: HeartIcon },
    { name: 'Messages', icon: ChatBubbleLeftRightIcon },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
    { name: 'Documents', icon: DocumentTextIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Welcome Section */}
          <div className="py-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Welcome back, {user?.firstName}!</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Here's what's happening with your matches today.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="btn btn-secondary">
                    <BellIcon className="h-5 w-5" />
                    <span className="ml-2">Notifications</span>
                  </button>
                  <button className="btn btn-primary">
                    <HeartIcon className="h-5 w-5" />
                    <span className="ml-2">View Matches</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HeartIcon className="h-6 w-6 text-orange" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">New Matches</h3>
                  <p className="text-2xl font-semibold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-orange" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                  <p className="text-2xl font-semibold text-gray-900">5</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserCircleIcon className="h-6 w-6 text-orange" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Profile Views</h3>
                  <p className="text-2xl font-semibold text-gray-900">28</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BellIcon className="h-6 w-6 text-orange" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="mt-8">
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'flex items-center rounded-lg px-4 py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-orange focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-orange text-white shadow'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      )
                    }
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="ml-2">{tab.name}</span>
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-4">
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Profile Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="label">Full Name</label>
                        <p className="mt-1 text-sm text-gray-900">{user?.firstName} {user?.lastName}</p>
                      </div>
                      <div>
                        <label className="label">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Matches Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Your Matches</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {/* Match cards will go here */}
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Messages Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Messages</h3>
                    <div className="space-y-4">
                      {/* Message list will go here */}
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Notifications Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
                    <div className="space-y-4">
                      {/* Notification list will go here */}
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Settings Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                    <div className="space-y-4">
                      {/* Settings form will go here */}
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  {/* Documents Content */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Your Documents</h3>
                    <div className="space-y-4">
                      {/* Document list will go here */}
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
} 