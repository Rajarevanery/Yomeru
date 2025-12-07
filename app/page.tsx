import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans flex items-center justify-center">
      <main className="w-full max-w-4xl px-8 py-32 flex flex-col gap-24">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-5xl font-bold font-comfortaa text-text-primary">
            読める<span className="text-red-500">Yomeru</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-xl">
            Learn Japanese by watching videos. Hover subtitles, see meanings
            instantly no AI, no MT, just pure dictionary.
          </p>
        </header>

        <section className="w-full flex flex-col sm:flex-row sm:items-center gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-3xl font-semibold text-text-primary">
              Every Japanese video becomes readable.
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Kotoba loads a YouTube video with Japanese captions, splits the
              subtitles into words using a tokenizer, and shows clean dictionary
              meanings on hover.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="p-6 rounded-xl bg-secondary border border-primary">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              1. Load a YouTube video
            </h3>
            <p className="text-text-secondary">
              Play YouTube videos directly inside Kotoba using the YouTube
              Player API.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-secondary border border-primary">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              2. Fetch Japanese subtitles
            </h3>
            <p className="text-text-secondary">
              Retrieve captions, parse them, and sync them to the video in
              real-time.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-secondary border border-primary">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              3. Split subtitles into words
            </h3>
            <p className="text-text-secondary">
              Japanese has no spaces Kotoba uses a tokenizer to break sentences
              into words.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-secondary border border-primary">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              4. See meanings on hover
            </h3>
            <p className="text-text-secondary">
              Hover any word to instantly see definitions from a real
              dictionary.
            </p>
          </div>
        </section>

        <section className="flex justify-center">
          <Link
            href={"/learn"}
            className="px-8 py-4 rounded-xl bg-red-500 cursor-pointer hover:brightness-90 transition text-text-primary font-semibold text-lg"
          >
            Start Watching
          </Link>
        </section>
      </main>
    </div>
  );
}
