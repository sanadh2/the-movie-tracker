import Image from "next/image";
import { baseUrlImage } from "../../../../../../config/tmdb";
import { MovieImageType } from "@/db/services/tmdb/types";

interface Props {
  img: MovieImageType;
}
export default function MovieImage({ img }: Props) {
  return (
    <div className="text-xs relative min-w-40 max-w-40 border border-white transition-opacity duration-300 ease-in-out hover:border-white group-hover:opacity-60 group-hover:hover:opacity-100 opacity-90">
      <Image
        alt="image not loaded"
        src={baseUrlImage + "w500" + img.file_path}
        width={img.width ? img.width / 2 : img.width}
        height={img.height ? img.height / 2 : img.height}
        loading="lazy"
        quality={70}
        priority={false}
        placeholder="blur"
        blurDataURL={baseUrlImage + "w154" + img.file_path}
        className="object-cover "
      />
    </div>
  );
}
