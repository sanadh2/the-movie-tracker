import PageLayout from "@/components/PageLayout";
import NowPlaying from "./_components/now-palying";
import Upcoming from "./_components/upcoming";

export default async function Home() {
  return (
    <PageLayout className="">
      <div className="">
        <NowPlaying />
      </div>
      <div className="mt-10">
        <Upcoming />
      </div>
    </PageLayout>
  );
}
