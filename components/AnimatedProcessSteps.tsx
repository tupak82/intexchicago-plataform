"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

type AnimatedProcessStepsProps = {
  steps: string[];
  ariaLabel?: string;
};

export function AnimatedProcessSteps({ steps, ariaLabel = "Process steps" }: AnimatedProcessStepsProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className={`processGrid processGridAnimated${isVisible ? " is-visible" : ""}`}
      aria-label={ariaLabel}
    >
      {steps.map((step, index) => (
        <article
          className="processStep processStepAnimated"
          key={`${index}-${step}`}
          style={{ "--step-index": index } as CSSProperties}
        >
          <div className="processStepTop">
            <strong className="processNumber" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </strong>
            <span className="processProgress" aria-hidden="true">
              <span />
            </span>
          </div>
          <h3>{step}</h3>
        </article>
      ))}
    </div>
  );
}
