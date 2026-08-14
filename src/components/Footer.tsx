const LINKS = ["Contact", "Waitlist", "Pricing", "Privacy Policy", "Terms of Service", "FAQ", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="font-display text-lg text-foreground">Soma</p>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-pointer text-xs text-foreground/55 transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>

        <p className="text-xs text-foreground/40">&copy; 2026 Soma. All rights reserved.</p>
      </div>
    </footer>
  );
}