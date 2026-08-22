import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <p className="kicker"><span /> 404</p>
        <h1>This page moved or no longer exists.</h1>
        <p>If you followed an older Intex link, the migration may have changed its address. Use the service links below or contact Intex directly.</p>
      </section>
      <section className="platformSection">
        <div className="platformGrid">
          <a className="platformCard" href="/roofing-chicago/"><span>Roofing</span><h2>Roofing help</h2><p>Roof repair, leaks, storm damage, and restoration.</p><b>Open roofing →</b></a>
          <a className="platformCard" href="/water-damage-restoration-chicago/"><span>Restoration</span><h2>Water damage</h2><p>Start with mitigation and a clear recovery path.</p><b>Open water damage →</b></a>
          <a className="platformCard" href="/resources/"><span>Resources</span><h2>Property recovery guides</h2><p>Practical guidance for storms, water damage, and insurance documentation.</p><b>Browse resources →</b></a>
        </div>
        <div className="serviceCta" style={{ marginTop: 48 }}>
          <div><p className="kicker"><span /> Need help now?</p><h2>Talk to Intex.</h2></div>
          <div><p>For an active property issue, calling is the fastest path.</p><div className="heroActions"><a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a><a className="secondaryButton" href="/contact/">Contact Intex</a></div></div>
        </div>
      </section>
    </main>
  );
}
