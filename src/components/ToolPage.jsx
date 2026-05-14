import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Section from "./Section";
import CommandCard from "./CommandCard";

function ToolPage({ title, icon, gradient, tagline, whatIs, forensicUse, commands }) {
  return (
    <div style={{ maxWidth: 750, margin: "0 auto", padding: "48px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div
            style={{
              background: gradient,
              borderRadius: 18,
              padding: 14,
              display: "flex",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            {icon}
          </div>
          <div>
            <h2
              style={{
                color: "#F0F6FC",
                fontSize: "1.75rem",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 5,
              }}
            >
              {title}
            </h2>
            <p style={{ color: "#a8b2d1", fontSize: "0.9rem" }}>{tagline}</p>
          </div>
        </div>

        {/* What is */}
        <Section title="Che cos'è">
          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.9,
              fontSize: "0.93rem",
              whiteSpace: "pre-line",
            }}
          >
            {whatIs}
          </p>
        </Section>

        {/* Forensic use */}
        <Section title="Utilizzo nelle Analisi Forensi">
          {forensicUse.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              style={{
                background: "rgba(15, 15, 25, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: 14,
                padding: "15px 17px",
                marginBottom: 12,
                backgroundImage: `radial-gradient(circle at ${i % 2 === 0 ? "100%" : "0%"} 0%, rgba(139, 92, 246, 0.06), transparent 60%)`,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              }}
            >
              <div
                style={{
                  color: "#00F5FF",
                  fontWeight: 600,
                  marginBottom: 5,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <CheckCircle size={14} />
                {item.title}
              </div>
              <div style={{ color: "#a8b2d1", fontSize: "0.85rem", lineHeight: 1.7 }}>
                {item.desc}
              </div>
            </motion.div>
          ))}
        </Section>

        {/* Commands */}
        <Section title="Esempi di Sintassi">
          {commands.map((cmd, i) => (
            <CommandCard key={i} {...cmd} />
          ))}
        </Section>
      </motion.div>
    </div>
  );
}

export default ToolPage;