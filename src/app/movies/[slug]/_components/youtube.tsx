export default function Youtube({ videoKey }: { videoKey: string }) {
  return (
    <div className="relative max-w-96 xl:w-96 w-full aspect-video">
      <iframe
        loading="lazy"
        src={"https://www.youtube.com/embed/" + videoKey}
        title="YouTube video player"
        allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-md size-full"
      />
    </div>
  );
}
