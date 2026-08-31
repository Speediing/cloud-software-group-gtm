import type { Artifact, StoryBeat } from "@/data/types";
import { HeardSlide } from "./HeardSlide";

function NextStepBrief({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "forecast" }>;
}) {
  return (
    <div className="leave leave-memo">
      <header className="leave-memo-top">
        <div>
          <p className="leave-kicker">{artifact.title}</p>
          <h3>{artifact.account || "Customer account"}</h3>
        </div>
        <p className="leave-stamp">{artifact.status}</p>
      </header>
      <p className="leave-memo-body">{artifact.body}</p>
      {artifact.gaps?.length ? (
        <ul className="leave-stamps">
          {artifact.gaps.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function AnswerPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "redlines" }>;
}) {
  return (
    <div className="leave leave-paper">
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Sourced customer answer</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">{artifact.from}</p>
      </header>
      <div className="leave-paper-split">
        <section className="leave-marks">
          <p className="leave-kicker">{artifact.paperTitle}</p>
          <ol>
            {artifact.marks.map((item) => (
              <li key={item.text} className={item.take ? "is-take" : "is-hold"}>
                <p className="leave-mark-line">{item.text}</p>
                <p className="leave-mark-note">
                  <b>{item.take ? "Answer" : "Hold"}.</b> {item.note}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply · not sent</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.reply.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.reply.subject}
          </p>
          <p className="leave-reply-body">{artifact.reply.body}</p>
        </section>
      </div>
    </div>
  );
}

export function ChapterPayoff({
  beat,
  wash,
  value,
}: {
  beat: StoryBeat;
  wash?: string;
  value?: string;
}) {
  const slides = beat.slides;
  const artifact = beat.artifact;

  let body = null;
  if (slides?.length) {
    body = <HeardSlide slides={slides} size="lg" wash={wash} />;
  } else if (artifact?.kind === "redlines") {
    body = <AnswerPack artifact={artifact} />;
  } else if (artifact?.kind === "forecast") {
    body = <NextStepBrief artifact={artifact} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
