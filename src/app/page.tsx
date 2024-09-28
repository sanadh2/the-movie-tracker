"use client";
import PageLayout from "@/components/PageLayout";
import NowPlaying from "./_components/now-palying";
import Upcoming from "./_components/upcoming";
import { useAuth } from "./contexts/auth-context";

export default function Home() {
  const { user } = useAuth();
  return (
    <PageLayout className="">
      {user && (
        <h3 className="mb-5">
          Welcome{" "}
          <span className="font-bold text-green-500 animate-pulse">
            @{user.name},
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
