import React from "react";

export const Header = (): JSX.Element => {
  return (
    <header className="fixed w-[390px] h-40 top-0 left-0 bg-transparent">
      {/* Status Bar */}
     

      {/* Navigation Bar */}
      <div className="absolute w-[390px] h-16 top-8 left-0 bg-white-100 border-b [border-bottom-style:solid] border-[#dbdbdb] flex items-center px-4">
        <img
          className="w-6 h-6"
          alt="Home"
          src="/assets/images/img/home.png"
        />

        <div className="flex items-center gap-2 px-[11px] py-[9px] ml-2 bg-gray-333-10 rounded-[17px] flex-1">
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
            <div className="font-medium text-gray-333-100 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
              vedicmarriage.ai
            </div>
            <div className="font-medium text-gray-333-60 text-[10px] tracking-[0] leading-[13px] whitespace-nowrap">
              /my-profile
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <div className="w-4 h-4 rounded-[5px] overflow-hidden border-[1.5px] border-solid border-gray-333-100">
            <div className="w-4 h-4 -top-0.5 -left-0.5 font-bold text-gray-333-100 text-[10px] text-center tracking-[0] leading-[normal]">
              1
            </div>
          </div>

          <img
            className="w-6 h-6"
            alt="More"
            src="/assets/images/img/more.png"
          />
        </div>
      </div>

      {/* Brand Header */}
      <div className="flex-col w-[390px] h-16 gap-2 px-[22px] py-2 top-24 bg-[#fff4e6] flex items-center justify-center absolute left-0">
        <div className="relative w-[175.12px] h-[30.01px]">
          <img
            className="absolute w-5 h-5 top-[3px] left-[9px]"
            alt="Clip path group"
            src="/assets/images/img/clip-path-group.png"
          />
          <img
            className="absolute w-12 h-3.5 top-[7px] left-[35px]"
            alt="Vector"
            src="/assets/images/img/vector.png"
          />
          <img
            className="absolute w-[77px] h-[18px] top-2 left-[89px]"
            alt="Vector"
            src="/assets/images/img/vector-1.png"
          />
        </div>
        <img
          className="absolute w-10 h-[62px] top-0 left-0"
          alt="Group"
          src="/assets/images/img/group-1000004396.png"
        />
        <img
          className="absolute w-10 h-[62px] top-0 right-0"
          alt="Group"
          src="/assets/images/img/group-1000004397.png"
        />
      </div>
    </header>
  );
}; 