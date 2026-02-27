import { GraduationCap } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-foreground">
            CollegeAdvisor
          </span>
        </div>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
          <a
            href="#preferences"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
