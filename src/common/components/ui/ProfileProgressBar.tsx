import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileProgressBarProps {
  variant?: 'normal' | 'card';
  className?: string;
}

// ProfileProgressBar component for displaying profile completion progress
export default function ProfileProgressBar({ variant = 'normal', className = '' }: ProfileProgressBarProps) {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Get progress percentage from user state, default to 0 if not available
  const progressPercentage = user?.profileCompletionDetails?.completionPercentage || 0;

  // Normal variant (original design)
  if (variant === 'normal') {
    return (
      <div className={`w-[146px] ${className}`}>
        <div className="text-[10px] [font-family:'Plus_Jakarta_Sans',Helvetica] mt-3">
          {progressPercentage}% Completed
        </div>
        <Progress
          value={progressPercentage}
          className="h-1 rounded-lg bg-background-color [&>div]:bg-[rgb(237,97,41)]"
        />
      </div>
    );
  }

  // Card variant (enhanced design)
  return (
    <Card className={`p-4 rounded-xl bg-white shadow-lg border-0 min-w-[200px] ${className}`}>
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-gray-800">
                Profile Progress
              </h3>
              <p className="text-xs text-gray-500">
                {progressPercentage}% Completed
              </p>
            </div>
            {/* <div className="text-2xl font-bold text-orange-500">
              {progressPercentage}%
            </div> */}
          </div>
          <Progress
            value={progressPercentage}
            className="h-2 rounded-lg bg-gray-100 [&>div]:bg-[rgb(237,97,41)]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
