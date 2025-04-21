import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";

export const Header = (): JSX.Element => {
  return (
    <header className="flex w-full h-[72px] items-center justify-between fixed top-0 left-0 bg-white border-b border-[#d7d9db] z-10">
      <div className="flex w-[287px] items-center gap-2.5 px-4">
        <h1 className="text-[#35424d] text-[33px] font-semibold [font-family:'Source_Sans_Pro',Helvetica]">
          Study Copilot
        </h1>
      </div>

      <div className="flex items-center justify-end gap-4 px-12">
        {/* <div className="flex w-60 h-8 items-center gap-2 px-2 relative rounded border border-solid border-[#c2c6ca]">
          <img className="w-4 h-4" alt="Search" src="/search.png" />
          <Input
            className="border-0 h-6 p-0 text-[13px] [font-family:'Source_Sans_Pro',Helvetica] text-[#868e94] placeholder:text-[#868e94] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search anything..."
          />
        </div> */}

        <Button
          variant="outline"
          className="h-8 px-3 py-2 border-2 border-[#1c40ca] rounded text-[#1c40ca] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-base"
        >
          Edit Goal
        </Button>

        <Avatar className="w-8 h-8">
          <AvatarImage src="/shape-3.png" alt="User profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};