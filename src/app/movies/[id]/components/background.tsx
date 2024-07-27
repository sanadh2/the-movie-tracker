import Image from "next/image";
import { baseUrlImage } from "../../../../../config/tmdb";

export default function BackgroundImage({ backdrop }: { backdrop: string }) {
  return (
    <div className="fixed top-12 -left-5 -right-5 w-[110vw] h-svh -z-10 select-none">
      <Image
        src={baseUrlImage + "/w300/" + backdrop}
        alt="background image"
        fill
        loading="eager"
        priority={true}
        className="object-cover object-center dark:brightness-[0.3] blur-md select-none"
      />
    </div>
  );
}
