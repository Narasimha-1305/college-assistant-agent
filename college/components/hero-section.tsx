"use client";

import { GraduationCap, TrendingUp, MapPin, IndianRupee } from "lucide-react";

const stats = [
  { label: "Colleges in Database", value: "30+", icon: GraduationCap },
  { label: "Exam Types Supported", value: "10+", icon: TrendingUp },
  { label: "Regions Covered", value: "All India", icon: MapPin },
  { label: "Budget Optimized", value: "100%", icon: IndianRupee },
];

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            AI-Powered College Advisory
          </p>

          <h1 className="mt-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
            <span className="text-balance">Find your perfect college match</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Enter your entrance exam rank, budget, and location preferences.
            Our intelligent recommendation engine will find the best-fit colleges
            across India, tailored just for you.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              Get Recommendations
            </button>
            <a
              href="#how-it-works"
              className="rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
            >
              How It Works
            </a>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <stat.icon className="mb-3 h-6 w-6 text-accent" />
              <span className="font-serif text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 text-center text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
