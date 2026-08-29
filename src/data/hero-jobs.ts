export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Sales Outbound",
    icon: "outbound",
    account: "A new account on the calendar",
    signal: "A first meeting appeared",
    work: "I checked the approved account sources and drafted outreach the seller can review before anything is sent.",
    result: "Drafted outreach ready for review",
    user: "I'll review these before I send them",
    bot: "They stay in draft. Nothing has been sent.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Tomorrow's customer meeting",
    signal: "The meeting is on the calendar",
    work: "I gathered the current account context and the open questions from the sources your team approves.",
    result: "Meeting brief ready",
    user: "brief me before the call",
    bot: "The brief is ready. I will keep it current.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "The call that just ended",
    signal: "Customer call ended",
    work: "I read the approved notes, wrote a short recap, and drafted the next step. Nothing went out.",
    result: "Recap and follow-up ready",
    user: "I'll send the recap after I check it",
    bot: "The drafts are waiting. No invite was sent.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "A product and security question",
    signal: "A customer email landed",
    work: "I pulled approved product and security answers and marked the contract point that still needs an owner.",
    result: "Sourced reply ready",
    user: "route the open contract item",
    bot: "Routed. The sourced answers stay in draft.",
  },
  {
    name: "Pipeline Health",
    icon: "pipeline",
    account: "Open opportunities",
    signal: "Work stalled after the last meeting",
    work: "I checked the last notes and named the missing next step on each open opportunity.",
    result: "Next-step list ready",
    user: "brief the account owners",
    bot: "The briefs are ready. Nothing was written back to the CRM.",
  },
  {
    name: "Renewal Risk",
    icon: "renewal",
    account: "An upcoming renewal",
    signal: "The renewal date is close",
    work: "I gathered the current usage notes and the open questions the account team still has to answer.",
    result: "Renewal brief ready",
    user: "I'll share this with the account team",
    bot: "The brief is ready. Nothing has been sent.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "A live customer conversation",
    signal: "Another vendor came up on the call",
    work: "I pulled the approved comparison points for this product question and drafted a short talk track.",
    result: "Talk track ready",
    user: "add it to tomorrow's call brief",
    bot: "Added. The brief is ready for review.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "This week's review",
    signal: "Open items still need a decision",
    work: "I gathered the open briefs, unanswered questions, and drafts that still wait for the seller.",
    result: "Weekly brief ready",
    user: "I'll review this before the team meeting",
    bot: "The brief is ready. Nothing was sent.",
  },
];
