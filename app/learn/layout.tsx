import React from "react";
import { BiBook } from "react-icons/bi";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="py-4 flex flex-row max-w-5xl mx-auto items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <i className="bg-orange-600 p-3 rounded-lg">
            <BiBook size={25} />
          </i>
          <div className="flex flex-col">
            <h1 className="text-text-primary font-semibold text-2xl font-poppins">
              言葉<span className="text-red-500">Kotoba</span>
            </h1>
            <span className="text-text-secondary font-comfortaa">
              Learn Japanese from videos
            </span>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-red-600 w-2 h-2 rounded-full animate-pulse" />
          <p className="text-text-secondary font-poppins">
            Hover words for definitions
          </p>
        </div>
      </nav>

      <hr className="opacity-20" />
      <div className="">{children}</div>
    </div>
  );
};

export default layout;
