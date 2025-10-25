import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  
  Home,
  MessageCircle,
  Heart,
  Bell,
  User,
 
  LucideIcon,
} from "lucide-react"
export const DashboardFooter = () => {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  interface NavigationItem {
    icon: LucideIcon
    label: string
    active: boolean
  }
  const navigationItems: NavigationItem[] = [
    { icon: Home, label: "Home", active: false },
    { icon: MessageCircle, label: "Messages", active: false },
    { icon: Heart, label: "My Matches", active: false },
    { icon: Bell, label: "Notifications", active: false },
    { icon: User, label: "Profile", active: true },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="flex flex-col items-center py-2 px-3 cursor-pointer">
                <IconComponent className={`w-6 h-6 mb-1 ${item.active ? "text-orange-600" : "text-gray-400"}`} />
                <span className={`text-xs ${item.active ? "text-orange-600 font-medium" : "text-gray-400"}`}>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </footer> 
  );
}
