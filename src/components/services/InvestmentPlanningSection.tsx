import { Target, TrendingUp, PieChart, RefreshCcw, LayoutList, Calculator } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Identify and prioritize financial goals", icon: Target },
  { text: "Calculate investment requirements for each goal", icon: Calculator },
  { text: "Design suitable asset allocation strategies", icon: PieChart },
  { text: "Recommend SIP, STP, and lump sum investment approaches", icon: TrendingUp },
  { text: "Construct and monitor investment portfolios", icon: LayoutList },
  { text: "Rebalance portfolios to maintain target allocations", icon: RefreshCcw },
];

export function InvestmentPlanningSection() {
  return (
    <ServiceChapter
      id="investment-planning"
      n={2}
      side="left"
      tone="paper"
      accent="#0088EE"
      title="Investment Planning"
      question="What is Investment Planning?"
      intro="Investment planning helps you allocate your money efficiently to achieve financial goals such as retirement, education, home purchase, wealth creation, or financial independence."
      helpIntro="We help you build an investment strategy that converts your financial goals into actionable investment decisions."
      features={features}
      image="/investment_planning_comp.png"
      imageAlt="Investment Planning Component"
    />
  );
}
