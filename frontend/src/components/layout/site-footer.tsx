import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Container } from "./container";
import { Logo } from "./logo";
import { NAV_LINKS } from "./nav-links";

const linkClass =
  "rounded-sm text-sm text-white/70 underline decoration-transparent decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-300 hover:text-white hover:decoration-white/50 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="grid gap-12 py-14 sm:py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Interact, learn and improve your English, one level at a time.
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2
            id="footer-explore"
            className="text-sm font-semibold tracking-wide text-white"
          >
            Explore
          </h2>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#assessment" className={linkClass}>
                Free assessment
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Contact us
          </h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p className="flex items-center gap-2.5 text-white/70">
              <MapPinIcon className="size-4 shrink-0" aria-hidden="true" />
              Dhaka, Bangladesh
            </p>
            <p>
              <a
                href="tel:+8801631619100"
                className={`${linkClass} inline-flex items-center gap-2.5`}
              >
                <PhoneIcon className="size-4 shrink-0" aria-hidden="true" />
                01631619100
              </a>
            </p>
            <p>
              <a
                href="mailto:shahadat78789812@gmail.com"
                className={`${linkClass} inline-flex items-center gap-2.5 break-all`}
              >
                <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                shahadat78789812@gmail.com
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-white/60">
          &copy; 2026 Fluenseafy, Inc. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
