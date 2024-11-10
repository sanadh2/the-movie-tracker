import { ImagesType } from "@/db/services/tmdb/types";
import ImageModal from "./modal";
interface Props {
  images: ImagesType;
}
export default function ImageList({ images }: Props) {
  return (
    <div className="mt-10">
      <h4 className="mb-5">Images</h4>(
      <div className=" overflow-scroll no-scrollbar">
        <div className="flex gap-3 group">
          {images.backdrops.map((img, index) => (
            <ImageModal
              key={index}
              img={img}
              imgs={images.backdrops}
              index={index}
            />
          ))}
        </div>
      </div>
      )
    </div>
  );
}
