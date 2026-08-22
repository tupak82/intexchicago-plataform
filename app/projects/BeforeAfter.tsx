"use client";

import { useState } from "react";

export default function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="beforeAfter">
      <div className="beforeAfterFrame">
        <img className="beforeAfterImage" src={after} alt={`${alt} after restoration`} />
        <div className="beforeAfterBefore" style={{ width: `${position}%` }}>
          <img className="beforeAfterImage" src={before} alt={`${alt} before restoration`} />
        </div>
        <div className="beforeAfterDivider" style={{ left: `${position}%` }} aria-hidden="true" />
        <span className="beforeAfterLabel beforeLabel">Before</span>
        <span className="beforeAfterLabel afterLabel">After</span>
      </div>
      <label className="beforeAfterControl">
        <span>Compare before and after</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Adjust before and after image comparison"
        />
      </label>
    </figure>
  );
}
