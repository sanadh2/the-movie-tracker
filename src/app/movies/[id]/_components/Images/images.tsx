"use client";
import useImages from "./useImages.hooks";
import ImageModal from "./modal";
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
            {[1, 1, 1, 1]
              .map((v, i, a) => a)
              .flat()
              .map((_, index) => (
                <div
                  key={index}
                  className="min-w-40 aspect-video border border-white"
                />
              ))}
          </div>
        </div>
      ) : (
        <div className=" overflow-scroll no-scrollbar">
          <div className="flex gap-3 group">
            {data?.backdrops?.map((img, index) => (
              <ImageModal
                key={index}
                img={img}
                imgs={data?.backdrops}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
