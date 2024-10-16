"use client";
import useImages from "./useImages.hooks";
import MovieImage from "./movie-image";
interface Props {
  id: string | number;
}
export default function Images({ id }: Props) {
  const { data, isLoading, error } = useImages(id);
  if (error) throw error;
  return (
    <div className="mt-10">
      <h4 className="mb-5">Images</h4>
      {isLoading ? (
        <div className=" overflow-scroll no-scrollbar">
          <div className="flex gap-3 ">
            {[1, 1, 1, 1, 1, 1].map((_, index) => (
              <div key={index} className="w-40 aspect-video" />
            ))}
          </div>
        </div>
      ) : (
        <div className=" overflow-scroll no-scrollbar">
          <div className="flex gap-3 ">
            {data?.backdrops?.map((img, index) => (
              <MovieImage img={img} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
