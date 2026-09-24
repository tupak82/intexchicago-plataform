import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { ogImageSize } from "@/lib/seo";

// Default social share image, generated at build time from the existing brand mark and brand
// string (no binary asset or stock photo). Served as /og-image.png (a file-extension path, so the
// trailingSlash redirect does not apply) and referenced via lib/seo.ts defaultOgImages.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #12304f 0%, #07111d 70%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 22,
              border: "3px solid rgba(102,199,255,.55)",
              background: "#0b1b2d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 16, height: 56, borderRadius: 3, background: "#72c7ff", display: "flex" }} />
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Roofing, storm damage & property restoration
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#a9c3dd" }}>Chicago & Chicagoland homes and businesses</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30 }}>
          <div style={{ display: "flex", color: "#72c7ff", fontWeight: 700 }}>{site.phoneDisplay}</div>
          <div style={{ display: "flex", color: "#a9c3dd" }}>intexchicago.com</div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
