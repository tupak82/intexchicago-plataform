import "./service-card-animation.css";

type ServiceAnimationType =
  | "repair"
  | "replacement"
  | "storm"
  | "flat"
  | "commercial"
  | "inspection";

export function ServiceCardAnimation({ type }: { type: ServiceAnimationType }) {
  return (
    <div className={`serviceMotion serviceMotion--${type}`} aria-hidden="true">
      <div className="serviceMotionSky">
        <span className="serviceCloud serviceCloudA" />
        <span className="serviceCloud serviceCloudB" />
      </div>

      <div className="serviceHouse">
        <span className="serviceWall" />
        <span className="serviceRoof serviceRoofBase" />
        <span className="serviceRoof serviceRoofFinish" />
        <span className="serviceWindow" />
      </div>

      <span className="serviceTool" />
      <span className="servicePatch" />
      <span className="serviceMembrane" />
      <span className="serviceHail hailA" />
      <span className="serviceHail hailB" />
      <span className="serviceHail hailC" />
      <span className="serviceHail hailD" />
      <span className="serviceSpark sparkA" />
      <span className="serviceSpark sparkB" />
      <span className="serviceScan" />
      <span className="serviceLens" />
      <span className="serviceStatus" />
    </div>
  );
}
