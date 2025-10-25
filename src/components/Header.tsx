"use client"

import React from "react";
import { Link } from "react-router-dom";

export const Header = (): JSX.Element => {
  return (
    <header className="w-full bg-transparent">
      {/* Status Bar */}
      

      {/* Navigation Bar */}
      <div className="max-w-[390px] mx-auto w-full">
        {/* <div className="w-full h-16 bg-white-100 border-b border-[#dbdbdb] flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <img
              className="w-6 h-6"
              alt="Home"
              src="/assets/images/img/home.png"
            />

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
                <span className="font-['Roboto',Helvetica] font-medium text-gray-333-100 text-[10px] leading-[13px]">
                  vedicmarriage.ai
                </span>
                <span className="font-['Roboto',Helvetica] font-medium text-gray-333-60 text-[10px] leading-[13px]">
                  /my-profile
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-4 h-4 rounded-[5px] overflow-hidden border-[1.5px] border-solid border-gray-333-100 flex items-center justify-center">
              <span className="font-['Roboto',Helvetica] font-bold text-gray-333-100 text-[10px]">
                1
              </span>
            </div>
            <img
              className="w-6 h-6"
              alt="More"
              src="/assets/images/img/more.png"
            />
          </div>
        </div> */}

        {/* Brand Banner */}
        <div className="w-full h-16 flex items-center justify-center bg-[#fff4e6] relative">
          <Link to="/" className="cursor-pointer">
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
          </Link>

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
      </div>
    </header>
  );
}; 