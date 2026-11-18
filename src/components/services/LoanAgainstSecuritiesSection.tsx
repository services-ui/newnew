import { Landmark, ArrowRightLeft, Percent, Scale, FileSignature, Handshake } from "lucide-react";
import { ServiceChapter, type ServiceFeature } from "./ServiceChapter";

const features: ServiceFeature[] = [
  { text: "Evaluate eligible securities for loan availability", icon: Scale },
  { text: "Assess borrowing capacity and loan limits", icon: Percent },
  { text: "Compare available lending options", icon: ArrowRightLeft },
  { text: "Assist with documentation and application processes", icon: FileSignature },
  { text: "Coordinate with lending institutions", icon: Landmark },
  { text: "Support ongoing management of pledged securities", icon: Handshake },
];

export function LoanAgainstSecuritiesSection() {
  return (
    <ServiceChapter
      id="loan-against-securities"
      n={6}
      side="left"
      tone="paper"
      accent="#0088EE"
      title="Loan Against Securities"
      question="What is a Loan Against Securities?"
      intro="Loan Against Securities (LAS) allows you to borrow against eligible investments such as mutual funds, shares, bonds, and other approved securities without liquidating them."
      helpIntro="We help you access funds from your investment portfolio without disrupting your long-term investment strategy."
      features={features}
      image="/loan_against_securities_comp.png"
      imageAlt="Loan Against Securities Component"
    />
  );
}
