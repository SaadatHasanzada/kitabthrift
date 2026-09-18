import Image, { type StaticImageData } from "next/image";

import fellowshipOfTheRing from "@/assets/images/fellowship-of-the-ring.png";
import projectHailMary from "@/assets/images/project-hail-mary.jpg";
import womenWhoRunWithTheWolves from "@/assets/images/woman-run-with-wolves.jpg";
import { cn } from "@/lib/utils";

interface Book {
  readonly src: StaticImageData;
  readonly alt: string;
  readonly sizes: string;
  readonly className: string;
}

const books: readonly Book[] = [
  {
    src: projectHailMary,
    alt: "Project Hail Mary book cover",
    sizes: "(min-width: 68rem) 118px, 78px",
    className:
      "w-[78px] desktop:w-[118px] -rotate-[7deg] rounded-sm bg-cover-clay shadow-xl hover:-translate-y-2.5 hover:shadow-2xl",
  },
  {
    src: fellowshipOfTheRing,
    alt: "The Fellowship of the Ring book cover",
    sizes: "(min-width: 68rem) 138px, 92px",
    className:
      "w-[92px] desktop:w-[138px] -translate-y-[18px] rounded-lg bg-cover-sage shadow-2xl hover:-translate-y-[28px]",
  },
  {
    src: womenWhoRunWithTheWolves,
    alt: "Women Who Run with the Wolves book cover",
    sizes: "(min-width: 68rem) 118px, 78px",
    className:
      "w-[78px] desktop:w-[118px] rotate-[7deg] rounded-sm bg-cover-linen shadow-xl hover:-translate-y-2.5 hover:shadow-2xl",
  },
];

const coverClassName =
  "relative z-10 aspect-[2/3] overflow-hidden transition-[translate,scale,box-shadow] duration-[280ms] hover:z-20 hover:scale-[1.07]";

export function BookStack({ className }: { readonly className?: string }) {
  return (
    <div className={cn("flex items-end gap-4 mt-6", className)}>
      {books.map((book) => (
        <div key={book.alt} className={cn(coverClassName, book.className)}>
          <Image
            src={book.src}
            alt={book.alt}
            fill
            sizes={book.sizes}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
