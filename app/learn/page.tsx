// Hello to whoever looking at this code right now ;')
// ZoneeoX was here ;D
"use client";
import { useEffect, useRef, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { HiOutlineCursorClick } from "react-icons/hi";
import { TbPlayerPlay } from "react-icons/tb";
import {
  extractYoutubeId,
  getTokenizer,
  tokenizeDetailed,
} from "./_lib/helper";
import YouTubePlayer from "youtube-player";
import { CgSpinner } from "react-icons/cg";
import Subtitle from "./_component/Subtitle";
import { ICurrentSubtitle, ISubtitle, Token } from "./_lib/type";
import { YouTubePlayer as YoutubePlayerTypes } from "youtube-player/dist/types";

const LearnPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [subtitles, setSubtitles] = useState<ISubtitle[]>([]);
  const [currentSubtitle, setCurrentSubtitle] =
    useState<ICurrentSubtitle | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const playerRef = useRef<YoutubePlayerTypes | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getTokenizer();
  }, []);

  const handleLoadUrl = async () => {
    const videoID = extractYoutubeId(videoUrl);
    setIsLoading(true);
    setCurrentSubtitle(null);
    setSubtitles([]);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    if (playerContainerRef.current) {
      playerRef.current = YouTubePlayer(playerContainerRef.current, {
        videoId: videoID || "",
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
        },
      });
    }

    const res = await fetch(`/api/subtitles?id=${videoID}`);
    const data = await res.json();
    const rawSubs = data.subtitles || [];

    const processed = await Promise.all(
      rawSubs.map(async (sub: ISubtitle) => {
        const tokens = await tokenizeDetailed(sub.text);
        return { ...sub, tokens };
      })
    );

    setSubtitles(processed);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!subtitles.length || !playerRef.current) return;

    intervalRef.current = setInterval(() => {
      playerRef.current?.getCurrentTime().then((time: number) => {
        const found = subtitles.find((sub) => {
          const start = parseFloat(sub.start);
          const end = start + parseFloat(sub.dur);
          return time >= start && time <= end;
        });
        setCurrentSubtitle(found || null);
      });
    }, 200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [subtitles]);

  return (
    <div className="max-w-5xl mx-auto py-6">
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

      <div
        ref={playerContainerRef}
        className="w-full aspect-video bg-black mt-6 rounded-xl overflow-hidden"
      />

      <div className="flex flex-1 h-40 bg-subtitle my-6 rounded-xl p-6 justify-center font-mplusrounded items-center border border-white/20">
        {isLoading ? (
          <i className="opacity-50 animate-spin font-poppins">
            <CgSpinner size={50} />
          </i>
        ) : currentSubtitle ? (
          <div
            className="flex flex-wrap gap-2"
            onMouseEnter={() => playerRef.current?.pauseVideo()}
            onMouseLeave={() => playerRef.current?.playVideo()}
          >
            {currentSubtitle?.tokens
              ?.filter(
                (t: Token) => t.base.trim() !== "" && t.surface.trim() !== ""
              )
              .map((t: Token, i: number) => (
                <Subtitle t={t} key={i} />
              ))}
          </div>
        ) : (
          <p className="opacity-50 text-4xl font-poppins">...</p>
        )}
      </div>

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
