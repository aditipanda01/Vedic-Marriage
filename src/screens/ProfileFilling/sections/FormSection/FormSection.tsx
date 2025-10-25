import React from "react";
import { useNavigation } from "../../../../lib/context/NavigationContext";
import { BasicDetailsSection } from "../BasicDetailsSection/BasicDetailsSection";
import { AstroSection } from "../AstroSection/AstroSection";
import { FamilyBackgroundSection } from "../FamilyBackgroundSection/FamilyBackgroundSection";
import { CareerSection } from "../CareerSection/CareerSection";
import { SpiritualSection } from "../SpiritualSection/SpiritualSection";
import { PreferenceSection } from "../PreferenceSection/PreferenceSection";

interface FormSectionProps {}

export const FormSection: React.FC<FormSectionProps> = () => {
  const { currentSection } = useNavigation();

  const renderContent = () => {
    switch (currentSection) {
      case 'basic':
        return <BasicDetailsSection />;
      case 'astro':
        return <AstroSection />;
      case 'family':
        return <FamilyBackgroundSection />;
      case 'career':
        return <CareerSection />;
      case 'spiritual':
        return <SpiritualSection />;
      case 'preferences':
        return <PreferenceSection />;
      default:
        return <BasicDetailsSection />;
    }
  };

  return (
    <div className="w-full">
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
}; 