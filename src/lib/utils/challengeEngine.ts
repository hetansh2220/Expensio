import type { Profession, IncomeType } from "@/types/user";

export interface ChallengeSuggestion {
  title: string;
  description: string;
  targetAmount: number;
  frequency: "daily" | "weekly";
  perPeriodTarget: number;
  durationDays: number;
}

export function generateChallengeSuggestions(
  monthlyIncome: number,
  totalExpenses: number,
  profession: Profession,
  incomeType: IncomeType
): ChallengeSuggestion[] {
  const suggestions: ChallengeSuggestion[] = [];
  const disposable = monthlyIncome - totalExpenses;
  const dailySaveBase = Math.max(50, Math.round((monthlyIncome * 0.01) / 10) * 10);

  suggestions.push({
    title: "30-Day Savings Sprint",
    description: `Save ₹${dailySaveBase} every day for 30 days. Small steps lead to big savings!`,
    targetAmount: dailySaveBase * 30,
    frequency: "daily",
    perPeriodTarget: dailySaveBase,
    durationDays: 30,
  });

  const weeklySave = Math.max(200, Math.round((monthlyIncome * 0.05) / 100) * 100);
  suggestions.push({
    title: "Weekly Wealth Builder",
    description: `Set aside ₹${weeklySave} each week. In 4 weeks you'll have ₹${weeklySave * 4}!`,
    targetAmount: weeklySave * 4,
    frequency: "weekly",
    perPeriodTarget: weeklySave,
    durationDays: 28,
  });

  const roundUpTarget = Math.max(100, Math.round((monthlyIncome * 0.02) / 10) * 10);
  suggestions.push({
    title: "Round-Up Saver",
    description: `Round up every expense and save ₹${roundUpTarget} daily. Painless saving!`,
    targetAmount: roundUpTarget * 14,
    frequency: "daily",
    perPeriodTarget: roundUpTarget,
    durationDays: 14,
  });

  suggestions.push({
    title: "No-Takeout Fortnight",
    description: "Cook at home for 14 days. Save what you'd spend on food delivery!",
    targetAmount: Math.max(500, Math.round((monthlyIncome * 0.03) / 100) * 100),
    frequency: "daily",
    perPeriodTarget: Math.max(50, Math.round((monthlyIncome * 0.002) / 10) * 10),
    durationDays: 14,
  });

  const coffeeDaily = Math.max(30, Math.round((monthlyIncome * 0.005) / 10) * 10);
  suggestions.push({
    title: "Skip the Coffee",
    description: `Save ₹${coffeeDaily}/day by skipping that daily coffee or snack for 21 days.`,
    targetAmount: coffeeDaily * 21,
    frequency: "daily",
    perPeriodTarget: coffeeDaily,
    durationDays: 21,
  });

  const weeklyMini = Math.max(100, Math.round((monthlyIncome * 0.02) / 50) * 50);
  suggestions.push({
    title: "52-Week Mini",
    description: `Save ₹${weeklyMini} every week for 4 weeks. A quick win to build momentum!`,
    targetAmount: weeklyMini * 4,
    frequency: "weekly",
    perPeriodTarget: weeklyMini,
    durationDays: 28,
  });

  if (totalExpenses > monthlyIncome * 0.6) {
    suggestions.push({
      title: "Wants-Free Week",
      description: "Avoid all 'wants' spending for 7 days. Only spend on needs and EMIs.",
      targetAmount: Math.round(totalExpenses * 0.1),
      frequency: "daily",
      perPeriodTarget: Math.round((totalExpenses * 0.1) / 7),
      durationDays: 7,
    });

    const cutBack = Math.max(200, Math.round((totalExpenses * 0.05) / 100) * 100);
    suggestions.push({
      title: "Expense Detox",
      description: `Cut back ₹${cutBack} per week from non-essential spending for 3 weeks.`,
      targetAmount: cutBack * 3,
      frequency: "weekly",
      perPeriodTarget: cutBack,
      durationDays: 21,
    });
  }

  if (profession === "student") {
    suggestions.push({
      title: "Micro Saver",
      description: "Save just ₹20 per day. It adds up to ₹600 in a month!",
      targetAmount: 600,
      frequency: "daily",
      perPeriodTarget: 20,
      durationDays: 30,
    });

    suggestions.push({
      title: "Textbook Fund",
      description: "Save ₹50 daily for 2 weeks to build a ₹700 fund for books or supplies.",
      targetAmount: 700,
      frequency: "daily",
      perPeriodTarget: 50,
      durationDays: 14,
    });
  }

  if (profession === "freelancer") {
    const gig = Math.max(500, Math.round(disposable * 0.1 / 100) * 100);
    suggestions.push({
      title: "Freelance Buffer Fund",
      description: `Save ₹${gig} weekly to build a buffer for slow months.`,
      targetAmount: gig * 4,
      frequency: "weekly",
      perPeriodTarget: gig,
      durationDays: 28,
    });
  }

  if (profession === "business_owner") {
    const bizSave = Math.max(1000, Math.round((monthlyIncome * 0.08) / 500) * 500);
    suggestions.push({
      title: "Business Emergency Fund",
      description: `Set aside ₹${bizSave} weekly to build a business safety net.`,
      targetAmount: bizSave * 4,
      frequency: "weekly",
      perPeriodTarget: bizSave,
      durationDays: 28,
    });
  }

  if (incomeType === "variable") {
    const savePct = Math.max(500, Math.round(disposable * 0.15 / 100) * 100);
    suggestions.push({
      title: "Income Boost Saver",
      description: `Save ₹${savePct} from each payment you receive this month.`,
      targetAmount: savePct * 4,
      frequency: "weekly",
      perPeriodTarget: savePct,
      durationDays: 28,
    });
  }

  if (monthlyIncome >= 50000) {
    const bigSave = Math.round((monthlyIncome * 0.1) / 1000) * 1000;
    suggestions.push({
      title: "Power Saver Challenge",
      description: `Save ₹${bigSave} this month by cutting discretionary spending.`,
      targetAmount: bigSave,
      frequency: "weekly",
      perPeriodTarget: Math.round(bigSave / 4),
      durationDays: 30,
    });
  }

  if (monthlyIncome < 20000) {
    suggestions.push({
      title: "Penny Pincher",
      description: "Save ₹10 every day for 30 days. Even ₹300 is a win!",
      targetAmount: 300,
      frequency: "daily",
      perPeriodTarget: 10,
      durationDays: 30,
    });
  }

  if (disposable > 0) {
    const emergencyWeekly = Math.max(250, Math.round((disposable * 0.2) / 100) * 100);
    suggestions.push({
      title: "Emergency Fund Kickstart",
      description: `Save ₹${emergencyWeekly}/week for a month to start your emergency fund.`,
      targetAmount: emergencyWeekly * 4,
      frequency: "weekly",
      perPeriodTarget: emergencyWeekly,
      durationDays: 28,
    });
  }

  const subSave = Math.max(100, Math.round((monthlyIncome * 0.015) / 50) * 50);
  suggestions.push({
    title: "Subscription Audit",
    description: `Cancel unused subscriptions and save ₹${subSave} weekly for 2 weeks.`,
    targetAmount: subSave * 2,
    frequency: "weekly",
    perPeriodTarget: subSave,
    durationDays: 14,
  });

  return suggestions.slice(0, 8);
}
