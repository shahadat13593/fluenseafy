import { Icon, type IconName } from "@/components/icons";
import { Logo } from "./logo";

const SOCIAL_LINKS: { name: string; icon: IconName; className: string }[] = [
  { name: "Instagram", icon: "logo-instagram", className: "instagram" },
  { name: "YouTube", icon: "logo-youtube", className: "youtube" },
  { name: "Facebook", icon: "logo-facebook", className: "facebook" },
];

// "#" marks pages that do not exist yet.
const FOOTER_COLUMNS = [
  {
    heading: "Site",
    links: [
      { label: "Home", href: "#home" },
      { label: "Courses", href: "#pricing" },
      { label: "English levels", href: "#progression" },
      { label: "Register", href: "#assessment" },
    ],
  },
  {
    heading: "Information",
    links: [
      { label: "About Us", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Terms of use", href: "#" },
      { label: "Privacy and cookies", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="section--footer">
      <div className="container grid grid--4--cols">
        <div className="logo-boxs">
          <Logo />
          <ul className="social-links">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.name}>
                <a
                  className={`footer-icon--link ${social.className}`}
                  href="#"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} className="footer-icon" />
                </a>
              </li>
            ))}
          </ul>
          <p className="copyright">
            Copyright &copy; <span className="year">2026</span> by Fluenseafy,
            Inc. All rights reserved.
          </p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading} className="col">
            <h2 className="footer-heading">{column.heading}</h2>
            <ul className="footer-lists">
              {column.links.map((link) => (
                <li key={link.label} className="footer-list">
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col">
          <h2 className="footer-heading">Contact Us</h2>
          <address className="address-box">
            <p className="address-text">Dhaka, Bangladesh</p>
            <p>
              <a href="tel:+8801631619100" className="footer-link">
                01631619100
              </a>
              <br />
              <a href="mailto:shahadat78789812@gmail.com" className="footer-link">
                shahadat78789812@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>
    </footer>
  );
}
