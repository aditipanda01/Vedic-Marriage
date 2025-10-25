import { HeartIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { User } from '@/types/user';

interface MatchCardProps {
  match: {
    id: string;
    user: User;
    matchPercentage: number;
    status: 'pending' | 'accepted' | 'rejected';
    lastInteraction?: string;
  };
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onMessage: (id: string) => void;
}

export default function MatchCard({ match, onAccept, onReject, onMessage }: MatchCardProps) {
  return (
    <div className="relative rounded-lg bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 flex-shrink-0">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={match.user.profileImage || '/default-avatar.png'}
            alt={match.user.firstName}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">
            {match.user.firstName} {match.user.lastName}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {match.user.age} years • {match.user.location}
          </p>
          <div className="mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {match.matchPercentage}% Match
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => onAccept(match.id)}
              className="btn btn-primary"
              disabled={match.status === 'accepted'}
            >
              <HeartIcon className="h-5 w-5" />
              <span className="ml-2">Accept</span>
            </button>
            <button
              onClick={() => onReject(match.id)}
              className="btn btn-secondary"
              disabled={match.status === 'rejected'}
            >
              <span>Reject</span>
            </button>
          </div>
          {match.status === 'accepted' && (
            <button
              onClick={() => onMessage(match.id)}
              className="btn btn-secondary"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span className="ml-2">Message</span>
            </button>
          )}
        </div>
      </div>

      {match.lastInteraction && (
        <div className="mt-4 text-sm text-gray-500">
          Last interaction: {new Date(match.lastInteraction).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 