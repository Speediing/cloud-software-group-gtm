import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET_COLOR = {
  seller: "oklch(32% 0.04 70)",
  scout: "oklch(34% 0.10 245)",
  scribe: "oklch(33% 0.10 190)",
  brief: "oklch(35% 0.12 30)",
  clerk: "oklch(33% 0.11 285)",
  relay: "oklch(34% 0.11 55)",
} as const;

export const FLEET: FleetBot[] = [
  {
    id: "seller",
    name: "Every Cloud Software Group seller",
    blurb: "The seller stays in control. A fleet handles the work around each customer conversation.",
    color: FLEET_COLOR.seller,
    mark: "AE",
    seat: true,
  },
  {
    id: "scout",
    name: "Scout",
    blurb: "Finds account context and gives Brief the sources worth using.",
    jobId: "meeting-brief",
    color: FLEET_COLOR.scout,
  },
  {
    id: "scribe",
    name: "Scribe",
    blurb: "Turns approved call notes into a recap while the conversation is fresh.",
    jobId: "call-follow-up",
    color: FLEET_COLOR.scribe,
  },
  {
    id: "brief",
    name: "Brief",
    blurb: "Builds a short account plan from the context Scout gathers.",
    jobId: "meeting-brief",
    color: FLEET_COLOR.brief,
  },
  {
    id: "clerk",
    name: "Clerk",
    blurb: "Checks approved product and security sources before drafting an answer.",
    jobId: "answer-desk",
    color: FLEET_COLOR.clerk,
  },
  {
    id: "relay",
    name: "Relay",
    blurb: "Prepares external drafts and routes open items without sending them.",
    jobId: "answer-desk",
    color: FLEET_COLOR.relay,
  },
];
