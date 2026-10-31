import { Logo } from "./logo";

// "#" marks pages that do not exist yet.
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Courses", href: "#pricing" },
  { label: "Grammar", href: "#" },
  { label: "English levels", href: "#progression" },
  { label: "Vocabulary", href: "#" },
];

export function SiteHeader() {
  return (
    <header className="main-header">
      <Logo />
      <nav className="navbar" aria-label="Main">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="nav-link">
            {label}
          </a>
        ))}
      </nav>
      <div className="login-btn-box">
        <button type="button" className="btn btn--secondary">
          Login
        </button>
        <button type="button" className="btn btn--primary">
          Register
        </button>
      </div>
    </header>
  );
}
