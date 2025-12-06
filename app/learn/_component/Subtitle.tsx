import { Token } from "../_lib/type";

const Subtitle = ({ t }: { t: Token }) => {
  const posColors: Record<string, string> = {
    名詞: "text-emerald-400", // noun
    動詞: "text-blue-400", // verb
    形容詞: "text-yellow-400", // adjective
    助詞: "text-pink-400", // partcile
    副詞: "text-purple-400", // adverb
  };

  const handleDefinitions = async (word: string) => {
    try {
      const response = await fetch(
        `/api/jisho?word=${encodeURIComponent(word)}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const color = posColors[t.pos] || "text-neutral-300";

  return (
    <div className="flex flex-col gap-1 items-start justify-end">
      {t.reading_hira !== t.surface ? (
        <span className="text-sm opacity-50">{t.reading_hira}</span>
      ) : (
        <span className="text-sm opacity-0"></span>
      )}

      <span
        onClick={() => handleDefinitions(t.surface)}
        className={`cursor-pointer hover:text-sky-400 text-2xl ${color}`}
      >
        {t.surface}
      </span>

      {/* <span className="text-xs opacity-60">{t.pos}</span> */}
    </div>
  );
};

export default Subtitle;
