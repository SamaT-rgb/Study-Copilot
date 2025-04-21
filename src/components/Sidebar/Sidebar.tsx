import { LayoutDashboardIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Navigation handler function
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <aside className="flex w-72 h-[760px] flex-col items-start px-4 py-5 fixed top-[72px] left-0 bg-white border-r border-[#d7d9db]">
      <nav className="flex flex-col w-64 items-start gap-3 self-stretch">
        <Button
          variant="ghost"
          className={`flex items-center justify-start gap-4 p-3 w-full rounded ${
            currentPath === "/dashboard" 
              ? "bg-blue-50 text-[#1c40ca]" 
              : "text-primary-gray"
          } [font-family:'Source_Sans_Pro',Helvetica] font-normal text-base`}
          onClick={() => handleNavigation("/dashboard")}
        >
          <LayoutDashboardIcon className="w-5 h-5" />
          <span className="flex-1 text-left">Dashboard</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex items-center justify-start gap-4 p-3 w-full rounded ${
            currentPath === "/learning-path" 
              ? "bg-blue-50 text-[#1c40ca]" 
              : "text-primary-gray"
          } [font-family:'Source_Sans_Pro',Helvetica] font-normal text-base`}
          onClick={() => handleNavigation("/learning-path")}
        >
          <img className="w-5 h-5" alt="U analysis" src="/u-analysis.svg" />
          <span className="flex-1 text-left">My Learning Path</span>
        </Button>

        <Button
          variant="ghost"
          className={`flex items-center justify-start gap-4 p-3 w-full rounded ${
            currentPath === "/explore" 
              ? "bg-blue-50 text-[#1c40ca]" 
              : "text-primary-gray"
          } [font-family:'Source_Sans_Pro',Helvetica] font-normal text-base`}
          onClick={() => handleNavigation("/explore")}
        >
          <img className="w-5 h-5" alt="Language" src="/language.png" />
          <span className="flex-1 text-left">Explore</span>
        </Button>
      </nav>
    </aside>
  );
};