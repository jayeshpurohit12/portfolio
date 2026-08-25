import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#081425",
        borderRadius: "38px",
        border: "4px solid #2e5bff",
        boxShadow: "0 0 30px rgba(46, 91, 255, 0.5)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 84,
          letterSpacing: "-2px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #b8c3ff 45%, #2e5bff 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        JP
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#b8c3ff",
          fontFamily: "monospace",
        }}
      >
        &lt;MOBILE /&gt;
      </div>
    </div>,
    {
      ...size,
    },
  );
}
