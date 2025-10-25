import React from "react";
import { Button } from "@/components/ui/button";

export interface NavigationButton {
  text: string;
  onClick: () => void;
  variant?: "outline" | "default";
  color?: "orange" | "green" | "orange-alt" | "default";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  showIcon?: boolean;
  iconPosition?: "left" | "right";
  iconDirection?: "left" | "right";
}

export interface BottomNavigationProps {
  leftButton?: NavigationButton;
  rightButton?: NavigationButton;
  singleButton?: NavigationButton;
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  leftButton,
  rightButton,
  singleButton,
  className = "",
}) => {
  const getButtonColor = (color?: string) => {
    switch (color) {
      case "orange":
        return "bg-[#e84420] hover:bg-[#e84420]/90 text-white";
      case "green":
        return "bg-[#2bcc8d] hover:bg-[#2bcc8d]/90 text-white";
      case "orange-alt":
        return "bg-[#ed6129] hover:bg-[#ed6129]/90 text-white";
      default:
        return "bg-[#e84420] hover:bg-[#e84420]/90 text-white";
    }
  };

  const renderIcon = (direction: "left" | "right" = "right") => {
    const path = direction === "left" 
      ? "M15 19l-7-7 7-7" 
      : "M9 5l7 7-7 7";
    
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={path}
        />
      </svg>
    );
  };

  const renderButton = (button: NavigationButton, isLeft: boolean = false) => {
    const {
      text,
      onClick,
      variant = isLeft ? "outline" : "default",
      color = "orange",
      disabled = false,
      loading = false,
      loadingText,
      showIcon = true,
      iconPosition = isLeft ? "left" : "right",
      iconDirection = isLeft ? "left" : "right",
    } = button;

    const buttonText = loading && loadingText ? loadingText : text;
    const shouldShowIcon = showIcon && !loading;

    return (
      <Button
        variant={variant}
        className={`flex-1 h-12 flex items-center justify-center gap-2 ${
          variant === "default" ? getButtonColor(color) : ""
        }`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {shouldShowIcon && iconPosition === "left" && renderIcon(iconDirection)}
        {buttonText}
        {shouldShowIcon && iconPosition === "right" && renderIcon(iconDirection)}
      </Button>
    );
  };

  // Single button layout
  if (singleButton) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 w-full max-w-[390px] mx-auto bg-white border-t border-gray-200 p-4 ${className}`}>
        <Button
          variant={singleButton.variant || "default"}
          className={`w-full h-12 flex items-center justify-center gap-2 ${
            singleButton.variant === "default" ? getButtonColor(singleButton.color) : ""
          }`}
          onClick={singleButton.onClick}
          disabled={singleButton.disabled || singleButton.loading}
        >
          {singleButton.loading && singleButton.loadingText ? singleButton.loadingText : singleButton.text}
          {singleButton.showIcon !== false && !singleButton.loading && renderIcon(singleButton.iconDirection || "right")}
        </Button>
      </div>
    );
  }

  // Two button layout
  if (leftButton && rightButton) {
    return (
      <div className={`fixed bottom-0 left-0 right-0 w-full max-w-[390px] mx-auto bg-white border-t border-gray-200 p-4 ${className}`}>
        <div className="flex justify-between gap-4">
          {renderButton(leftButton, true)}
          {renderButton(rightButton, false)}
        </div>
      </div>
    );
  }

  // Single button with left or right only
  if (leftButton || rightButton) {
    const button = leftButton || rightButton!;
    return (
      <div className={`fixed bottom-0 left-0 right-0 w-full max-w-[390px] mx-auto bg-white border-t border-gray-200 p-4 ${className}`}>
        {renderButton(button, !!leftButton)}
      </div>
    );
  }

  // Fallback - no buttons
  return null;
};
