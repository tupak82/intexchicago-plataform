type RoofingVisualType = "repair" | "replacement" | "storm" | "flat" | "commercial" | "inspection" | "roofing";

type RoofingServiceVisualProps = {
  type: RoofingVisualType;
  label?: string;
  compact?: boolean;
};

const visualCopy: Record<RoofingVisualType, { eyebrow: string; title: string }> = {
  repair: { eyebrow: "Targeted repair", title: "Stop the failure at its source" },
  replacement: { eyebrow: "Full system renewal", title: "Old roof out. New protection in." },
  storm: { eyebrow: "Wind + hail response", title: "Inspect fast. Protect first. Restore right." },
  flat: { eyebrow: "Low-slope systems", title: "Membrane roofing built for Chicago buildings" },
  commercial: { eyebrow: "Commercial capacity", title: "Large roofs. Controlled execution." },
  inspection: { eyebrow: "Roof intelligence", title: "See the condition before you spend" },
  roofing: { eyebrow: "Chicago roofing", title: "Built around the whole roofing system" },
};

export function RoofingServiceVisual({ type, label, compact = false }: RoofingServiceVisualProps) {
  const copy = visualCopy[type];

  return (
    <div className={`roofVisual roofVisual--${type}${compact ? " roofVisual--compact" : ""}`} aria-label={label ?? copy.title}>
      <div className="roofVisualScene" aria-hidden="true">
        <div className="roofVisualSky" />
        <div className="roofVisualStructure">
          <i className="roofPlane roofPlaneA" />
          <i className="roofPlane roofPlaneB" />
          <i className="roofEdge" />
        </div>
        <div className="roofVisualAction">
          <i /><i /><i /><i /><i /><i />
        </div>
        <div className="roofVisualTool" />
        <div className="roofVisualScan" />
        <div className="roofVisualPulse" />
      </div>
      {!compact ? (
        <div className="roofVisualCaption">
          <span>{copy.eyebrow}</span>
          <strong>{copy.title}</strong>
        </div>
      ) : null}
    </div>
  );
}
