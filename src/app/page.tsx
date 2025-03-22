import PageLayout from "@/components/PageLayout";
import NowPlaying from "./_components/now-palying";
import Upcoming from "./_components/upcoming";

export default async function Home() {
  return (
    <PageLayout className="space-y-10">
      <div className="">
        <NowPlaying />
      </div>
      <div className="">
        <Upcoming />
      </div>
    </PageLayout>
  );
}
