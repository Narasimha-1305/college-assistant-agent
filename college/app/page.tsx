"use client";

import { useState, useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { PreferenceForm } from "@/components/preference-form";
import { HowItWorks } from "@/components/how-it-works";
import { ResultsSection } from "@/components/results-section";
import { SiteFooter } from "@/components/site-footer";
import type { RecommendedCollege } from "@/lib/recommendation-engine";
import type { ExamType } from "@/lib/college-data";

interface ApiResults {
  summary: string;
  totalMatches: number;
  recommendations: RecommendedCollege[];
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ApiResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (data: {
    exam: ExamType;
    rank: number;
    maxBudget: number;
    region: string;
    preferredState: string;
    branch: string;
  }) => {
    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (json.success) {
        setResults({
          summary: json.summary,
          totalMatches: json.totalMatches,
          recommendations: json.recommendations,
        });

        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        setError(json.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection onGetStarted={scrollToForm} />

        <HowItWorks />

        <div ref={formRef}>
          <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mx-auto max-w-3xl px-6 pb-8">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center text-sm text-destructive">
              {error}
            </div>
          </div>
        )}

        <div ref={resultsRef}>
          <ResultsSection results={results} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
