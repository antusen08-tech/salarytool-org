import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#2563eb",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#2563eb",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              fontWeight: 700,
              marginRight: "16px",
            }}
          >
            ST
          </div>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#111827" }}>
            Salary<span style={{ color: "#2563eb" }}>Tool</span>
            <span style={{ color: "#9ca3af", fontWeight: 400, fontSize: "22px" }}>.org</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "900px",
            marginBottom: "20px",
          }}
        >
          Free Paycheck Calculator
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: "26px",
            color: "#6b7280",
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          Calculate your take-home pay for all 50 US states
        </div>

        {/* Tag pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Federal Taxes", "State Taxes", "FICA", "2025 Rates"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "999px",
                padding: "8px 20px",
                fontSize: "18px",
                color: "#2563eb",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
