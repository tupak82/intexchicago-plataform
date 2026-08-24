import { FlatRoofTPOAnimation } from "./service-animations/FlatRoofTPOAnimation";
import { HailDamageAnimation } from "./service-animations/HailDamageAnimation";
import { IceDamAnimation } from "./service-animations/IceDamAnimation";
import { RoofInspectionAnimation } from "./service-animations/RoofInspectionAnimation";
import { RoofRepairAnimation } from "./service-animations/RoofRepairAnimation";
import { RoofReplacementAnimation } from "./service-animations/RoofReplacementAnimation";

type RoofingVisualType = "repair" | "replacement" | "storm" | "flat" | "commercial" | "inspection" | "roofing";

type RoofingServiceVisualProps = {
  type: RoofingVisualType;
  label?: string;
  compact?: boolean;
};

/**
 * Thin dispatcher only. Each roofing service owns a dedicated component,
 * DOM scene and CSS-module keyframes; no shared one-size-fits-all roof scene.
 */
export function RoofingServiceVisual({ type, compact = false }: RoofingServiceVisualProps) {
  if (type === "repair") return <RoofRepairAnimation compact={compact} />;
  if (type === "replacement") return <RoofReplacementAnimation compact={compact} />;
  if (type === "storm") return <HailDamageAnimation compact={compact} />;
  if (type === "inspection") return <RoofInspectionAnimation compact={compact} />;
  if (type === "flat" || type === "commercial") return <FlatRoofTPOAnimation compact={compact} />;
  return <IceDamAnimation compact={compact} />;
}
