import { HomeIcon, MoreVerticalIcon } from "lucide-react"
import React from "react"

export function PricingHeaderSection() {
  // Status bar icons data
  const statusBarIcons = [
    { src: "/img/wifi.png", alt: "Wifi", className: "w-4 h-3" },
    { src: "/img/reception.png", alt: "Reception", className: "w-3 h-3" },
    { src: "/img/battery.png", alt: "Battery", className: "w-2 h-[13px]" },
  ]

  return (
    <header className="w-full bg-transparent">
      {/* Status Bar */}
      

      {/* Navigation Bar */}
      <div className="w-full h-16 bg-white-100 border-b border-[#dbdbdb] flex items-center px-3">
        <div className="flex items-center w-full">
          {/* HomeIcon Icon */}
          <HomeIcon className="w-6 h-6 text-gray-333-100" />

          {/* URL Bar */}
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
                <span className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-100 text-[10px] leading-[13px]">
                  vedicmarriage.ai
                </span>
                <span className="[font-family:'Roboto',Helvetica] font-medium text-gray-333-60 text-[10px] leading-[13px]">
                  /my-profile
                </span>
              </div>
            </div>
          </div>

          {/* Notification */}
          <div className="mr-3">
            <div className="w-4 h-4 rounded-[5px] overflow-hidden border-[1.5px] border-solid border-gray-333-100 flex items-center justify-center">
              <span className="[font-family:'Roboto',Helvetica] font-bold text-gray-333-100 text-[10px]">
                1
              </span>
            </div>
          </div>

          {/* More Menu */}
          <MoreVerticalIcon className="w-6 h-6 text-gray-333-100" />
        </div>
      </div>

      {/* Brand Banner */}
      <div className="w-full h-16 bg-[#fff4e6] flex items-center justify-center relative">
        <img
          className="absolute left-0 w-10 h-[62px]"
          alt="Decorative element left"
          src="/assets/images/img/group-1000004397.png"
        />
        <div className="relative w-[172px] h-8 bg-[url(/assets/images/img/image-15.png)] bg-cover bg-[50%_50%]" />
        <img
          className="absolute right-0 w-10 h-[62px]"
          alt="Decorative element right"
          src="/assets/images/img/group-1000004397.png"
        />
      </div>
    </header>
  )
} 