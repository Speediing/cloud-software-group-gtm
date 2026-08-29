import type { Artifact, DemoMessage, SlideCard } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { CLIPS } from "@/data/clips";
import { MEETING_BRIEF_SLIDES } from "@/data/jobs";
import { HeardSlide } from "./HeardSlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}

function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}

function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  if (beat.site === "clip" && beat.clip) {
    const clip = CLIPS[beat.clip];
    return (
      <div className="site-clip">
        <video
          src={clip.file}
          controls
          playsInline
          controlsList="nodownload"
          aria-label={clip.title}
        />
      </div>
    );
  }

  switch (beat.site) {
    case "granola":
      return <NotesScreen account={account} />;
    case "figma":
      return <SlidesScreen account={account} artifact={artifact} />;
    case "sfdc-account":
      return <CrmScreen account={account} />;
    case "gmail":
      return (
        <MailScreen
          account={account}
          artifact={asGmail(artifact)}
          sent={sent}
        />
      );
    case "gdoc":
      return <DocScreen account={account} artifact={artifact} />;
    case "research":
      return <ResearchScreen account={account} />;
    default:
      return <GenericScreen beat={beat} account={account} />;
  }
}

function NotesScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Call notes</strong>
        <span>Approved source</span>
      </header>
      <p className="site-time">{account} · follow-up in progress</p>
      <ul>
        <li>
          <span>Decision</span> Confirm the first workflow to test.
        </li>
        <li>
          <span>Owner</span> Name the customer and internal owners.
        </li>
        <li>
          <span>Open</span> Return with the sourced product answer.
        </li>
        <li>
          <span>Next</span> Draft a focused agenda for the next conversation.
        </li>
      </ul>
    </div>
  );
}

function SlidesScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const slides = asSlides(artifact);
  const cards: SlideCard[] = slides?.cards ?? MEETING_BRIEF_SLIDES;

  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>{slides?.title || `${account} meeting brief`}</strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        <HeardSlide slides={cards} size="sm" />
      </div>
    </div>
  );
}

function CrmScreen({ account }: { account: string }) {
  return (
    <div className="site site-sfdc">
      <header>
        <span className="sfdc-cloud" />
        <strong>CRM</strong>
        <em>Draft update</em>
      </header>
      <div className="sfdc-title">
        <p>Account</p>
        <h3>{account}</h3>
      </div>
      <dl className="sfdc-fields">
        <div>
          <dt>Current context</dt>
          <dd>Ready for seller review</dd>
        </div>
        <div>
          <dt>Customer owner</dt>
          <dd>To confirm</dd>
        </div>
        <div>
          <dt>Internal owner</dt>
          <dd>To confirm</dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>Drafted, not sent</dd>
        </div>
      </dl>
    </div>
  );
}

function MailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Mail</strong>
        <em>{sent ? "Sent" : "Draft · not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} contact`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} next steps`}
      </p>
      <div>
        {artifact?.body ||
          "The draft is parked here until the seller reviews it."}
      </div>
    </div>
  );
}

function DocScreen({
  account,
  artifact,
}: {
  account: string;
  artifact?: Artifact;
}) {
  const packet = asPacket(artifact);
  const onePager = asOnePager(artifact);

  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>{packet?.title || onePager?.title || `${account} working note`}</span>
      </header>
      <article>
        {packet
          ? packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}.</b> {field.value}
              </p>
            ))
          : onePager
            ? onePager.sections.map((section) => (
                <p key={section.heading}>
                  <b>{section.heading}.</b> {section.body}
                </p>
              ))
            : [
                "Approved sources checked.",
                "Open questions separated from known facts.",
                "Customer draft waiting for review.",
              ].map((line) => <p key={line}>{line}</p>)}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}</strong>
        <span>Approved sources</span>
      </header>
      <p className="site-time">Researching the account · no outreach sent</p>
      <ul>
        <li>
          <span>CRM</span> Current account notes and known contacts.
        </li>
        <li>
          <span>Calls</span> Prior decisions and open questions.
        </li>
        <li>
          <span>Public</span> Recent company context with a source link.
        </li>
        <li>
          <span>Plan</span> A focused agenda for the seller to review.
        </li>
      </ul>
    </div>
  );
}

function GenericScreen({
  beat,
  account,
}: {
  beat: ComputerBeat;
  account: string;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>{beat.title}</strong>
        <em>Draft</em>
      </header>
      <h4>{account}</h4>
      <p>{beat.pill}</p>
    </div>
  );
}
