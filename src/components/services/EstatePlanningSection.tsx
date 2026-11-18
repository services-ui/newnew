import { FileText, ClipboardList, Scroll, GitMerge, Search, Target } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Organize and document assets and liabilities", icon: FileText },
  { text: "Review nominations across financial assets", icon: ClipboardList },
  { text: "Facilitate Will creation and updates", icon: Scroll },
  { text: "Develop succession and inheritance strategies", icon: GitMerge },
  { text: "Identify potential estate transfer challenges", icon: Search },
  { text: "Coordinate estate planning with overall financial goals", icon: Target },
];

export function EstatePlanningSection() {
  return (
    <ServiceChapter
      id="estate-planning"
      n={4}
      side="left"
      tone="paper"
      accent="#0088EE"
      title="Estate Planning"
      question="What is Estate Planning?"
      intro="Estate planning helps organize the transfer of assets, responsibilities, and financial intentions to beneficiaries while minimizing future complications."
      helpIntro="We help ensure your assets are transferred smoothly and according to your wishes while reducing potential complications for your family."
      features={features}
      image="/estate_planning_comp.png"
      imageAlt="Estate Planning Component"
    />
  );
}
