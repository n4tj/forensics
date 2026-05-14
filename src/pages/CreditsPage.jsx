import { motion } from "framer-motion";

function CreditsPage() {
  const tools = [
    { name: "binwalk", desc: "Analisi file binari — Craig Heffner / ReFirm Labs" },
    { name: "strings", desc: "Estrazione stringhe — GNU Binutils" },
    { name: "base64", desc: "Codifica/decodifica — GNU coreutils" },
  ];

  return (
    <div style={{ maxWidth: 650, margin: "0 auto", padding: "70px 24px", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: 18 }}>🔬</div>
        <h2
          style={{
            color: "#F0F6FC",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.7rem",
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          ForensicsLab Academy
        </h2>
        <p style={{ color: "#a8b2d1", lineHeight: 1.85, marginBottom: 32, fontSize: "0.95rem" }}>
          Una piattaforma educativa dedicata all'apprendimento della Computer Forensics
          attraverso strumenti Linux essenziali, spiegazioni chiare e pratica guidata.
        </p>

        <div
          style={{
            background: "rgba(15, 15, 25, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: 16,
            padding: "24px",
            textAlign: "left",
            marginBottom: 24,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ color: "#F0F6FC", fontWeight: 600, marginBottom: 16, fontSize: "0.95rem" }}>
            Strumenti trattati
          </div>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 14,
                alignItems: "flex-start",
              }}
            >
              <code
                style={{
                  color: "#00F5FF",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  minWidth: 70,
                  flexShrink: 0,
                }}
              >
                {t.name}
              </code>
              <span style={{ color: "#a8b2d1", fontSize: "0.86rem", lineHeight: 1.65 }}>
                {t.desc}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 24,
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)",
          }}
        >
          <p style={{ color: "#a8b2d1", fontSize: "0.85rem", lineHeight: 1.75, margin: 0 }}>
            Realizzato a scopo puramente educativo. I comandi mostrati sono strumenti
            legittimi usati da professionisti della sicurezza informatica e del digital forensics.
          </p>
        </div>

        <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
          ForensicsLab Academy · 2024
        </p>
      </motion.div>
    </div>
  );
}

export default CreditsPage;
