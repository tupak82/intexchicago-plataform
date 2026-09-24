import { ImageResponse } from "next/og";

export const dynamic = "force-static";

// Apple touch icon generated from the existing "I" brand mark (no binary asset required).
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #12304f 0%, #07111d 100%)",
        }}
      >
        <div style={{ width: 28, height: 100, borderRadius: 5, background: "#72c7ff", display: "flex" }} />
      </div>
    ),
    { width: 180, height: 180 },
  );
}
