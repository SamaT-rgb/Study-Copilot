import React from "react";

export const ChatbotButton = (): JSX.Element => {
  return (
    <div className="absolute w-[57px] h-[57px] top-[649px] left-[869px] bg-[#ff7b00] rounded-[28.5px] shadow-[0px_4px_4px_#00000040] flex items-center justify-center cursor-pointer">
      <img
        className="w-[37px] h-[37px] object-cover"
        alt="Chatbot"
        src="/chatbot--1--1.png"
      />
    </div>
  );
};