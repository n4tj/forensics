import { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";

function CommandCard({ command, description, example }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "rgba(15, 15, 25, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: 16,
        padding: "14px 16px",
        marginBottom: 12,
        backgroundImage: "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.08), transparent 50%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <span
          style={{
            color: "#00F5FF",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          {command}
        </span>
        <span style={{ color: "#8b5cf6", fontSize: "0.72rem", fontWeight: 500 }}>{description}</span>
      </div>
      <div
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: 10,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <code
          style={{
            color: "#e2e8f0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.8rem",
            flex: 1,
            wordBreak: "break-all",
          }}
        >
          {example}
        </code>
        <button
          onClick={copy}
          title="Copia"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: copied ? "#00F5FF" : "#6366f1",
            padding: "4px",
            flexShrink: 0,
            transition: "all 0.3s",
          }}
        >
          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default CommandCard;
