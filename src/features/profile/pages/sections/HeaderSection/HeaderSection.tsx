import { HomeIcon, MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../../components/ui/badge";

export const HeaderSection = (): JSX.Element => {
  // Status bar icons data
  const statusIcons = [
    { src: "/img/wifi.png", alt: "Wifi", className: "w-4 h-3 top-1.5 left-2" },
    {
      src: "/img/reception.png",
      alt: "Reception",
      className: "w-3 h-3 top-1.5 left-[34px]",
    },
    {
      src: "/img/battery.png",
      alt: "Battery",
      className: "w-2 h-[13px] top-[5px] left-[60px]",
    },
  ];

  return (
    <header className="w-full sticky top-0 z-50 flex flex-col bg-transparent overflow-x-hidden">
      {/* Status Bar */}
      <div className="w-full h-8 bg-white-100">
        <div className="h-8 bg-[url(/img/status-bar-bg.png)] bg-cover bg-[50%_50%]">
          <div className="flex items-center justify-end relative top-1 pr-4">
            <div className="relative w-[118px] h-6 bg-[url(/img/bounds.png)] bg-[100%_100%]">
              {statusIcons.map((icon, index) => (
                <img
                  key={index}
                  className={`absolute ${icon.className}`}
                  alt={icon.alt}
                  src={icon.src}
                />
              ))}
              <div className="absolute w-[35px] h-[15px] top-[5px] left-[77px] opacity-90">
                <div className="absolute w-[33px] top-0 left-0 [font-family:'Roboto',Helvetica] font-normal text-gray-333-100 text-[13px] tracking-[0] leading-[normal] whitespace-nowrap">
                  12:30
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full max-w-[390px] mx-auto h-16 bg-white-100 border-b border-[#dbdbdb] flex items-center justify-between px-3">
        <HomeIcon className="w-6 h-6 text-gray-333-100" />

        <div className="flex-1 mx-2">
          <div className="flex items-center gap-2 px-[11px] py-[9px] bg-gray-333-10 rounded-[17px]">
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

            <div className="flex items-center">
              <span className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-100 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
                vedicmarriage.ai
              </span>
              <span className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-60 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
                /my-profile
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Badge
              variant="outline"
              className="h-4 w-4 p-0 flex items-center justify-center rounded-[5px] border-[1.5px] border-gray-333-100"
            >
              <span className="[font-family:'Roboto',Helvetica] font-bold text-gray-333-100 text-[10px]">
                1
              </span>
            </Badge>
          </div>
          <MoreVerticalIcon className="w-6 h-6 text-gray-333-100" />
        </div>
      </div>

      {/* Brand Banner */}
      <div className="w-full max-w-[390px] mx-auto h-16 flex items-center justify-center bg-[#fff4e6] relative">
        <div className="relative w-[172px] h-8 bg-[url(/img/image-15.png)] bg-cover bg-[50%_50%]" />
        <img
          className="absolute w-10 h-[62px] top-0 left-0"
          alt="Decorative element left"
          src="/assets/images/img/group-1000004396.png"
        />
        <img
          className="absolute w-10 h-[62px] top-0 right-0"
          alt="Decorative element right"
          src="/assets/images/img/group-1000004397.png"
        />
      </div>
    </header>
  );
};
