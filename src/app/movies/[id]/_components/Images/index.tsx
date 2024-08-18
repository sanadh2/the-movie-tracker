"use client";
import useImages from "./useImages.hooks";
import MovieImage from "./movie-image";
interface Props {
  id: string | number;
}
export default function Images({ id }: Props) {
  const { data, isLoading, error } = useImages(id);

  return (
    <div className="mt-10">
      <h4>Images</h4>
      <div className=" overflow-scroll no-scrollbar">
        <div className="flex gap-3 ">
          {data?.backdrops?.map((img, index) => (
            <MovieImage img={img} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
