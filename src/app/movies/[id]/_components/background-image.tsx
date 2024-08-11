import Image from "next/image";
import { baseUrlImage } from "../../../../../config/tmdb";
const BackgroundImage = async ({
  backdrop_path,
}: {
  backdrop_path: string | undefined;
}) => {
  return (
    <div className="max-h-[600px] overflow-hidden">
      <div className="absolute top-0 w-full">
        <div className="relative w-full aspect-video overflow-hidden mx-auto">
          <Image
            className=" object-contain -z-10 object-center"
            alt="movie backdrop"
            fill
            priority
            sizes=""
            src={baseUrlImage + "original" + backdrop_path}
          />
          <div className="asolute bg-gradient-to-r from-black via-transparent to-black h-full" />
          <div className="absolute bg-gradient-to-t from-black via-transparent to-black h-full " />
        </div>
      </div>
    </div>
  );
};
export default BackgroundImage;
