import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { useNavigation } from "../../../../lib/context/NavigationContext";

export const FormWrapperSection = (): JSX.Element => {
  const { currentSection, setCurrentSection, markSectionComplete, completedSections } = useNavigation();

  const handleNext = () => {
    console.log('Form Wrapper - Next clicked for section:', currentSection); // Debug log
    console.log('Current completed sections:', completedSections); // Debug log
    markSectionComplete(currentSection);
    
    switch (currentSection) {
      case 'basic':
        setCurrentSection('astro');
        break;
      case 'astro':
        setCurrentSection('family');
        break;
      case 'family':
        setCurrentSection('career');
        break;
      case 'career':
        setCurrentSection('spiritual');
        break;
      case 'spiritual':
        setCurrentSection('preferences');
        break;
    }
  };

  const handleSkip = () => {
    console.log('Form Wrapper - Skip clicked for section:', currentSection); // Debug log
    console.log('Current completed sections:', completedSections); // Debug log
    markSectionComplete(currentSection);
    
    switch (currentSection) {
      case 'basic':
        setCurrentSection('astro');
        break;
      case 'astro':
        setCurrentSection('family');
        break;
      case 'family':
        setCurrentSection('career');
        break;
      case 'career':
        setCurrentSection('spiritual');
        break;
      case 'spiritual':
        setCurrentSection('preferences');
        break;
    }
  };

  const handleBack = () => {
    console.log('Form Wrapper - Back clicked from section:', currentSection); // Debug log
    switch (currentSection) {
      case 'astro':
        setCurrentSection('basic');
        break;
      case 'family':
        setCurrentSection('astro');
        break;
      case 'career':
        setCurrentSection('family');
        break;
      case 'spiritual':
        setCurrentSection('career');
        break;
      case 'preferences':
        setCurrentSection('spiritual');
        break;
    }
  };

  // Render different button layouts based on the current section
  const renderButtons = () => {
    if (currentSection === 'basic') {
      // First page: Only Skip and Next
      return (
        <>
          <Button
            variant="outline"
            className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px]"
            onClick={handleSkip}
          >
            Skip
          </Button>

          <Button 
            className="w-[100px] h-8 pl-4 pr-0 py-0 bg-orange text-white font-bold text-sm rounded-[84px] flex items-center justify-between"
            onClick={handleNext}
          >
            Next
            <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-orange ml-1">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </span>
          </Button>
        </>
      );
    } else if (currentSection === 'preferences') {
      // Last page: Only Back and Submit
      return (
        <>
          <Button
            variant="outline"
            className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px] flex items-center justify-between"
            onClick={handleBack}
          >
            <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-background-color mr-1">
              <ChevronLeftIcon className="w-6 h-6 text-grey" />
            </span>
            Back
          </Button>

          <Button 
            className="w-[100px] h-8 pl-4 pr-0 py-0 bg-orange text-white font-bold text-sm rounded-[84px] flex items-center justify-between"
            onClick={() => {
              markSectionComplete('preferences');
              // Handle form submission
              console.log('Form submitted');
            }}
          >
            Submit
            <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-orange ml-1">
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </span>
          </Button>
        </>
      );
    } else {
      // Other pages: Back, Skip, and Next
      return (
        <>
          <Button
            variant="outline"
            className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px] flex items-center justify-between"
            onClick={handleBack}
          >
            <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-background-color mr-1">
              <ChevronLeftIcon className="w-6 h-6 text-grey" />
            </span>
            Back
          </Button>

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px]"
              onClick={handleSkip}
            >
              Skip
            </Button>

            <Button 
              className="w-[100px] h-8 pl-4 pr-0 py-0 bg-orange text-white font-bold text-sm rounded-[84px] flex items-center justify-between"
              onClick={handleNext}
            >
              Next
              <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-orange ml-1">
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </span>
            </Button>
          </div>
        </>
      );
    }
  };

  return (
    <footer className="flex w-full h-[72px] items-center justify-between px-6 py-4 bg-white rounded-t-[16px] shadow-[0px_7px_29px_#64646f33] border-t">
      {renderButtons()}
    </footer>
  );
};
