"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { examOptions, regionOptions, stateOptions } from "@/lib/college-data";
import type { ExamType } from "@/lib/college-data";
import { Search, Loader2 } from "lucide-react";

interface PreferenceFormProps {
  onSubmit: (data: {
    exam: ExamType;
    rank: number;
    maxBudget: number;
    region: string;
    preferredState: string;
    branch: string;
  }) => void;
  isLoading: boolean;
}

const branchOptions = [
  "Any",
  "Computer Science",
  "Electronics",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "AI & ML",
  "Data Science",
  "Information Technology",
  "Biotech",
  "Architecture",
];

export function PreferenceForm({ onSubmit, isLoading }: PreferenceFormProps) {
  const [exam, setExam] = useState<ExamType>("JEE Main");
  const [rank, setRank] = useState("");
  const [budget, setBudget] = useState([1000000]);
  const [region, setRegion] = useState("Any");
  const [preferredState, setPreferredState] = useState("Any");
  const [branch, setBranch] = useState("Any");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || Number(rank) < 1) return;
    onSubmit({
      exam,
      rank: Number(rank),
      maxBudget: budget[0],
      region,
      preferredState,
      branch,
    });
  };

  const formatBudget = (value: number) => {
    if (value >= 100000) {
      return `Rs ${(value / 100000).toFixed(1)} Lakh`;
    }
    return `Rs ${value.toLocaleString("en-IN")}`;
  };

  return (
    <section id="preferences" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Step 1
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Tell us about yourself
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in your details for personalized college recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {/* Exam & Rank */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="exam" className="text-sm font-medium text-foreground">
                  Entrance Exam
                </Label>
                <Select value={exam} onValueChange={(val) => setExam(val as ExamType)}>
                  <SelectTrigger id="exam" className="h-12 bg-background">
                    <SelectValue placeholder="Select exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rank" className="text-sm font-medium text-foreground">
                  Your Rank
                </Label>
                <Input
                  id="rank"
                  type="number"
                  placeholder="e.g. 5000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  min={1}
                  max={200000}
                  className="h-12 bg-background"
                  required
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Budget Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground">
                  Total Budget (4 years)
                </Label>
                <span className="rounded-md bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
                  {formatBudget(budget[0])}
                </span>
              </div>
              <Slider
                value={budget}
                onValueChange={setBudget}
                min={50000}
                max={5000000}
                step={50000}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Rs 50K</span>
                <span>Rs 50 Lakh</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Location Preferences */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="region" className="text-sm font-medium text-foreground">
                  Preferred Region
                </Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region" className="h-12 bg-background">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-foreground">
                  Preferred State
                </Label>
                <Select value={preferredState} onValueChange={setPreferredState}>
                  <SelectTrigger id="state" className="h-12 bg-background">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {stateOptions.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state === "Any" ? "Any State" : state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Branch Preference */}
            <div className="space-y-2">
              <Label htmlFor="branch" className="text-sm font-medium text-foreground">
                Preferred Branch
              </Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger id="branch" className="h-12 bg-background">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  {branchOptions.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b === "Any" ? "Any Branch" : b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !rank}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing colleges...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Find My Best Colleges
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
