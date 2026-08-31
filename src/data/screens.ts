import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Notes" };
const figma = { id: "figma", host: "figma.com", label: "Slides" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Mail" };
const sfdc = { id: "sfdc", host: "salesforce.com", label: "CRM" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const web = {
  id: "web",
  host: "northstar.example",
  label: "Public sources",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "meeting-brief": {
    m1: {
      pill: "Opening the account record",
      host: "salesforce.com",
      path: "/account/northstar-systems",
      title: "Northstar Systems",
      site: "sfdc-account",
      tabs: [sfdc, granola, web, figma],
    },
    m2: {
      pill: "Checking approved public sources",
      host: "northstar.example",
      path: "/company",
      title: "Northstar Systems",
      site: "research",
      tabs: [sfdc, granola, web, figma],
    },
    m3: {
      pill: "Building the meeting brief",
      host: "figma.com",
      path: "/file/northstar-meeting-brief",
      title: "Northstar Systems meeting brief",
      site: "figma",
      tabs: [sfdc, granola, web, figma],
    },
    m4: {
      pill: "Drafting the agenda",
      host: "docs.google.com",
      path: "/document/northstar-agenda",
      title: "Northstar Systems agenda",
      site: "gdoc",
      tabs: [sfdc, granola, web, figma, gdoc],
    },
    m5: {
      pill: "Brief ready for review",
      host: "docs.google.com",
      path: "/document/northstar-agenda",
      title: "Northstar Systems agenda",
      site: "gdoc",
      tabs: [sfdc, granola, figma, gdoc],
    },
  },
  "call-follow-up": {
    m1: {
      pill: "Reading the approved call notes",
      host: "granola.app",
      path: "/notes/northstar-follow-up",
      title: "Northstar Systems follow-up",
      site: "granola",
      tabs: [granola, gmail, sfdc, gdoc],
    },
    m2: {
      pill: "Separating decisions from open questions",
      host: "docs.google.com",
      path: "/document/northstar-recap",
      title: "Northstar Systems recap",
      site: "gdoc",
      tabs: [granola, gmail, sfdc, gdoc],
    },
    m3: {
      pill: "Drafting the customer follow-up",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, gmail, sfdc, gdoc],
    },
    m4: {
      pill: "Preparing the CRM update",
      host: "salesforce.com",
      path: "/account/northstar-systems",
      title: "Northstar Systems",
      site: "sfdc-account",
      tabs: [granola, gmail, sfdc, gdoc],
    },
    m5: {
      pill: "Drafts parked for seller review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, gmail, sfdc, gdoc],
    },
  },
  "answer-desk": {
    m1: {
      pill: "Opening the customer question",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc, sfdc],
    },
    m2: {
      pill: "Checking approved product and security guidance",
      host: "docs.google.com",
      path: "/document/approved-guidance",
      title: "Approved guidance",
      site: "gdoc",
      tabs: [gmail, gdoc, sfdc],
    },
    m3: {
      pill: "Building the sourced answer",
      host: "docs.google.com",
      path: "/document/northstar-answer",
      title: "Northstar Systems answer",
      site: "gdoc",
      tabs: [gmail, gdoc, sfdc],
    },
    m4: {
      pill: "Drafting the customer email",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc, sfdc],
    },
    m5: {
      pill: "Waiting for review",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc, sfdc],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
