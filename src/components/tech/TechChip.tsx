import Image from "next/image";
import { techs, type TechId } from "@/data/techs";

/** Rounded pill with a tech's icon and name. */
export default function TechChip({ id }: { id: TechId }) {
  const tech = techs[id];
  return (
    <span className="flex items-center gap-2 rounded-full border border-line py-1.5 pr-3.5 pl-2 text-sm">
      {"icon" in tech && tech.icon ? (
        <Image
          src={tech.icon}
          alt=""
          width={18}
          height={18}
          className="size-4.5 object-contain"
        />
      ) : (
        <span aria-hidden className="size-1.5 rounded-full bg-accent" />
      )}
      {tech.name}
    </span>
  );
}
