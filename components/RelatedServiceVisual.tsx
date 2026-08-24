type RelatedVisualType = "roofing" | "repair" | "replacement" | "inspection" | "storm" | "commercial";

export function RelatedServiceVisual({ type }: { type: RelatedVisualType }) {
  if (type === "repair") {
    return (
      <div className="relatedVisual relatedVisualScene relatedRepairScene" aria-hidden="true">
        <div className="visualAtmosphere" />
        <div className="repairRoofPlane"><i /><i /><i /><i /><i /></div>
        <div className="repairDamage"><span /><span /><span /></div>
        <div className="repairPatch" />
        <div className="repairTool"><b /><i /></div>
        <div className="repairSealLine" />
        <div className="visualStatus">LEAK FOUND → SEALED</div>
      </div>
    );
  }

  if (type === "replacement") {
    return (
      <div className="relatedVisual relatedVisualScene relatedReplacementScene" aria-hidden="true">
        <div className="visualAtmosphere" />
        <div className="replacementOldRoof"><i /><i /><i /><i /></div>
        <div className="replacementLift liftOne" />
        <div className="replacementLift liftTwo" />
        <div className="replacementDeck" />
        <div className="replacementUnderlayment" />
        <div className="replacementNewRoof"><i /><i /><i /><i /><i /><i /></div>
        <div className="visualStatus">TEAR-OFF → NEW SYSTEM</div>
      </div>
    );
  }

  if (type === "inspection") {
    return (
      <div className="relatedVisual relatedVisualScene relatedInspectionScene" aria-hidden="true">
        <div className="visualAtmosphere" />
        <div className="inspectionRoof"><i /><i /></div>
        <div className="inspectionScanner"><span /></div>
        <div className="inspectionHotspot hotspotOne" />
        <div className="inspectionHotspot hotspotTwo" />
        <div className="inspectionHotspot hotspotThree" />
        <div className="inspectionReadout"><b>SCAN</b><span>MOISTURE</span><span>FLASHING</span><span>VENT</span></div>
        <div className="visualStatus">ROOF HEALTH MAPPED</div>
      </div>
    );
  }

  if (type === "storm") {
    return (
      <div className="relatedVisual relatedVisualScene relatedStormScene" aria-hidden="true">
        <div className="stormFront"><i /><i /></div>
        <div className="stormBolt" />
        <div className="stormRoof"><i /><i /></div>
        <div className="stormHail hailA" /><div className="stormHail hailB" /><div className="stormHail hailC" /><div className="stormHail hailD" /><div className="stormHail hailE" />
        <div className="stormImpact impactA" /><div className="stormImpact impactB" />
        <div className="stormShield" />
        <div className="visualStatus">IMPACT → RESPONSE</div>
      </div>
    );
  }

  if (type === "commercial") {
    return (
      <div className="relatedVisual relatedVisualScene relatedCommercialScene" aria-hidden="true">
        <div className="visualAtmosphere" />
        <div className="commercialBuilding"><span /><span /><span /><span /></div>
        <div className="commercialMembrane"><i /><i /><i /></div>
        <div className="commercialDrain"><b /></div>
        <div className="commercialFlow flowOne" /><div className="commercialFlow flowTwo" />
        <div className="commercialSeal" />
        <div className="visualStatus">LOW-SLOPE SYSTEM PROTECTED</div>
      </div>
    );
  }

  return (
    <div className="relatedVisual relatedVisualScene relatedRoofingScene" aria-hidden="true">
      <div className="visualAtmosphere" />
      <div className="systemHouse"><span className="systemRoofLeft" /><span className="systemRoofRight" /><span className="systemWall" /></div>
      <div className="systemLayer layerOne" />
      <div className="systemLayer layerTwo" />
      <div className="systemLayer layerThree" />
      <div className="systemShield" />
      <div className="visualStatus">FULL ROOF SYSTEM</div>
    </div>
  );
}
