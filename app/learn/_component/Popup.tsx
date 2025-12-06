import { Token } from "../_lib/type";
import { CgSpinner } from "react-icons/cg";

const Popup = ({
  translation,
  t,
  isLoading,
}: {
  translation: any;
  t: Token;
  isLoading: boolean;
}) => {
  const entry = translation?.data?.[0];

  const formatPOS = (pos: string, d1: string) => {
    if (d1 && d1 !== "*" && d1 !== "一般" && d1 !== "自立") {
      return `${pos} (${d1}) `;
    }
    return pos;
  };

  return (
    <div
      className="p-3 rounded-lg shadow-lg w-72 text-white absolute bottom-28 z-10 bg-secondary font-poppins    
        before:content-['']
        before:absolute
        before:left-6
        before:-bottom-2
        before:w-0 before:h-0
        before:border-l-8 before:border-r-8 before:border-t-8
        before:border-transparent
        before:border-t-secondary"
    >
      <div className="mb-2">
        <h2 className="text-xl font-bold">{t.surface}</h2>
        <span className="text-xs text-gray-400 px-1 py-0.5 rounded-md bg-gray-700">
          {formatPOS(t.pos, t.pos_details_1)}
        </span>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <span className="text-sm text-gray-300">
          <span className="text-red-400">Hiragn </span>
          {t.reading_hira}
        </span>
        <span className="text-sm text-gray-300">
          <span className="text-blue-400">Katakn </span>
          {t.reading_kata}
        </span>
        <span className="text-sm text-gray-300">
          <span className="text-emerald-400">Romj </span>
          {t.romaji}
        </span>
      </div>

      {isLoading && (
        <div className="w-full flex justify-center py-4">
          <CgSpinner className="text-3xl animate-spin text-gray-300" />
        </div>
      )}

      {!isLoading && entry?.senses?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.senses.map((sense: any, idx: number) => (
            <span
              key={idx}
              className="text-sm px-2 py-1 rounded-md bg-gray-700"
            >
              {sense.english_definitions.join(", ")}
            </span>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-2 text-xs text-gray-500">
          {entry?.jlpt?.length ? `JLPT: ${entry.jlpt.join(", ")}` : ""}
          {entry?.is_common ? " • Common word" : ""}
        </div>
      )}
    </div>
  );
};

export default Popup;
