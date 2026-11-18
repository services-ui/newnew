import { LineChart, Map, Target, ShieldCheck, Activity, RefreshCw } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Consolidate and review your overall financial position", icon: LineChart },
  { text: "Create a personalized wealth roadmap", icon: Map },
  { text: "Align investments with life goals and cash flow needs", icon: Target },
  { text: "Coordinate investment, tax, insurance, and estate considerations", icon: ShieldCheck },
  { text: "Monitor progress through regular reviews", icon: Activity },
  { text: "Adapt strategies as your life and financial priorities evolve", icon: RefreshCw },
];

export function WealthManagementSection() {
  return (
    <ServiceChapter
      id="wealth-management"
      n={1}
      side="right"
      tone="white"
      accent="#0066FF"
      title="Wealth Management"
      question="What is Wealth Management?"
      intro="Wealth management is more than selecting investments. It involves creating a coordinated financial strategy that integrates investments, risk management, tax planning, estate considerations, and cash flow management to help you achieve long-term financial security."
      helpIntro="We design and execute comprehensive wealth strategies tailored to your unique financial landscape and long-term aspirations."
      features={features}
      image="/wealth_management_comp.png"
      imageAlt="Wealth Management Component"
    />
  );
}
