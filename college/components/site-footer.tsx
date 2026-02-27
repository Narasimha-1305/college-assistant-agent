import { GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-base font-bold text-foreground">
              CollegeAdvisor AI
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Helping Indian students find their best-fit college with data-driven
            recommendations.
          </p>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            Data is indicative and based on publicly available information.
            Always verify with official college websites.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with care for students across India.
          </p>
        </div>
      </div>
    </footer>
  );
}
