"use client";
import { useState } from "react";

export default function Youtube({ videoKey }: { videoKey: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative max-w-96 xl:w-96 w-full aspect-video">
      <iframe
        loading="lazy"
        onLoad={() => setLoaded(true)}
        src={"https://www.youtube.com/embed/" + videoKey}
        title="YouTube video player"
        allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-md size-full"
      />
      {!loaded && (
        <div className="absolute top-1/2 left-1/2 size-full border rounded-md flex justify-center items-center -translate-y-1/2 -translate-x-1/2">
          Loading...
        </div>
      )}
    </div>
  );
}
