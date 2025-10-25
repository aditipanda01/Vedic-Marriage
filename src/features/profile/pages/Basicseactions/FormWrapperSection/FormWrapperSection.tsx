import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../../components/ui/button";

export const FormWrapperSection = (): JSX.Element => {
  return (
    <footer className="flex w-full h-[72px] items-center justify-between px-6 py-4 bg-white rounded-t-[16px] shadow-[0px_7px_29px_#64646f33] border-t">
      <Button
        variant="outline"
        className="w-[100px] h-8 font-bold text-grey text-sm bg-background-color rounded-[84px]"
      >
        Skip
      </Button>

      <Button className="w-[100px] h-8 pl-4 pr-0 py-0 bg-orange text-white font-bold text-sm rounded-[84px] flex items-center justify-between">
        Next
        <span className="inline-flex items-center justify-center p-2 rounded-[72px] bg-orange ml-1">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </span>
      </Button>
    </footer>
  );
};
