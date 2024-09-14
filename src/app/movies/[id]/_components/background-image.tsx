import Image from "next/image";
import { baseUrlImage } from "../../../../../config/tmdb";
const BackgroundImage = async ({
  backdrop_path,
}: {
  backdrop_path: string | undefined;
}) => {
  return (
    <div className="max-h-[600px] overflow-hidden select-none">
      <div className="absolute -z-10 top-0 w-full">
        <div className="relative w-screen min-h-svh overflow-hidden blur brightness-[0.2]">
          <Image
            className=" object-contain object-center"
            alt="movie backdrop"
            fill
            loading="lazy"
            blurDataURL={baseUrlImage + "w300" + backdrop_path}
            sizes=""
            src={baseUrlImage + "w780" + backdrop_path}
          />
        </div>
      </div>
    </div>
  );
};
export default BackgroundImage;
