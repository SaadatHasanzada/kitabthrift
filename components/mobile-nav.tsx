"use client";
import { useState } from "react";
import NavLinks from "./nav-links";
import { UserRound } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="desktop:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              aria-label="Toggle menu"
              className="w-6 h-6 flex justify-center flex-col gap-1.25 relative z-999 "
            >
              <span
                className={`w-full h-0.5 inline-block transition-transform duration-300 ease-out  ${isMenuOpen ? "bg-cream translate-y-1.75 -rotate-45" : "bg-maroon-deep"}`}
              ></span>
              <span
                className={`bg-maroon-deep w-full h-0.5 inline-block transition-opacity duration-200 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`w-full h-0.5 inline-block transition-transform duration-300 ease-out ${isMenuOpen ? "bg-cream -translate-y-1.75 rotate-45" : "bg-maroon-deep"}`}
              ></span>
            </button>
          }
        />

        <SheetContent
          side="right"
          className="w-[82%] max-w-[320px] border-0 bg-transparent shadow-none p-0 [&>button]:hidden"
        >
          <div
            className={`flex flex-col absolute top-0 w-full h-full  bg-maroon-deep px-6 py-9 overflow-hidden transition-position duration-300 ease-in-out ${
              isMenuOpen ? "right-0" : "-right-75"
            }`}
          >
            <span className="mb-4.5 mt-1 block text-[0.68rem] font-bold uppercase tracking-[0.16em] text-cream/55">
              Menu
            </span>
            <NavLinks
              onClick={() => setIsMenuOpen(false)}
              activeClassName="active-mobile"
              showIcon={true}
              itemClassName="border-t border-border py-4"
              className="flex flex-col font-medium text-[1.4rem] text-cream"
            />
            <div className="border-t border-border pt-6 mt-auto flex gap-3 items-center">
              <div className="flex desktop:hidden w-9 h-9 rounded-full border border-cream items-center justify-center">
                <UserRound className="text-cream" width={14} height={14} />
              </div>
              <span className="text-[0.85rem] text-cream/75">
                Signed in as Saadat
              </span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
