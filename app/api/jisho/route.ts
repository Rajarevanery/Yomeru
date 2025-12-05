import JishoAPI from "unofficial-jisho-api";
const jisho = new JishoAPI();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word") ?? "";

  const result = await jisho.searchForPhrase(word);
  return Response.json(result);
}
