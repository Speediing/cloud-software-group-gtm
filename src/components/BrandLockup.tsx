"use client";

import { useState } from "react";

const WORDMARK_SRC =
  "https://www.cloud.com/media_1e40e7d048f0117d4543c940f9e7433b549c08a03.svg?width=750&format=svg&optimize=medium";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const [wordmark, setWordmark] = useState<"pending" | "ready" | "missing">(
    "pending",
  );

  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={WORDMARK_SRC}
        alt="Cloud Software Group"
        className="brand-customer"
        hidden={wordmark !== "ready"}
        onLoad={() => setWordmark("ready")}
        onError={() => setWordmark("missing")}
      />
      {wordmark !== "ready" ? (
        <span className="brand-customer-text">Cloud Software Group</span>
      ) : null}
      <span className="brand-times" aria-hidden>
        ×
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/spacexai.svg" alt="SpaceXAI" className="brand-sxai" />
    </div>
  );
}
