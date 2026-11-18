import { ServicesHero } from "@/components/services/ServicesHero";
import { WealthManagementSection } from "@/components/services/WealthManagementSection";
import { InvestmentPlanningSection } from "@/components/services/InvestmentPlanningSection";
import { RiskMitigationSection } from "@/components/services/RiskMitigationSection";
import { TaxOptimizationSection } from "@/components/services/TaxOptimizationSection";
import { EstatePlanningSection } from "@/components/services/EstatePlanningSection";
import { LoanAgainstSecuritiesSection } from "@/components/services/LoanAgainstSecuritiesSection";
import { ServicesFAQ } from "@/components/services/ServicesFAQ";

export default function ServicesPage() {
  return (
    <main id="main" className="bg-white text-ink">
      <ServicesHero />
      <WealthManagementSection />
      <InvestmentPlanningSection />
      <RiskMitigationSection />
      <EstatePlanningSection />
      <TaxOptimizationSection />
      <LoanAgainstSecuritiesSection />
      <ServicesFAQ />
    </main>
  );
}
