import { FLEET_COLOR } from "./fleet";
import type { Artifact, CroJob, SlideCard } from "./types";

export const MEETING_BRIEF_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Account context",
    voice: "us",
    title: "What changed",
    body: "Recent customer activity, open work, and approved public signals in one short brief.",
  },
  {
    n: 2,
    kicker: "People",
    voice: "us",
    title: "Who is involved",
    body: "Known contacts, their role in the work, and the people still missing from the next step.",
  },
  {
    n: 3,
    kicker: "Plan",
    voice: "us",
    title: "What to ask",
    body: "A focused agenda built from the account record, not a generic discovery checklist.",
  },
  {
    n: 4,
    kicker: "Control",
    voice: "us",
    title: "Ready for review",
    body: "The seller checks the brief before anything reaches the customer.",
  },
];

const QUESTION_PACKET: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Northstar product and security questions",
  paperTitle: "Questions to answer",
  from: "Northstar Systems · customer email",
  marks: [
    {
      text: "Which deployment options fit our security review?",
      note: "Pull only approved deployment guidance and link the source used for the answer.",
      take: true,
    },
    {
      text: "Can our team keep control of external actions?",
      note: "Explain the approval step in plain language and keep the reply in draft.",
      take: true,
    },
    {
      text: "Does the contract cover this use case?",
      note: "Route the open contract point to the named internal owner. Do not guess.",
      take: false,
    },
  ],
  reply: {
    to: "Northstar Systems contact",
    subject: "Answers and one open contract item",
    body: "Hi,\n\nI pulled the approved product and security guidance for the first two questions and linked each source below.\n\nThe contract question needs an internal owner to confirm it. I have routed that item and kept it separate from the answers we can send now.\n\nNothing has been sent yet. I will review the final reply before it goes out.\n\nBest,",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "meeting-brief",
    number: 1,
    title: "Walk into every customer meeting prepared",
    trigger: "A customer meeting appears on the calendar",
    backgroundAction: "Reading approved context + building the brief",
    problem:
      "Account context is spread across the CRM, email, call notes, and public sources. A seller should not spend the hour before a meeting rebuilding that history.",
    botJob:
      "Scout checks the sources your team approves. Brief turns the useful context into a short meeting plan. The seller reviews the result before the call.",
    storyboard: [
      {
        when: "The evening before",
        label: "The meeting appears. Scout starts with the approved account sources.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Northstar Systems",
          sources: ["CRM", "Call notes", "Public news"],
          signal: "Customer meeting tomorrow",
        },
      },
      {
        when: "Context gathered",
        label: "Brief separates useful facts from open questions.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Known", answer: "Current account context" },
            { label: "Open", answer: "People and decision path" },
            { label: "Ask", answer: "One clear next step" },
          ],
        },
      },
      {
        when: "Before the meeting",
        label: "The final frame is a brief the seller can use.",
        scene: "deck",
        slides: MEETING_BRIEF_SLIDES,
      },
    ],
    unlock:
      "A current account brief, a focused agenda, and a clear list of open questions.",
    outcome:
      "The seller opens one brief instead of searching four systems before the call.",
    clips: [],
    demo: {
      title: "Scout",
      subtitle: "Account context to a meeting brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scout",
          name: "Scout",
          role: "bot",
          persona: "Finds useful account context in approved sources",
          color: FLEET_COLOR.scout,
        },
        {
          id: "brief",
          name: "Brief",
          role: "bot",
          persona: "Turns account context into a short meeting plan",
          color: FLEET_COLOR.brief,
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scout",
          kind: "routine",
          body: "Northstar Systems is on tomorrow's calendar. I am checking the CRM, prior call notes, and approved public sources.",
        },
        {
          id: "m2",
          from: "scout",
          kind: "text",
          body: "I found the current account context and the open questions. I left out anything that could not be tied to a source.",
        },
        {
          id: "m3",
          from: "brief",
          kind: "draft",
          draftLabel: "Meeting brief",
          artifact: {
            kind: "slides",
            title: "Northstar Systems meeting brief",
            cards: MEETING_BRIEF_SLIDES,
          },
        },
        {
          id: "m4",
          from: "brief",
          kind: "draft",
          draftLabel: "Agenda",
          artifact: {
            kind: "packet",
            title: "A focused next conversation",
            fields: [
              {
                label: "Open with",
                value: "Confirm what changed since the last conversation.",
              },
              {
                label: "Clarify",
                value: "Name the buyer, technical owner, and approval path.",
              },
              {
                label: "Leave with",
                value: "One owner and one dated next step.",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "brief",
          kind: "system",
          body: "The brief is ready. Nothing was sent or written back to the CRM.",
        },
      ],
    },
  },
  {
    id: "call-follow-up",
    number: 2,
    title: "Turn the call into the next step",
    trigger: "A customer call ends",
    backgroundAction: "Reading notes + preparing follow-up",
    problem:
      "The work after a call is easy to delay. The recap, CRM update, and next meeting materials all compete with the seller's next conversation.",
    botJob:
      "Scribe reads the approved call notes. Relay drafts the customer follow-up and a clean internal update. Every external action waits for the seller.",
    storyboard: [
      {
        when: "Call ends",
        label: "Scribe reads the approved notes and names the open decisions.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Northstar Systems follow-up",
          people: [
            { initials: "AE", name: "Seller" },
            { initials: "CS", name: "Customer" },
            { initials: "SE", name: "Technical lead" },
          ],
        },
      },
      {
        when: "Drafts ready",
        label: "Relay prepares the recap and the internal update.",
        scene: "notes",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Call notes", answer: "Decisions captured" },
            { name: "CRM", answer: "Update drafted" },
            { name: "Calendar", answer: "Next step prepared" },
          ],
          status: "Ready for review",
        },
      },
      {
        when: "Final frame",
        label: "The seller gets one next-step brief, not a list of chores.",
        scene: "send",
        artifact: {
          kind: "forecast",
          title: "Northstar Systems next-step brief",
          account: "Northstar Systems",
          status: "Ready for seller review",
          body: "Customer recap, internal update, and meeting request are drafted. The seller chooses what to send and what to change.",
          gaps: [
            {
              label: "Customer",
              body: "Recap and open questions are in one draft.",
            },
            {
              label: "Internal",
              body: "CRM notes and owners are ready to review.",
            },
            {
              label: "Next meeting",
              body: "A proposed agenda is ready. No invite has been sent.",
            },
          ],
        },
      },
    ],
    unlock:
      "A customer recap, an internal update, and a proposed next meeting from one set of notes.",
    outcome:
      "The seller reviews the work while the customer conversation is still fresh.",
    clips: [],
    demo: {
      title: "Scribe",
      subtitle: "Call notes to reviewed follow-up",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "scribe",
          name: "Scribe",
          role: "bot",
          persona: "Turns approved call notes into a clear recap",
          color: FLEET_COLOR.scribe,
        },
        {
          id: "relay",
          name: "Relay",
          role: "bot",
          persona: "Prepares the internal update and next step",
          color: FLEET_COLOR.relay,
        },
      ],
      messages: [
        {
          id: "m1",
          from: "scribe",
          kind: "routine",
          body: "The Northstar Systems call ended. I am reading the approved notes and separating decisions from open questions.",
        },
        {
          id: "m2",
          from: "scribe",
          kind: "text",
          body: "The recap is short. I kept the customer's language out because there is no sourced quote to use.",
        },
        {
          id: "m3",
          from: "relay",
          kind: "draft",
          draftLabel: "Customer follow-up",
          artifact: {
            kind: "gmail",
            title: "Northstar Systems follow-up",
            to: "Northstar Systems contact",
            subject: "Next steps from today's conversation",
            body: "Thanks for the conversation today. I captured the open product question, the internal owner, and the proposed next meeting. I will send the confirmed answer before we meet again.",
          },
        },
        {
          id: "m4",
          from: "relay",
          kind: "draft",
          draftLabel: "Internal update",
          artifact: {
            kind: "packet",
            title: "Northstar Systems next step",
            fields: [
              { label: "Decision", value: "Confirm the first workflow to test." },
              { label: "Owner", value: "Name the customer and internal owners." },
              { label: "Open item", value: "Return with the sourced product answer." },
            ],
          },
        },
        {
          id: "m5",
          from: "relay",
          kind: "system",
          body: "Customer email, CRM update, and calendar request are still drafts.",
        },
      ],
    },
  },
  {
    id: "answer-desk",
    number: 3,
    title: "Answer the buyer without the internal chase",
    trigger: "A product or security question lands",
    backgroundAction: "Checking approved sources + drafting the answer",
    problem:
      "A customer question often starts a long search across product, security, legal, and sales. The delay is visible to the buyer.",
    botJob:
      "Clerk finds approved answers and links each source. Relay drafts the reply and routes any open item to the right owner. It does not fill gaps with guesses.",
    storyboard: [
      {
        when: "Question arrives",
        label: "Clerk opens the customer email and begins with approved sources.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Northstar Systems contact",
          subject: "Product and security questions",
          questions: 3,
        },
      },
      {
        when: "Sources checked",
        label: "Two answers are ready. One contract point stays open.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product guide", answer: "Answer sourced" },
            { name: "Security guide", answer: "Answer sourced" },
            { name: "Contract", answer: "Owner needed" },
          ],
          status: "2 ready · 1 routed",
        },
      },
      {
        when: "Final frame",
        label: "The finished artifact is a sourced reply with the open item named.",
        scene: "send",
        artifact: QUESTION_PACKET,
      },
    ],
    unlock:
      "A sourced customer reply and a clear route for the one item that still needs judgment.",
    outcome:
      "The buyer gets a useful answer without waiting for the seller to search every internal channel.",
    clips: [],
    demo: {
      title: "Clerk",
      subtitle: "Customer question to sourced draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "clerk",
          name: "Clerk",
          role: "bot",
          persona: "Finds approved product and security guidance",
          color: FLEET_COLOR.clerk,
        },
        {
          id: "relay",
          name: "Relay",
          role: "bot",
          persona: "Drafts the reply and routes open items",
          color: FLEET_COLOR.relay,
        },
      ],
      messages: [
        {
          id: "m1",
          from: "clerk",
          kind: "routine",
          body: "A Northstar Systems email has three product and security questions. I am checking the approved sources now.",
        },
        {
          id: "m2",
          from: "clerk",
          kind: "text",
          body: "Two answers have approved sources. The contract point needs an owner, so I marked it open instead of guessing.",
        },
        {
          id: "m3",
          from: "relay",
          kind: "draft",
          draftLabel: "Questions and sourced reply",
          artifact: QUESTION_PACKET,
        },
        {
          id: "m4",
          from: "relay",
          kind: "draft",
          draftLabel: "Customer email",
          artifact: {
            kind: "gmail",
            title: "Northstar Systems reply",
            to: QUESTION_PACKET.reply.to,
            subject: QUESTION_PACKET.reply.subject,
            body: QUESTION_PACKET.reply.body,
          },
        },
        {
          id: "m5",
          from: "relay",
          kind: "system",
          body: "Nothing was sent. The reply waits for the seller and the open contract item waits for its owner.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
