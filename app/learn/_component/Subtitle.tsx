"use client";
import { useState } from "react";
import { Token } from "../_lib/type";
import Popup from "./Popup";
import { motion } from "framer-motion";

const Subtitle = ({ t, index }: { t: Token; index: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translation, setTranslation] = useState();

  const tokenVariants = {
    hidden: {
      opacity: 0,
      y: 6,
    },
    show: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -6,
    },
  };

  const posColors: Record<string, string> = {
    名詞: "text-emerald-400", // noun
    動詞: "text-blue-400", // verb
    形容詞: "text-yellow-400", // adjective
    助詞: "text-pink-400", // partcile
    副詞: "text-purple-400", // adverb
  };

  console.log(t);

  const handleDefinitions = async (word: string) => {
    setIsOpen(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/jisho?word=${encodeURIComponent(word)}`
      );
      const data = await response.json();
      setIsLoading(false);
      setTranslation(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const color = posColors[t.pos] || "text-neutral-300";

  return (
    <motion.div
      key={index}
      variants={tokenVariants}
      onMouseLeave={() => setIsOpen(false)}
      className="flex flex-col gap-1 items-start justify-end relative"
    >
      {isOpen && (
        <Popup t={t} translation={translation} isLoading={isLoading} />
      )}

      {t.reading_hira !== t.surface && (
        <span className="text-sm opacity-50 absolute bottom-10 w-96">{t.reading_hira}</span>
      )}

      <span
        onClick={() => handleDefinitions(t.surface)}
        className={`cursor-pointer hover:text-sky-400 text-2xl ${color}`}
      >
        {t.surface}
      </span>

      {/* <span className="text-xs opacity-60">{t.pos}</span> */}
    </motion.div>
  );
};

export default Subtitle;
