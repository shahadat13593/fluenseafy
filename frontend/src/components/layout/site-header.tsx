import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="header-surface sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link relative rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 after:ease-smooth hover:text-foreground hover:after:scale-x-100 focus-visible:text-foreground focus-visible:outline-none focus-visible:after:scale-x-100 active:text-primary"
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
