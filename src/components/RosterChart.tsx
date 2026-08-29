import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  if (bot.mark) return bot.mark;
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function inkOn(color: string) {
  const oklch = color.match(/^oklch\(\s*(\d+(?:\.\d+)?)%/i);
  if (oklch) return Number(oklch[1]) > 55 ? "#111" : "#fff";
  if (!color.startsWith("#") || color.length < 7) return "#fff";
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180 ? "#111" : "#fff";
}

function ComputerGlyph() {
  return (
    <svg className="org-computer" viewBox="0 0 24 24" aria-hidden>
      <rect
        x="3"
        y="4.5"
        width="18"
        height="12"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M8 20h8M12 16.5V20" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function Box({
  bot,
  chief = false,
}: {
  bot: FleetBot;
  chief?: boolean;
}) {
  const className = chief ? "org-box is-chief" : "org-box";
  const body = (
    <>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: inkOn(bot.color),
        }}
        aria-hidden
      >
        {initials(bot)}
      </span>
      <span className="org-name">
        {bot.seat ? null : <ComputerGlyph />}
        {bot.name}
      </span>
      <span className="org-blurb">{bot.blurb}</span>
    </>
  );

  if (bot.jobId) {
    return (
      <a className={className} href={`#${bot.jobId}`}>
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function RosterChart() {
  const seat = FLEET.find((item) => item.seat);
  const agents = FLEET.filter((item) => !item.seat);

  if (!seat) return null;

  return (
    <section id="roster" className="roster">
      <h2>A fleet of agents, each with a computer</h2>
      <p className="section-lede">
        The work itself is the trigger. A meeting appears, a call ends, or a
        customer question lands. The right agents pick it up and hand back a
        finished draft. The seller stays in control.
      </p>

      <div className="org" role="tree">
        <div className="org-top">
          <Box bot={seat} chief />
        </div>
        <div className="org-branch">
          <div className="org-connect" aria-hidden>
            <i className="org-stem" />
            <i className="org-bar" />
          </div>
          <ul className="org-kids">
            {agents.map((agent) => (
              <li key={agent.id} className="org-kid">
                <Box bot={agent} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
