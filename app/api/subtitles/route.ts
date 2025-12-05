import { NextResponse } from "next/server";
import { getSubtitles } from "youtube-caption-extractor";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") || "";

    if (!id) {
      return NextResponse.json({ error: "Missing video ID" }, { status: 400 });
    }

    const subtitles = await getSubtitles({
      videoID: id,
      lang: "ja",
    });

    return NextResponse.json({ subtitles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
