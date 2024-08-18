import { Backdrop } from "moviedb-promise";
import Image from "next/image";
import { baseUrlImage } from "../../../../../../config/tmdb";

interface Props {
  img: Backdrop;
}
export default function MovieImage({ img }: Props) {
  return (
    <div className="relative min-w-40 max-w-40 border hover:border-white">
      <Image
        alt=""
        src={baseUrlImage + "w780" + img.file_path}
        width={img.width}
        height={img.height}
        loading="lazy"
        quality={70}
        placeholder="blur"
        title="image"
        blurDataURL={baseUrlImage + "w300" + img.file_path}
        className="object-cover hover:opacity-90 "
      />
    </div>
  );
}
