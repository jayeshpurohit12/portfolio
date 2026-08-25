import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#081425",
        borderRadius: "8px",
        border: "1.5px solid #2e5bff",
        boxShadow: "0 0 10px rgba(46, 91, 255, 0.4)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: "-0.5px",
        color: "#ffffff",
      }}
    >
      <span
        style={{
          background:
            "linear-gradient(135deg, #efefff 0%, #b8c3ff 40%, #2e5bff 100%)",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        JP
      </span>
    </div>,
    {
      ...size,
    },
  );
}
