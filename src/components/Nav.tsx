"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RESUME } from "@/content/site";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/85 backdrop-blur-md transition-[border-color] duration-300 border-b ${
        scrolled ? "border-black/10" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          aria-label="Snigdha Nagpal, home"
          className="font-serif text-[28px] font-bold leading-none tracking-tight sm:text-[35px]"
        >
          SN
        </Link>

        <ul className="flex items-center gap-4 text-[15px] text-ink-70 sm:gap-8 sm:text-base">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-1 transition-colors hover:text-purple-600 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-purple-600 after:transition-transform after:duration-300 ${
                    active
                      ? "text-ink after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="relative py-1 transition-colors hover:text-purple-600"
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="rounded-pill border border-purple-600 px-3.5 py-1.5 font-medium text-purple-600 transition-colors hover:bg-purple-600 hover:text-white sm:px-4"
            >
              Say hi
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
