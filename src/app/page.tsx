import PageLayout from "@/components/PageLayout";
import NowPlaying from "./_components/now-palying";
import Upcoming from "./_components/upcoming";
import { currentUser } from "@clerk/nextjs/server";
import moviedb from "@/db/moviedb";
export default async function Home() {
  const user = await currentUser();

  return (
    <PageLayout className="">
      {user && (
        <h3 className="mb-5">
          Welcome{" "}
          <span className="font-bold text-green-500 animate-pulse">
            @{user.username},
          </span>
        </h3>
      )}
      <div className="">
        <NowPlaying />
      </div>
      <div className="mt-10">
        <Upcoming />
      </div>
    </PageLayout>
  );
}
