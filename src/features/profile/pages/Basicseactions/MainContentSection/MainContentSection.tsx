import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../../components/ui/tabs";

export const MainContentSection = (): JSX.Element => {
  // Define tab data for easy mapping
  const tabItems = [
    { id: "basics", emoji: "🧑", label: "Basics" },
    { id: "astro", emoji: "🌕", label: "Astro" },
    { id: "family", emoji: "👪", label: "Family" },
    { id: "career", emoji: "💼", label: "Career" },
    { id: "spiritual", emoji: "🪷", label: "Spiritual" },
    { id: "preferences", emoji: "💟", label: "Preferences" },
  ];

  return (
    <div className="w-full sticky top-40 bg-white px-4 pt-2">
      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="flex w-full h-12 justify-start gap-2 p-0 bg-transparent overflow-x-auto">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center justify-center gap-1 p-4 h-12 rounded-[4px_4px_0px_0px] data-[state=active]:border-b-2 data-[state=active]:border-orange data-[state=active]:shadow-none"
            >
              <div className="text-base leading-4 text-center">{tab.emoji}</div>
              <div
                className={`text-xs font-bold leading-4 text-center truncate ${
                  tab.id === "basics"
                    ? "text-orange"
                    : "text-variable-collection-1light-grey"
                }`}
              >
                {tab.label}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
