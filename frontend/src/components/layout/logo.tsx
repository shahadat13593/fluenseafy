import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ tone = "default" }: { tone?: "default" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Fluenseafy home"
      className="inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Image
        src="/img/logo.png"
        alt=""
        width={2480}
        height={2346}
        sizes="40px"
        className="h-9 w-auto"
        priority
      />
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          tone === "light" ? "text-white" : "text-brand-strong",
        )}
      >
        Fluenseafy
      </span>
    </Link>
  );
}
