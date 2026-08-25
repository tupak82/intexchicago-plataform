"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

type AnimatedProcessStepsProps = {
  steps: string[];
  ariaLabel?: string;
};

export function AnimatedProcessSteps({ steps, ariaLabel = "Process steps" }: AnimatedProcessStepsProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={railRef}
      className={`processGrid processGridAnimated processRailPremium${isVisible ? " is-visible" : ""}`}
      aria-label={ariaLabel}
    >
      <div className="processRailTrack" aria-hidden="true">
        <span className="processRailFill" />
        <span className="processRailScanner" />
      </div>

      {steps.map((step, index) => (
        <article
          className="processStep processStepAnimated processRailStep"
          key={`${index}-${step}`}
          style={{ "--step-index": index, "--step-count": steps.length } as CSSProperties}
        >
          <div className="processRailMarker" aria-hidden="true">
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span />
          </div>

          <div className="processRailCopy">
            <small>{index === 0 ? "Assessment" : index === steps.length - 1 ? "Closeout" : `Phase ${String(index + 1).padStart(2, "0")}`}</small>
            <h3>{step}</h3>
          </div>

          <div className="processRailSignal" aria-hidden="true">
            <i />
            <b>{index === steps.length - 1 ? "PROTECTED" : "IN PROGRESS"}</b>
          </div>
        </article>
      ))}
    </div>
  );
}
