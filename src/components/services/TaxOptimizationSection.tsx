import { FileText, PiggyBank, BarChart3, LineChart, ShieldCheck, CalendarClock } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Review current tax liabilities and opportunities", icon: FileText },
  { text: "Identify suitable tax-saving investment options", icon: PiggyBank },
  { text: "Optimize capital gains and redemption strategies", icon: LineChart },
  { text: "Improve tax efficiency within investment portfolios", icon: BarChart3 },
  { text: "Align tax planning with retirement and wealth goals", icon: ShieldCheck },
  { text: "Conduct periodic tax reviews throughout the year", icon: CalendarClock },
];

export function TaxOptimizationSection() {
  return (
    <ServiceChapter
      id="tax-optimization"
      n={5}
      side="right"
      tone="white"
      accent="#0066FF"
      title="Tax Optimization"
      question="What is Tax Optimization?"
      intro="Tax optimization involves structuring investments and financial decisions to improve after-tax returns while remaining compliant with applicable regulations."
      helpIntro="We help structure your finances and investments to improve tax efficiency while supporting long-term wealth creation."
      features={features}
      image="/tax_optimization_comp.png"
      imageAlt="Tax Optimization Component"
    />
  );
}
