"use client"

import React, { createContext, useContext, useState } from 'react';

export type Section = 'basic' | 'astro' | 'family' | 'career' | 'spiritual' | 'preference';

interface NavigationContextType {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  completedSections: Section[];
  markSectionComplete: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState<Section>('basic');
  const [completedSections, setCompletedSections] = useState<Section[]>([]);

  const handleSetCurrentSection = (section: Section) => {
    console.log('Setting current section to:', section); // Debug log
    setCurrentSection(section);
  };

  const markSectionComplete = (section: Section) => {
    console.log('Marking section as complete:', section); // Debug log
    if (!completedSections.includes(section)) {
      setCompletedSections((prev) => [...prev, section]);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentSection,
        setCurrentSection: handleSetCurrentSection,
        completedSections,
        markSectionComplete,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}; 