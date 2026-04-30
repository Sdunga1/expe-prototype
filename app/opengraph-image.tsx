import { ImageResponse } from "next/og";

export const alt = "Expe - your in-stay concierge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FBF9F5",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Amber bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#FFC72C",
          }}
        />

        {/* Avatar + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#0E0F0C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                color: "#FBF9F5",
                fontSize: 36,
                lineHeight: 1,
                fontWeight: 500,
              }}
            >
              e
            </span>
            <span
              style={{
                position: "absolute",
                top: 11,
                right: 11,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#FFC72C",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 5,
              color: "#5A5B53",
              fontWeight: 500,
              display: "flex",
            }}
          >
            EXPE - CONCIERGE PROTOTYPE
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 4,
          }}
        >
          <div
            style={{
              fontSize: 110,
              lineHeight: 0.98,
              color: "#0E0F0C",
              fontWeight: 700,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            Your in-stay
          </div>
          <div
            style={{
              fontSize: 110,
              lineHeight: 0.98,
              color: "#0E0F0C",
              fontWeight: 700,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            concierge.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#5A5B53",
              marginTop: 22,
              maxWidth: 900,
              display: "flex",
            }}
          >
            QR-scan, session-only, no app. For every hotel and rental.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#A8A99F",
            fontSize: 16,
            letterSpacing: 3,
            fontWeight: 500,
          }}
        >
          <div style={{ display: "flex" }}>BUILT FOR THE DEMO</div>
          <div style={{ display: "flex" }}>2026</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
