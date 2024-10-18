"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Backdrop } from "moviedb-promise";
import MovieImage from "./movie-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { baseUrlImage } from "../../../../../../config/tmdb";

interface Props {
  img: Backdrop;
  imgs?: Backdrop[];
  index: number;
}
export default function ImageModal({ img, imgs, index }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <MovieImage img={img} />
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl bg-transparent border-none">
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
            <CarouselContent className="ml-0">
              {imgs?.map((img, index) => (
                <CarouselItem
                  key={index}
                  className="border relative aspect-video w-full  z-[2]"
                >
                  <Image
                    alt="image not loaded"
                    src={baseUrlImage + "w1280" + img.file_path}
                    fill
                    loading="lazy"
                    quality={70}
                    placeholder="blur"
                    blurDataURL={baseUrlImage + "w300" + img.file_path}
                    className="object-cover z-1"
                  />{" "}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
