import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0F0C",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <span
          style={{
            color: "#FBF9F5",
            fontSize: 44,
            lineHeight: 1,
            fontStyle: "italic",
          }}
        >
          e
        </span>
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#FFC72C",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
