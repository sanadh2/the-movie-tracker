import PageLayout from "@/components/PageLayout";
import NowPlaying from "./_components/now-palying";
import Upcoming from "./_components/upcoming";
import { auth } from "@/auth";
export default async function Home() {
  const session = await auth();
  console.log(session?.user);
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
