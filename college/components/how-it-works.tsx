import { ClipboardList, Cpu, Trophy } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Enter Your Details",
    description:
      "Provide your entrance exam type, rank, budget, and location preferences. The more details you share, the better the recommendations.",
  },
  {
    icon: Cpu,
    title: "AI Analyzes Colleges",
    description:
      "Our recommendation engine cross-references your profile against 30+ top Indian colleges, scoring each on rank fit, budget, placements, and location.",
  },
  {
    icon: Trophy,
    title: "Get Ranked Results",
    description:
      "Receive a personalized list of colleges ranked by match score, with detailed insights on why each college is a good fit for you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How It Works
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Three simple steps to your dream college
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <step.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full">
                <span className="font-serif text-sm font-bold text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
