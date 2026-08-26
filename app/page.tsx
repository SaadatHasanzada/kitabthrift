import { Search, UserRound } from "lucide-react";
import NavLinks from "@/components/nav-links";
import MobileNav from "@/components/mobile-nav";
import Logo from "@/components/logo";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className=" overflow-hidden relative flex flex-1 w-full  flex-col items-center justify-between py-5 md:py-8 px-4 md:px-10 desktop:px-20 bg-background sm:items-start">
        <nav className="flex flex-col desktop:flex-row items-center justify-between w-full  gap-2 desktop:gap-8">
          <div className="flex w-full desktop:w-auto items-center justify-between">
            <Logo />
            <MobileNav />
          </div>

          <NavLinks className="hidden desktop:flex gap-10" />
          <div className="flex w-full desktop:w-auto gap-6 items-center flex-1  max-w-xl desktop:flex-0 min-w-0 desktop:min-w-auto">
            <div className="w-full min-w-0 desktop:w-auto flex items-center gap-2 rounded-full bg-gold/30 px-4 desktop:px-5 py-2 desktop:py-3">
              <Search className="w-5 h-5 shrink-0 text-maroon-deep" />
              <input
                name="Search"
                type="text"
                placeholder="Search all books..."
                className="font-sans text-base min-w-62.5 text-maroon-deep bg-transparent  flex-1 focus:outline-none placeholder:text-espresso/50"
              />
            </div>
            <div className="hidden desktop:flex w-12 h-12 rounded-full border border-maroon-deep items-center justify-center transition-colors duration-300 hover:bg-maroon-deep/10 hover:border-maroon-deep/40 cursor-pointer">
              <UserRound className="text-maroon-deep" width={26} height={26} />
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
