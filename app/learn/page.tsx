// Hello to whoever looking at this code right now ;')
// ZoneeoX was here ;D
"use client";
import { useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { HiOutlineCursorClick } from "react-icons/hi";
import { TbPlayerPlay } from "react-icons/tb";
import { extractYoutubeId } from "./_lib/helper";

const LearnPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [iframeUrl, setiframeUrl] = useState<string>("");
  const [subtitles, setSubtitles] = useState<string>("");

  const handleLoadUrl = async () => {
    const extractID = extractYoutubeId(videoUrl);
    setiframeUrl(`https://www.youtube.com/embed/${extractID}`);

    const res = await fetch(`/api/subtitles?id=${extractID}`);
    const data = await res.json();
    console.log("sub gaming:", data.subtitles);

    
  };

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
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Place Youtube URL or ID Here..."
            className="font-comfortaa w-full border-none text-sm outline-none"
          />
        </div>
        <button
          onClick={handleLoadUrl}
          className="bg-red-500 p-4 rounded-lg flex flex-row gap-4 items-center cursor-pointer"
        >
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
          src={`${iframeUrl || "https://www.youtube.com/embed/L4VlDU-zIRk"}`}
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
            <h2 className="text-lg font-semibold font-poppins">How to use</h2>
            <p className="text-sm text-text-secondary font-poppins">
              Play the video and hover over any Japanese word in the subtitles
              below to see its English definition. The app uses the Jisho
              dictionary to provide accurate meanings.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 bg-red-600/20 my-6 rounded-xl p-6 border border-white/10">
        <div className="flex flex-row gap-4">
          <i className="bg-red-700/50 p-3 h-fit rounded-xl">
            <CiWarning size={25} className="opacity-50" />
          </i>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold font-poppins">
              IN DEVELOPMENT
            </h2>
            <p className="text-sm text-text-secondary font-poppins">
              Any mistranslations or incorrect definitions may occur because the
              app is still in active development. Some words or phrases might
              not be recognized, and certain subtitles may not parse correctly.
              Thanks for your patience as the features continue to improve.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto opacity-50 text-sm w-fit font-comfortaa">
        App developed by ZoneeoX
      </p>
    </div>
  );
};

export default LearnPage;
