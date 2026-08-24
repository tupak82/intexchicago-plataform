import { CommercialRoofAnimation } from "./service-animations/CommercialRoofAnimation";
import { FlatRoofTPOAnimation } from "./service-animations/FlatRoofTPOAnimation";
import { HailDamageAnimation } from "./service-animations/HailDamageAnimation";
import { RoofInspectionAnimation } from "./service-animations/RoofInspectionAnimation";
import { RoofRepairAnimation } from "./service-animations/RoofRepairAnimation";
import { RoofReplacementAnimation } from "./service-animations/RoofReplacementAnimation";

type ServiceAnimationType =
  | "repair"
  | "replacement"
  | "storm"
  | "flat"
  | "commercial"
  | "inspection";

/**
 * Compact card dispatcher. Each service renders its dedicated animation module;
 * this component intentionally contains no shared roof scene or shared keyframes.
 */
export function ServiceCardAnimation({ type }: { type: ServiceAnimationType }) {
  if (type === "repair") return <RoofRepairAnimation compact />;
  if (type === "replacement") return <RoofReplacementAnimation compact />;
  if (type === "storm") return <HailDamageAnimation compact />;
  if (type === "flat") return <FlatRoofTPOAnimation compact />;
  if (type === "commercial") return <CommercialRoofAnimation compact />;
  return <RoofInspectionAnimation compact />;
}
