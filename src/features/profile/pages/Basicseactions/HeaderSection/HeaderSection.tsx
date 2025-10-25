import { HomeIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";

export const HeaderSection = (): JSX.Element => {
  // Status bar data
  const statusBarInfo = {
    time: "12:30",
  };

  return (
    <header className="w-full flex flex-col bg-transparent">
      {/* Status Bar */}
      <div className="w-full h-8 bg-white-100">
        <div className="h-8 bg-[url(/img/status-bar-bg.png)] bg-cover bg-[50%_50%]">
          <div className="flex items-center justify-end relative top-1 pr-4">
            <div className="relative w-[118px] h-6 bg-[url(/img/bounds.png)] bg-[100%_100%]">
              <img
                className="absolute w-4 h-3 top-1.5 left-2"
                alt="Wifi"
                src="/assets/images/img/wifi.png"
              />
              <img
                className="absolute w-3 h-3 top-1.5 left-[34px]"
                alt="Reception"
                src="/assets/images/img/reception.png"
              />
              <img
                className="absolute w-2 h-[13px] top-[5px] left-[60px]"
                alt="Battery"
                src="/assets/images/img/battery.png"
              />
              <div className="absolute w-[35px] h-[15px] top-[5px] left-[77px] opacity-90">
                <div className="absolute w-[33px] top-0 left-0 [font-family:'Roboto',Helvetica] font-normal text-gray-333-100 text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
                  {statusBarInfo.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full h-16 bg-white-100 border-b border-[#dbdbdb] flex items-center justify-between px-3">
        <HomeIcon className="w-6 h-6 text-gray-333-100" />

        <div className="flex items-center gap-2 px-[11px] py-[9px] bg-gray-333-10 rounded-[17px] flex-grow mx-2">
          <div className="relative w-4 h-4">
            <div className="relative w-2 h-[11px] top-[3px] left-1">
              <div className="absolute w-2 h-2 top-[3px] left-0 bg-gray-333-100 rounded-[1px]" />
              <img
                className="absolute w-[5px] h-[3px] top-0 left-0.5"
                alt="Rectangle"
                src="/assets/images/img/rectangle-6.png"
              />
            </div>
          </div>

          <div className="flex items-center self-stretch">
            <div className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-100 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
              vedicmarriage.ai
            </div>
            <div className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-60 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
              /my-profile
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-[5px] overflow-hidden border-[1.5px] border-solid border-gray-333-100 flex items-center justify-center">
            <div className="[font-family:'Roboto',Helvetica] font-bold text-gray-333-100 text-[10px] text-center tracking-[0] leading-[normal]">
              1
            </div>
          </div>
          <MoreVerticalIcon className="w-6 h-6 text-gray-333-100" />
        </div>
      </div>

      {/* Vedic Marriage Banner */}
      <div className="w-full h-16 flex items-center justify-center bg-[#fff4e6] relative">
        <div className="relative w-[172px] h-8 bg-[url(/img/image-15.png)] bg-cover bg-[50%_50%]" />
        <img
          className="absolute w-10 h-[62px] top-0 left-0"
          alt="Decorative element"
          src="/assets/images/img/group-1000004397.png"
        />
        <img
          className="absolute w-10 h-[62px] top-0 right-0"
          alt="Decorative element"
          src="/assets/images/img/group-1000004397.png"
        />
      </div>
    </header>
  );
};
