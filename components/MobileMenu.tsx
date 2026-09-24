"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export type MobileMenuItem = { href: string; label: string };

export const primaryMenuItems: MobileMenuItem[] = [
  { href: "/roofing-chicago/", label: "Roofing" },
  { href: "/storm-damage-restoration-chicago/", label: "Storm Damage" },
  { href: "/restoration/", label: "Restoration" },
  { href: "/projects/", label: "Projects" },
  { href: "/service-areas/", label: "Service Areas" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

/**
 * Disclosure-style mobile navigation: a real <button> with aria-expanded/aria-controls,
 * Escape to close, focus moved into the panel on open and returned to the button on close,
 * Tab kept inside button + panel while open, and body scroll locked.
 */
export default function MobileMenu({ items = primaryMenuItems, className = "" }: { items?: MobileMenuItem[]; className?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !panel || !buttonRef.current) return;
      const focusables = [buttonRef.current, ...Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 1181px)");
    const onResize = () => { if (mediaQuery.matches) setOpen(false); };

    document.addEventListener("keydown", onKeyDown);
    mediaQuery.addEventListener("change", onResize);
    document.documentElement.classList.add("mobileMenuOpen");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mediaQuery.removeEventListener("change", onResize);
      document.documentElement.classList.remove("mobileMenuOpen");
    };
  }, [open, close]);

  return (
    <div className={`mobileMenu ${className}`.trim()}>
      <button
        ref={buttonRef}
        type="button"
        className="mobileMenuButton"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mobileMenuIcon" aria-hidden="true"><span /><span /><span /></span>
        <span className="mobileMenuLabel">{open ? "Close" : "Menu"}</span>
      </button>
      <div ref={panelRef} id={panelId} className="mobileMenuPanel" hidden={!open}>
        <nav aria-label="Mobile navigation">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => close(false)} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobileMenuActions">
          <Link className="mobileMenuEstimate" href="/estimate/" onClick={() => close(false)}>Start a request</Link>
          <a className="mobileMenuCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </div>
    </div>
  );
}
