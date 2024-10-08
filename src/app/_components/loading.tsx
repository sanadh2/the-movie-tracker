const Loading = () => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          className="aspect-[9/14] min-w-20 md:min-w-32 bg-neutral-800 animate-pulse"
          key={index}
        />
      ))}
    </div>
  );
};
export default Loading;
