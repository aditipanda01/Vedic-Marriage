import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  totalMatches: number;
  newMessages: number;
  profileViews: number;
  pendingRequests: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalMatches: 0,
    newMessages: 0,
    profileViews: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    // TODO: Fetch dashboard stats from API
    // This is a mock implementation
    setStats({
      totalMatches: 12,
      newMessages: 3,
      profileViews: 45,
      pendingRequests: 2,
    });
  }, []);

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Matches */}
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Matches</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.totalMatches}
              </dd>
            </div>

            {/* New Messages */}
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">New Messages</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.newMessages}
              </dd>
            </div>

            {/* Profile Views */}
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Profile Views</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.profileViews}
              </dd>
            </div>

            {/* Pending Requests */}
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Pending Requests</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {stats.pendingRequests}
              </dd>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <p className="text-sm text-gray-500">
                Welcome back, {user?.firstName}! Your profile is {Math.round(Math.random() * 100)}% complete.
              </p>
              <div className="mt-4">
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-orange"
                    style={{ width: `${Math.round(Math.random() * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2">
              Update Profile
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2">
              View Matches
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange/90 focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2">
              Check Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 