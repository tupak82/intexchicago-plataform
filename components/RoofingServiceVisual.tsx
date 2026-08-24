import { BiohazardAnimation } from "./service-animations/BiohazardAnimation";
import { CommercialRestorationAnimation } from "./service-animations/CommercialRestorationAnimation";
import { CommercialRoofAnimation } from "./service-animations/CommercialRoofAnimation";
import { FireSmokeAnimation } from "./service-animations/FireSmokeAnimation";
import { FlatRoofTPOAnimation } from "./service-animations/FlatRoofTPOAnimation";
import { HailDamageAnimation } from "./service-animations/HailDamageAnimation";
import { IceDamAnimation } from "./service-animations/IceDamAnimation";
import { InsuranceClaimsAnimation } from "./service-animations/InsuranceClaimsAnimation";
import { MoldRemediationAnimation } from "./service-animations/MoldRemediationAnimation";
import { RoofInspectionAnimation } from "./service-animations/RoofInspectionAnimation";
import { RoofRepairAnimation } from "./service-animations/RoofRepairAnimation";
import { RoofReplacementAnimation } from "./service-animations/RoofReplacementAnimation";
import { WaterDamageAnimation } from "./service-animations/WaterDamageAnimation";

export type ServiceVisualType =
  | "repair"
  | "replacement"
  | "storm"
  | "flat"
  | "commercial"
  | "inspection"
  | "roofing"
  | "water"
  | "fire"
  | "mold"
  | "biohazard"
  | "claims"
  | "commercial-restoration";

type ServiceVisualProps = {
  type: ServiceVisualType;
  label?: string;
  compact?: boolean;
};

/** Thin dispatcher only. Every service owns its own scene, markup and keyframes. */
export function RoofingServiceVisual({ type, compact = false }: ServiceVisualProps) {
  if (type === "repair") return <RoofRepairAnimation compact={compact} />;
  if (type === "replacement") return <RoofReplacementAnimation compact={compact} />;
  if (type === "storm") return <HailDamageAnimation compact={compact} />;
  if (type === "flat") return <FlatRoofTPOAnimation compact={compact} />;
  if (type === "commercial") return <CommercialRoofAnimation compact={compact} />;
  if (type === "inspection") return <RoofInspectionAnimation compact={compact} />;
  if (type === "water") return <WaterDamageAnimation compact={compact} />;
  if (type === "fire") return <FireSmokeAnimation compact={compact} />;
  if (type === "mold") return <MoldRemediationAnimation compact={compact} />;
  if (type === "biohazard") return <BiohazardAnimation compact={compact} />;
  if (type === "claims") return <InsuranceClaimsAnimation compact={compact} />;
  if (type === "commercial-restoration") return <CommercialRestorationAnimation compact={compact} />;
  return <IceDamAnimation compact={compact} />;
}
