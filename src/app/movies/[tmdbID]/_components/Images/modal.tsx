"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { baseUrlImage } from "../../../../../../config/tmdb";
import MovieImage from "./movie-image";
import { MovieImageType } from "@/db/services/tmdb/types";

interface Props {
  img: MovieImageType;
  imgs: MovieImageType[];
  index: number;
}
export default function ImageModal({ img, imgs, index }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <MovieImage img={img} />
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-md max-h-[80%] xl:max-w-sc outline-nonereen-lg 2xl:max-w-screen-xl bg-transparent border-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <Carousel
            orientation="horizontal"
            opts={{
              startIndex: index,
            }}
          >
            <CarouselContent className="">
              {imgs?.map((img, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className=" relative z-[2] max-w-fit"
                  >
                    <Image
                      alt="image not loaded"
                      src={baseUrlImage + "original" + img.file_path}
                      width={1080}
                      height={720}
                      loading="lazy"
                      quality={70}
                      priority={false}
                      placeholder="blur"
                      blurDataURL={baseUrlImage + "w154" + img.file_path}
                      className="object-cover z-[1] object-center aspect-video border"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
