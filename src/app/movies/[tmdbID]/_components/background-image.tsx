import Image from "next/image";
import { baseUrlImage } from "../../../../../config/tmdb";
const BackgroundImage = async ({
  backdrop_path,
}: {
  backdrop_path: string | undefined;
}) => {
  if (!backdrop_path) return null;
  return (
    <div className="select-none">
      <div className="absolute -z-10 top-0 -left-10 right-0 w-full">
        <div className="relative w-svw h-svh max-h-svh max-w-[100svw] blur opacity-20 overflow-hidden">
          <Image
            className="object-cover object-center max-h-svh max-w-[100svw]"
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
