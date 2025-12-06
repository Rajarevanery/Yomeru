import kuromoji from "kuromoji";
import JishoAPI from "unofficial-jisho-api";
import { toHiragana, toRomaji } from "wanakana";

const jisho = new JishoAPI();

export function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function extractYoutubeId(url: string) {
  if (isValidUrl(url)) {
    const obj = new URL(url);

    if (obj.searchParams.has("v")) {
      return obj.searchParams.get("v");
    }
  } else {
    return url;
  }
}

let tokenizer: any = null;

export function getTokenizer(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (tokenizer) return resolve(tokenizer);

    kuromoji.builder({ dicPath: "/dict" }).build((err, tk) => {
      if (err) return reject(err);
      tokenizer = tk;
      resolve(tokenizer);
    });
  });
}

export async function tokenize(japanese_text: string) {
  try {
    const tokenizer = await getTokenizer();
    return tokenizer.tokenize(japanese_text);
  } catch (error) {
    console.error("Tokenizer error:", error);
    return [];
  }
}

export async function tokenizeDetailed(japanese_text: string) {
  const tokens = await tokenize(japanese_text);

  

  return tokens.map((t) => ({
    surface: t.surface_form,
    base: t.basic_form,
    reading_kata: t.reading || "",
    reading_hira: t.reading ? toHiragana(t.reading) : "",
    romaji: t.reading ? toRomaji(t.reading) : "",
    pos: t.pos,
  }));
}
