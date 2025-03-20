"use client";
import { ButtonHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import CountryLanguage from "@ladjs/country-language";
import { CastType, GenreType, MovieType } from "@/db/services/tmdb/types";
import Link from "next/link";
import { generateSlug } from "@/lib/slug";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CastsType = CastType[];
type Studio = MovieType["production_companies"];
type Countries = MovieType["production_countries"];
type CrewsType = MovieType["credits"]["crew"];
type Genres = GenreType[];
const TabValueButton = ({
  className,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) => {
  const Component = asChild ? "span" : "button";
  return (
    <Component
      {...props}
      className={cn(
        "px-1 py-0.5 border block text-xs whitespace-nowrap bg-neutral-700 rounded-sm",
        className
      )}
    />
  );
};

const Casts = ({ casts }: { casts: CastsType }) => {
  const [sliced, setSliced] = useState(true);
  const [updatedCasts, setUpdatedCasts] = useState(casts.slice(0, 20));
  return (
    <div className="flex gap-2 flex-wrap">
      {updatedCasts.map((cast) => (
        <Link href={"/cast/" + generateSlug(cast.name, cast.id)} key={cast.id}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <TabValueButton asChild>{cast.name}</TabValueButton>
              </TooltipTrigger>
              <TooltipContent className="bg-transparent backdrop-blur">
                <p>{cast.character}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
      {sliced && updatedCasts.length < casts.length && (
        <TabValueButton
          onClick={() => {
            setUpdatedCasts(casts);
            setSliced(false);
          }}
        >
          Show More...
        </TabValueButton>
      )}
    </div>
  );
};

const Genre = ({ genres }: { genres: Genres }) => {
  const [sliced, setSliced] = useState(true);
  const [updatedCasts, setUpdatedCasts] = useState(genres.slice(0, 20));

  return (
    <div className="flex gap-2 flex-wrap">
      {updatedCasts.map((genre) => (
        <Link href={"/genre?genreId=" + genre.id} key={genre.id}>
          <TabValueButton key={genre.id}>{genre.name}</TabValueButton>
        </Link>
      ))}
      {sliced && updatedCasts.length < genres.length && (
        <TabValueButton
          onClick={() => {
            setUpdatedCasts(genres);
            setSliced(false);
          }}
        >
          Show More...
        </TabValueButton>
      )}
    </div>
  );
};

const Data = ({
  job,
  jobSuffix = true,
  team,
}: {
  job: string;
  team: CrewsType | Studio | Countries;
  jobSuffix?: boolean;
}) => {
  return (
    <div className="flex w-full gap-2">
      <h5 className="flex w-full max-w-40 min-w-40 sm:min-w-64 sm:max-w-64 md:min-w-72 md:max-w-72 lg:min-w-80 lg:max-w-80 gap-2">
        <span className="uppercase whitespace-nowrap">
          {team.length > 1 && jobSuffix ? job + "s" : job}
        </span>
        <hr className="border-b bg-transparent border-muted-foreground/30 border-spacing-10 border-dotted mt-2 h-[1px] w-5/6" />
      </h5>
      <span className="flex gap-1 flex-wrap">
        {team.map((member) => (
          <TabValueButton key={member.name}>{member.name}</TabValueButton>
        ))}
      </span>
    </div>
  );
};

const Crews = ({ crews }: { crews: CrewsType }) => {
  const directors = crews.filter((crew) => crew.job === "Director");
  const producers = crews.filter((crew) => crew.job === "Producer");
  const story = crews.filter((crew) => crew.job?.toLowerCase() === "story");
  const writers = crews.filter((crew) => crew.job === "Screenplay");
  const cinematography = crews.filter(
    (crew) => crew.job === "Director of Photography"
  );
  const casting = crews.filter((crew) => crew.job === "Casting");
  const editors = crews.filter((crew) => crew.job === "Editor");
  return (
    <div className="mt-4 space-y-3">
      {directors.length > 0 && <Data job="Director" team={directors} />}
      {producers.length > 0 && <Data job="Producer" team={producers} />}
      {writers.length > 0 && (
        <Data job="ScreenPlay" team={writers} jobSuffix={false} />
      )}
      {story.length > 0 && <Data job="Story" team={story} jobSuffix={false} />}
      {cinematography.length > 0 && (
        <Data job="Cinematography" team={cinematography} jobSuffix={false} />
      )}
      {casting.length > 0 && (
        <Data job="Casting" team={casting} jobSuffix={false} />
      )}
      {editors.length > 0 && <Data job="Editor" team={editors} />}
    </div>
  );
};

const Details = ({
  studios,
  countries,
  primaryLanguage,
  spokenLanguages,
}: {
  studios: Studio;
  countries: Countries;
  primaryLanguage: string;
  spokenLanguages: MovieType["spoken_languages"];
}) => {
  return (
    <div className="mt-4 space-y-3">
      {studios.length > 0 && <Data job="Studio" team={studios} />}
      {countries.length > 0 && (
        <Data
          job="Countries"
          jobSuffix={false}
          team={countries
            .map((country) => CountryLanguage.getCountry(country.iso_3166_1))
            .map((country) => {
              return { iso_3166_1: country.code_2, name: country.name };
            })}
        />
      )}
      <div className="flex w-full gap-2">
        <h5 className="flex w-full max-w-40 min-w-40 sm:min-w-64 sm:max-w-64 md:min-w-72 md:max-w-72 lg:min-w-80 lg:max-w-80 gap-2">
          <span className="uppercase whitespace-nowrap">Primary Language</span>
          <hr className="border-b bg-transparent border-muted-foreground/30 border-spacing-10 border-dotted mt-2 h-[1px] w-5/6" />
        </h5>
        <span className="flex gap-1 flex-wrap">
          <TabValueButton>
            {CountryLanguage.getLanguage(primaryLanguage).name}
          </TabValueButton>
        </span>
      </div>
      <div className="flex w-full gap-2">
        <h5 className="flex w-full max-w-40 min-w-40 sm:min-w-64 sm:max-w-64 md:min-w-72 md:max-w-72 lg:min-w-80 lg:max-w-80 gap-2">
          <span className="uppercase whitespace-nowrap">Spoken Languages</span>
          <hr className="border-b bg-transparent border-muted-foreground/30 border-spacing-10 border-dotted mt-2 h-[1px] w-5/6" />
        </h5>
        <span className="flex gap-1 flex-wrap">
          {spokenLanguages.map((lang) => (
            <TabValueButton key={lang.iso_639_1}>
              {CountryLanguage.getLanguage(lang.iso_639_1).name}
            </TabValueButton>
          ))}
        </span>
      </div>
    </div>
  );
};

type Tab = "cast" | "crew" | "details" | "genres";
const tabs: Tab[] = ["cast", "crew", "details", "genres"];

export default function TabbedContent({ movie }: { movie: MovieType }) {
  const [selectedTab, setSelectedTab] = useState<Tab>("cast");

  return (
    <div className=" p-2 lg:max-w-[40rem] text-sm">
      <ul className="flex gap-2 mb-4 ">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`border-b ${
              selectedTab === tab
                ? "border-white"
                : "border-green-600 text-green-500"
            } `}
          >
            <button className="uppercase" onClick={() => setSelectedTab(tab)}>
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-xs overflow-hidden">
        {selectedTab === "cast" ? (
          <Casts key={"cast"} casts={movie.credits.cast} />
        ) : selectedTab === "crew" ? (
          <Crews crews={movie.credits.crew} />
        ) : selectedTab === "details" ? (
          <Details
            countries={movie.production_countries}
            studios={movie.production_companies}
            primaryLanguage={movie.original_language}
            spokenLanguages={movie.spoken_languages}
          />
        ) : selectedTab === "genres" ? (
          <Genre key={"genres"} genres={movie.genres} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
