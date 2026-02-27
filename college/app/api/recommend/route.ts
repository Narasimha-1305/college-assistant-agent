import { NextResponse } from "next/server";
import {
  getRecommendations,
  type StudentPreferences,
} from "@/lib/recommendation-engine";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { exam, rank, maxBudget, region, preferredState, branch } =
      body as StudentPreferences;

    if (!exam || !rank || !maxBudget) {
      return NextResponse.json(
        { error: "Please provide exam, rank, and budget." },
        { status: 400 }
      );
    }

    if (rank < 1 || rank > 200000) {
      return NextResponse.json(
        { error: "Rank must be between 1 and 200,000." },
        { status: 400 }
      );
    }

    const preferences: StudentPreferences = {
      exam,
      rank: Number(rank),
      maxBudget: Number(maxBudget),
      region: region || "Any",
      preferredState: preferredState || "Any",
      branch: branch || "Any",
    };

    const recommendations = getRecommendations(preferences);

    const summary = generateSummary(preferences, recommendations.length);

    return NextResponse.json({
      success: true,
      summary,
      totalMatches: recommendations.length,
      recommendations,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function generateSummary(
  prefs: StudentPreferences,
  matchCount: number
): string {
  if (matchCount === 0) {
    return `We could not find matching colleges for ${prefs.exam} rank ${prefs.rank} within your criteria. Try adjusting your budget or location preferences.`;
  }

  const budgetLabel =
    prefs.maxBudget >= 2000000
      ? "generous"
      : prefs.maxBudget >= 1000000
        ? "moderate"
        : "budget-conscious";

  return `Based on your ${prefs.exam} rank of ${prefs.rank.toLocaleString("en-IN")} and a ${budgetLabel} total budget of Rs ${prefs.maxBudget.toLocaleString("en-IN")}, we found ${matchCount} college${matchCount > 1 ? "s" : ""} that match your preferences. The recommendations are ranked by overall fit including rank eligibility, affordability, placement record, and location match.`;
}
