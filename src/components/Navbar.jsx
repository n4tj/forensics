import { Cpu, Home, Binary, Search, Code2, FlaskConical, Star } from "lucide-react";
import { NAV_ITEMS } from "../constants";

const NAV_ICONS = {
  home:    <Home size={15} />,
  binwalk: <Binary size={15} />,
  strings: <Search size={15} />,
  base64:  <Code2 size={15} />,
  lab:     <FlaskConical size={15} />,
  credits: <Star size={15} />,
};

function Navbar({ section, setSection }) {
  return (
    <nav
      style={{
        background: "rgba(10, 10, 18, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 24px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          height: 56,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginRight: 28,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #00F5FF, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(0, 245, 255, 0.4)",
            }}
          >
            <Cpu size={18} style={{ color: "white" }} />
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: "#F0F6FC",
              letterSpacing: "-0.3px",
            }}
          >
            ForensicsLab
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {NAV_ITEMS.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 13px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  background: active
                    ? "linear-gradient(135deg, rgba(0, 245, 255, 0.15), rgba(139, 92, 246, 0.15))"
                    : "transparent",
                  color: active ? "#00F5FF" : "#8b92a8",
                  fontWeight: active ? 600 : 400,
                  fontSize: "0.82rem",
                  transition: "all 0.2s",
                  boxShadow: active ? "0 0 16px rgba(0, 245, 255, 0.2)" : "none",
                }}
              >
                {NAV_ICONS[item.id]}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;