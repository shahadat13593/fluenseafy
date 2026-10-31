import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:text-foreground focus-visible:outline-none"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Login stays disabled until authentication exists. */}
          <Button
            variant="ghost"
            disabled
            className="hidden sm:inline-flex"
            title="Login is not available yet"
          >
            Login
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href="#assessment">Register</a>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
