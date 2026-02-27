"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { RecommendedCollege } from "@/lib/recommendation-engine";
import {
  MapPin,
  IndianRupee,
  TrendingUp,
  Award,
  ExternalLink,
  GraduationCap,
  Building2,
  CheckCircle2,
  Star,
} from "lucide-react";

function CollegeCard({
  college,
  index,
}: {
  college: RecommendedCollege;
  index: number;
}) {
  const rankFitColor: Record<string, string> = {
    Excellent: "bg-emerald-100 text-emerald-800",
    Good: "bg-sky-100 text-sky-800",
    Moderate: "bg-amber-100 text-amber-800",
    Stretch: "bg-red-100 text-red-800",
  };

  const budgetFitColor: Record<string, string> = {
    "Within Budget": "bg-emerald-100 text-emerald-800",
    "Slightly Over": "bg-amber-100 text-amber-800",
    "Over Budget": "bg-red-100 text-red-800",
  };

  const typeColor: Record<string, string> = {
    IIT: "bg-primary text-primary-foreground",
    NIT: "bg-accent/20 text-foreground",
    IIIT: "bg-secondary text-secondary-foreground",
    BITS: "bg-primary/80 text-primary-foreground",
    Private: "bg-muted text-muted-foreground",
    "State Government": "bg-muted text-muted-foreground",
    Deemed: "bg-muted text-muted-foreground",
    "Central University": "bg-muted text-muted-foreground",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Top rank badge */}
      {index < 3 && (
        <div className="absolute right-4 top-4 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground shadow-sm">
            #{index + 1}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Building2 className="h-7 w-7 text-secondary-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={typeColor[college.type] || "bg-muted text-muted-foreground"}
              >
                {college.type}
              </Badge>
              <Badge variant="outline" className="text-xs">
                NIRF #{college.nirfRanking}
              </Badge>
            </div>
            <h3 className="mt-1 truncate font-serif text-xl font-bold text-foreground">
              {college.shortName}
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {college.location}, {college.state}
            </p>
          </div>
        </div>

        {/* Match Score */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Match Score
            </span>
            <span className="font-serif text-lg font-bold text-foreground">
              {college.matchScore}%
            </span>
          </div>
          <Progress value={college.matchScore} className="h-2" />
        </div>

        <Separator className="my-5" />

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <IndianRupee className="h-3 w-3" />
              Total Fee
            </p>
            <p className="text-sm font-semibold text-foreground">
              {"Rs "}
              {(college.totalFee / 100000).toFixed(1)}
              {" Lakh"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Avg Package
            </p>
            <p className="text-sm font-semibold text-foreground">
              {"Rs "}
              {(college.placementAvg / 100000).toFixed(1)}
              {" LPA"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="h-3 w-3" />
              Highest Package
            </p>
            <p className="text-sm font-semibold text-foreground">
              {"Rs "}
              {(college.placementHighest / 100000).toFixed(0)}
              {" LPA"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <GraduationCap className="h-3 w-3" />
              Placement Rate
            </p>
            <p className="text-sm font-semibold text-foreground">
              {college.placementRate}%
            </p>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Fit indicators */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${rankFitColor[college.rankFit] || ""}`}
          >
            {"Rank: "}
            {college.rankFit}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${budgetFitColor[college.budgetFit] || ""}`}
          >
            {college.budgetFit}
          </span>
          {college.scholarships && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
              Scholarships
            </span>
          )}
        </div>

        {/* Match Reasons */}
        <div className="mt-4 space-y-1.5">
          {college.matchReasons.slice(0, 3).map((reason, i) => (
            <p
              key={i}
              className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              {reason}
            </p>
          ))}
        </div>

        {/* Branches preview */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Popular Branches
          </p>
          <div className="flex flex-wrap gap-1">
            {college.branches.slice(0, 4).map((b) => (
              <Badge
                key={b}
                variant="outline"
                className="text-xs font-normal"
              >
                {b}
              </Badge>
            ))}
            {college.branches.length > 4 && (
              <Badge variant="outline" className="text-xs font-normal">
                +{college.branches.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action */}
        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        >
          Visit Website
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

interface ResultsSectionProps {
  results: {
    summary: string;
    totalMatches: number;
    recommendations: RecommendedCollege[];
  } | null;
}

export function ResultsSection({ results }: ResultsSectionProps) {
  if (!results) return null;

  return (
    <section
      id="results"
      className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8"
    >
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-foreground">
          <Star className="h-4 w-4 text-accent" />
          {results.totalMatches} colleges matched
        </div>
        <h2 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
          Your Recommendations
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          {results.summary}
        </p>
      </div>

      {results.recommendations.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-border bg-card p-12 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
            No exact matches found
          </h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your budget, rank criteria, or location preferences.
          </p>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.recommendations.map((college, index) => (
            <CollegeCard key={college.id} college={college} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
