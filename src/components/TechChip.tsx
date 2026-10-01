import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { techs, type Tech, type TechId } from "@/data/techs";

export default function TechChip({
  id,
  iconOnly = false,
  className,
}: {
  id: TechId;
  /** just the icon (name as tooltip + screen-reader text); falls back to the chip if there's no icon */
  iconOnly?: boolean;
  className?: string;
}) {
  const { name, icon, mono }: Tech = techs[id];

  // hover: the chip lifts, the icon pops with a slight tilt (spring easing overshoots a touch)
  const iconMotion =
    "transition-transform duration-300 ease-spring group-hover/tech:scale-125 group-hover/tech:-rotate-8";

  const iconEl =
    icon &&
    (mono ? (
      // mask so the icon takes the surrounding text color on light and dark backgrounds
      <span
        aria-hidden="true"
        className={cn("size-[1.15em] shrink-0 bg-current", iconMotion)}
        style={{
          mask: `url(${icon.src}) center / contain no-repeat`,
          WebkitMask: `url(${icon.src}) center / contain no-repeat`,
        }}
      />
    ) : (
      <Image
        src={icon}
        alt=""
        width={24}
        height={24}
        className={cn("size-[1.15em] object-contain", iconMotion)}
      />
    ));

  if (iconOnly && iconEl) {
    return (
      <span
        title={name}
        className={cn(
          "group/tech inline-flex transition-transform duration-300 ease-spring hover:-translate-y-1",
          className,
        )}
      >
        {iconEl}
        <span className="sr-only">{name}</span>
      </span>
    );
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "group/tech h-auto gap-1.5 font-normal transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md hover:shadow-accent/20",
        className,
      )}
    >
      {iconEl}
      {name}
    </Badge>
  );
}
