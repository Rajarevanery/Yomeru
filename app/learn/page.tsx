import React from "react";
import { BsYoutube } from "react-icons/bs";
import { HiOutlineCursorClick } from "react-icons/hi";
import { TbPlayerPlay } from "react-icons/tb";

const LearnPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* URL Input */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-row border-white/20 bg-input items-center border p-3 rounded-lg gap-4 flex-1">
          <i className="text-neutral-500">
            <BsYoutube size={30} />
          </i>
          <input
            type="text"
            placeholder="Place Youtube URL Here..."
            className="font-comfortaa w-full border-none text-sm outline-none"
          />
        </div>
        <button className="bg-red-500 p-4 rounded-lg flex flex-row gap-4 items-center cursor-pointer">
          <i>
            <TbPlayerPlay size={20} />
          </i>
          <span className="font-poppins">Load URL</span>
        </button>
      </div>

      {/* YOUTUBE VIDEO */}
      <div className="w-full aspect-video bg-black mt-6 rounded-xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Subtitle */}
      <div className="flex flex-1 h-40 bg-subtitle my-6 rounded-xl"></div>

      {/* How To Use */}
      <div className="flex flex-1 bg-secondary my-6 rounded-xl p-6 border border-white/10">
        <div className="flex flex-row gap-4">
          <i className="bg-slate-700/50 p-3 h-fit rounded-xl">
            <HiOutlineCursorClick size={25} className="opacity-50" />
          </i>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">How to use</h2>
            <p className="text-sm text-text-secondary">
              Play the video and hover over any Japanese word in the subtitles
              below to see its English definition. The app uses the Jisho
              dictionary to provide accurate meanings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
