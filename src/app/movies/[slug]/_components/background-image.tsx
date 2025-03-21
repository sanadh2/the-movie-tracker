import Image from "next/image";
import { baseUrlImage } from "../../../../../config/tmdb";

const BackgroundImage = async ({
  backdrop_path,
}: {
  backdrop_path: string | undefined | null;
}) => {
  if (!backdrop_path) return null;
  return (
    <div className="select-none overflow-hidden">
      <div className="absolute w-full top-0 left-0 -z-10">
        <div className="relative w-full h-svh max-h-svh max-w-full blur opacity-20 overflow-hidden">
          <Image
            className="object-cover object-center max-h-svh"
            alt="movie backdrop"
            fill
            src={baseUrlImage + "w300" + backdrop_path}
          />
        </div>
      </div>
    </div>
  );
};
export default BackgroundImage;
