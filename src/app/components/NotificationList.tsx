import { BellIcon, HeartIcon, ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';

interface Notification {
  id: string;
  type: 'match' | 'message' | 'profile_view' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  user?: User;
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead, onDelete }: NotificationListProps) {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match':
        return <HeartIcon className="h-6 w-6 text-orange" />;
      case 'message':
        return <ChatBubbleLeftRightIcon className="h-6 w-6 text-orange" />;
      case 'profile_view':
        return <UserIcon className="h-6 w-6 text-orange" />;
      default:
        return <BellIcon className="h-6 w-6 text-orange" />;
    }
  };

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-center py-8">
          <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
          <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`relative rounded-lg bg-white p-4 shadow ${
              !notification.isRead ? 'border-l-4 border-orange' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                {notification.user && (
                  <div className="mt-2 flex items-center space-x-2">
                    <img
                      src={notification.user.profileImage || '/default-avatar.png'}
                      alt={notification.user.firstName}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="text-sm text-gray-900">
                      {notification.user.firstName} {notification.user.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="text-sm text-orange hover:text-orange/90"
                >
                  Mark as read
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
} 