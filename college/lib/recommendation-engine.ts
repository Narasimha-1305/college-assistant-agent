import { colleges, type College, type ExamType } from "@/lib/college-data";

export interface StudentPreferences {
  exam: ExamType;
  rank: number;
  maxBudget: number;
  region: string;
  preferredState: string;
  branch: string;
}

export interface RecommendedCollege extends College {
  matchScore: number;
  matchReasons: string[];
  rankFit: "Excellent" | "Good" | "Moderate" | "Stretch";
  budgetFit: "Within Budget" | "Slightly Over" | "Over Budget";
}

function calculateMatchScore(
  college: College,
  prefs: StudentPreferences
): {
  score: number;
  reasons: string[];
  rankFit: RecommendedCollege["rankFit"];
  budgetFit: RecommendedCollege["budgetFit"];
} {
  let score = 0;
  const reasons: string[] = [];

  // 1. Rank eligibility (max 35 points)
  const rankPercentile = prefs.rank / college.maxRank;
  if (rankPercentile <= 0.3) {
    score += 35;
    reasons.push("Your rank places you among the top applicants for this college");
  } else if (rankPercentile <= 0.6) {
    score += 28;
    reasons.push("Your rank gives you a strong chance of admission");
  } else if (rankPercentile <= 0.85) {
    score += 20;
    reasons.push("Your rank is within the acceptance range");
  } else if (rankPercentile <= 1.0) {
    score += 12;
    reasons.push("Your rank is near the cutoff - competitive but possible");
  } else if (rankPercentile <= 1.15) {
    score += 5;
    reasons.push("Slightly above the typical cutoff - consider as a stretch option");
  }

  // Rank fit classification
  let rankFit: RecommendedCollege["rankFit"];
  if (rankPercentile <= 0.4) rankFit = "Excellent";
  else if (rankPercentile <= 0.7) rankFit = "Good";
  else if (rankPercentile <= 1.0) rankFit = "Moderate";
  else rankFit = "Stretch";

  // 2. Budget match (max 25 points)
  let budgetFit: RecommendedCollege["budgetFit"];
  if (college.totalFee <= prefs.maxBudget) {
    const budgetRatio = college.totalFee / prefs.maxBudget;
    if (budgetRatio <= 0.7) {
      score += 25;
      reasons.push("Well within your budget with significant savings potential");
    } else {
      score += 20;
      reasons.push("Fits within your budget");
    }
    budgetFit = "Within Budget";
  } else if (college.totalFee <= prefs.maxBudget * 1.15) {
    score += 10;
    reasons.push("Slightly over budget - scholarships may help");
    budgetFit = "Slightly Over";
  } else {
    score += 2;
    budgetFit = "Over Budget";
  }

  // 3. Location preference (max 15 points)
  if (prefs.preferredState !== "Any" && college.state === prefs.preferredState) {
    score += 15;
    reasons.push(`Located in your preferred state: ${college.state}`);
  } else if (prefs.region !== "Any" && college.region === prefs.region) {
    score += 10;
    reasons.push(`Located in your preferred region: ${college.region} India`);
  } else if (prefs.region === "Any") {
    score += 8;
  }

  // 4. Placement quality (max 15 points)
  if (college.placementRate >= 90) {
    score += 15;
    reasons.push(`Excellent placement rate: ${college.placementRate}%`);
  } else if (college.placementRate >= 80) {
    score += 10;
    reasons.push(`Good placement rate: ${college.placementRate}%`);
  } else {
    score += 5;
  }

  // 5. NIRF ranking bonus (max 10 points)
  if (college.nirfRanking <= 10) {
    score += 10;
    reasons.push(`NIRF Rank ${college.nirfRanking} - among India's best`);
  } else if (college.nirfRanking <= 25) {
    score += 7;
    reasons.push(`NIRF Rank ${college.nirfRanking} - highly reputed`);
  } else if (college.nirfRanking <= 50) {
    score += 4;
  }

  // 6. Branch availability bonus (5 points)
  if (
    prefs.branch !== "Any" &&
    college.branches.some((b) =>
      b.toLowerCase().includes(prefs.branch.toLowerCase())
    )
  ) {
    score += 5;
    reasons.push(`Offers your preferred branch: ${prefs.branch}`);
  }

  // Normalize to 100
  const normalizedScore = Math.min(Math.round((score / 105) * 100), 100);

  return { score: normalizedScore, reasons, rankFit, budgetFit };
}

export function getRecommendations(
  prefs: StudentPreferences
): RecommendedCollege[] {
  // Filter colleges by exam first
  let eligible = colleges.filter((c) => {
    if (prefs.exam === "Other") return true;
    return c.exam.includes(prefs.exam);
  });

  // Allow broader matching for JEE Main students
  if (prefs.exam === "JEE Main") {
    eligible = colleges.filter(
      (c) =>
        c.exam.includes("JEE Main") ||
        c.exam.includes("WBJEE") ||
        c.exam.includes("MHT-CET")
    );
  }

  // Score and rank all eligible colleges
  const scored = eligible
    .map((college) => {
      const { score, reasons, rankFit, budgetFit } = calculateMatchScore(
        college,
        prefs
      );
      return {
        ...college,
        matchScore: score,
        matchReasons: reasons,
        rankFit,
        budgetFit,
      } as RecommendedCollege;
    })
    .filter((c) => c.matchScore >= 20)
    .sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, 12);
}
