import { Shield, Activity, Umbrella, AlertTriangle, LifeBuoy, HeartPulse } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Assess existing insurance coverage and protection gaps", icon: Shield },
  { text: "Evaluate life, health, and accident risk exposure", icon: HeartPulse },
  { text: "Estimate protection requirements based on liabilities", icon: AlertTriangle },
  { text: "Build emergency fund strategies", icon: LifeBuoy },
  { text: "Recommend suitable risk management solutions", icon: Umbrella },
  { text: "Review protection plans periodically", icon: Activity },
];

export function RiskMitigationSection() {
  return (
    <ServiceChapter
      id="risk-mitigation"
      n={3}
      side="right"
      tone="white"
      accent="#0066FF"
      title="Risk Mitigation"
      question="What is Risk Mitigation?"
      intro="Risk mitigation focuses on protecting your family, income, assets, and financial goals from unexpected events such as illness, disability, accidents, or loss of income."
      helpIntro="We identify financial risks that could derail your goals and implement strategies to reduce their impact."
      features={features}
      image="/risk_mitigation_comp.png"
      imageAlt="Risk Mitigation Component"
    />
  );
}
