import { CommercialRoofAnimation } from "./service-animations/CommercialRoofAnimation";
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
 * Thin dispatcher only. Every service owns its own scene, markup and keyframes.
 * The generic roofing route uses the Chicago-specific ice-dam scene rather than
 * pretending that every roofing problem is the same animation with a new icon.
 */
export function RoofingServiceVisual({ type, compact = false }: RoofingServiceVisualProps) {
  if (type === "repair") return <RoofRepairAnimation compact={compact} />;
  if (type === "replacement") return <RoofReplacementAnimation compact={compact} />;
  if (type === "storm") return <HailDamageAnimation compact={compact} />;
  if (type === "flat") return <FlatRoofTPOAnimation compact={compact} />;
  if (type === "commercial") return <CommercialRoofAnimation compact={compact} />;
  if (type === "inspection") return <RoofInspectionAnimation compact={compact} />;
  return <IceDamAnimation compact={compact} />;
}
