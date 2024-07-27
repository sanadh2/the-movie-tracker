import PageLayout from "@/components/PageLayout";
import PopularMovies from "./components/popular-movies";
import Watchlist from "./components/watchlist";
import NowPlaying from "./components/now-playing";
export default async function Home() {
  return (
    <PageLayout className="">
      <div className="mt-10 w-full flex lg:gap-32 xl:gap-40 flex-col lg:flex-row justify-between">
        <div className="w-full overflow-hidden bg-neutral-200 dark:bg-neutral-950 rounded-md p-3">
          <Watchlist />
        </div>
        <div className="w-full overflow-hidden bg-neutral-200 dark:bg-neutral-950 rounded-md p-3">
          <PopularMovies />
        </div>
      </div>
      <div className="w-full mt-20 bg-neutral-200 dark:bg-neutral-950 rounded-md p-3">
        <NowPlaying />
      </div>
    </PageLayout>
  );
}
