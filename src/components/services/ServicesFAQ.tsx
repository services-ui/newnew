"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    category: "Wealth Management",
    questions: [
      { q: "What is the minimum investment required?", a: "The investment amount depends on your financial goals and planning requirements." },
      { q: "How often is my portfolio reviewed?", a: "We have general review every 6 months and then we review when goals are nearby" },
      { q: "Will my investments be actively monitored?", a: "Yes but active monitor does not mean we will make changes according to markets fluctuations but majorly according to asset allocation and goals" },
    ]
  },
  {
    category: "Investment Planning",
    questions: [
      { q: "How much should I invest every month?", a: "The amount depends on your goals, timeline, and existing assets." },
      { q: "Should I invest through SIP or lump sum?", a: "Both can be effective depending on your financial situation and market conditions." },
      { q: "Can I modify my investments later?", a: "Yes. Investment strategies should evolve as your needs change." },
    ]
  },
  {
    category: "Risk Mitigation",
    questions: [
      { q: "How much life insurance do I need?", a: "Coverage depends on your income, liabilities, goals, and family responsibilities." },
      { q: "Is health insurance necessary if my employer provides coverage?", a: "Employer health insurance offers valuable coverage, but it is linked to your employment. Having your own health insurance policy ensures continuous protection regardless of job changes and provides greater long-term security." },
      { q: "When should I review my insurance?", a: "At least annually or after major life events." },
    ]
  },
  {
    category: "Estate Planning",
    questions: [
      { q: "Do I need a will if I have nominations?", a: "Yes. A nomination and a will serve different purposes." },
      { q: "When should I create a will?", a: "Every adult with assets should consider estate planning." },
      { q: "Can a will be updated later?", a: "Yes. A Will can generally be updated during your lifetime to reflect changes in your family, assets, or wishes, subject to applicable legal requirements." },
    ]
  },
  {
    category: "Tax Optimization",
    questions: [
      { q: "Can tax planning be done throughout the year?", a: "Yes. Effective tax planning should be a year-round activity." },
      { q: "Does tax saving mean locking money for long periods?", a: "Not necessarily. Different solutions offer varying levels of flexibility." },
      { q: "Can tax planning improve investment returns?", a: "Tax-efficient investing can enhance overall post-tax wealth creation." },
    ]
  },
  {
    category: "Loan Against Securities",
    questions: [
      { q: "Which securities are eligible?", a: "Eligible securities typically include approved mutual funds, listed shares (stocks), bonds, and other investments as per the lender's approved list." },
      { q: "Do I have to sell my investments?", a: "No. Your investments remain in place as collateral." },
      { q: "How quickly can funds be received?", a: "Once the securities are pledged and the required formalities are completed, the loan amount can often be disbursed within as little as 30 minutes, subject to lender processes and operational timelines." },
    ]
  }
];

function AccordionItem({ id, question, answer, isOpen, onClick }: { id: string; question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-hair first:border-t">
      <h4>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          onClick={onClick}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left"
        >
          <span
            className={`text-[1.12rem] font-medium leading-[1.35] tracking-[-0.02em] transition-colors duration-200 ${
              isOpen ? "text-fin" : "text-ink group-hover:text-fin"
            }`}
          >
            {question}
          </span>
          <Plus
            aria-hidden
            strokeWidth={1.7}
            className={`mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? "rotate-45 text-fin" : "text-ink/40"
            }`}
          />
        </button>
      </h4>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        className={`grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className={`t-body max-w-[40rem] pb-6 pr-10 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="sec bg-paper" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="max-w-[44rem]">
          <h2 id="faq-title" className="t-h1" data-rv="up">Frequently Asked Questions</h2>
          <p className="t-lead mt-6" data-rv="up" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
            Find answers to common questions about our wealth management services.
          </p>
        </div>

        <div className="mt-16 lg:mt-24">
          {faqs.map((category, catIdx) => (
            <div key={category.category} className="grid gap-6 border-t border-ink py-10 lg:grid-cols-12 lg:gap-12 lg:py-14">
              <h3 className="t-h3 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <span aria-hidden className="tnum mr-3 font-mono text-[0.72rem] tracking-wide text-fin">
                  {String(catIdx + 1).padStart(2, "0")}
                </span>
                {category.category}
              </h3>
              <div className="lg:col-span-8">
                {category.questions.map((q, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  return (
                    <AccordionItem
                      key={id}
                      id={`faq-${id}`}
                      question={q.q}
                      answer={q.a}
                      isOpen={openIndex === id}
                      onClick={() => toggle(id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
