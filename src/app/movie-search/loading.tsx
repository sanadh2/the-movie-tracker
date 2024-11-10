export default function Loader() {
  return (
    <div className="grid-container mt-10 gap-10">
      {Array.from({ length: 20 }).map((movie, index) => (
        <div key={index} className="w-full grid place-items-center">
          <div
            className={
              "h-40 md:h-60 lg:h-80 relative z-[5] aspect-[9/14] animate-pulse ease-in border-neutral-700 bg-neutral-900 rounded-sm lg:rounded-md"
            }
          />
          <div className="">
            <p className="ml-3 w-40  mt-2 h-2.5 bg-neutral-900 animate-pulse rounded-full" />
            <p className="ml-3 w-28 mt-2 h-2 bg-neutral-900 animate-pulse rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
