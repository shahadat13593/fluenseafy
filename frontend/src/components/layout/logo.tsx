import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="logo-box">
      <Link href="/" aria-label="Fluenseafy home">
        <Image
          src="/img/logo.png"
          alt=""
          width={2480}
          height={2346}
          className="logo"
          priority
        />
      </Link>
      <span className="logo-text">Fluenseafy</span>
    </div>
  );
}
