"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NAV_LINKS } from "./nav-links";

/** Slide-in navigation for screens below `lg`. The only client component in the header. */
export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(22rem,100%)] gap-0 p-0">
        <SheetHeader className="border-b p-5">
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex flex-col p-3">
          {NAV_LINKS.map(({ label, href }) => (
            <SheetClose asChild key={label}>
              <a
                href={href}
                className="rounded-lg px-3 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                {label}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t p-5">
          <SheetClose asChild>
            <Button asChild size="lg">
              <a href="#assessment">Register</a>
            </Button>
          </SheetClose>
          <Button variant="outline" size="lg" disabled>
            Login
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Accounts are not open yet.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
