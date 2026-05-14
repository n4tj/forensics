import { motion } from "framer-motion";
import { Binary, FlaskConical, Cpu, ShieldCheck, Lock, Info } from "lucide-react";

const tools = [
  {
    id: "chmod",
    icon: <Lock size={22} />,
    name: "Chmod",
    desc: "Gestione dei permessi su file e directory",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "checksec",
    icon: <ShieldCheck size={22} />,
    name: "Checksec",
    desc: "Analisi delle protezioni di sicurezza di un binario",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "binwalk",
    icon: <Binary size={22} />,
    name: "Binwalk",
    desc: "Analisi e identificazione di file binari e firmware",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "lab",
    icon: <FlaskConical size={22} />,
    name: "Laboratorio",
    desc: "Pratica guidata con terminale interattivo",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

function HomePage({ setSection }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              background: "rgba(15, 15, 25, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)",
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Cpu size={44} style={{ color: "#00F5FF" }} />
          </motion.div>
          <h1
            style={{
              color: "#F0F6FC",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "2.4rem",
              fontWeight: 700,
              marginBottom: 14,
              letterSpacing: "-0.8px",
              background: "linear-gradient(135deg, #00F5FF 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ForensicsLab Academy
          </h1>
          <p style={{ color: "#a8b2d1", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: 520, margin: "0 auto" }}>
            Impara le basi della Computer Forensics con strumenti Linux essenziali,
            spiegazioni chiare e un laboratorio pratico guidato.
          </p>
        </div>

        {/* Tool cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {tools.map((tool, i) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSection(tool.id)}
              style={{
                background: "rgba(15, 15, 25, 0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: 20,
                padding: "24px 20px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: tool.gradient,
                  opacity: 0.08,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  display: "inline-flex",
                  background: tool.gradient,
                  borderRadius: 14,
                  padding: 11,
                  color: "white",
                  marginBottom: 14,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                }}
              >
                {tool.icon}
              </div>
              <div style={{ color: "#F0F6FC", fontWeight: 600, fontSize: "1.02rem", marginBottom: 6 }}>
                {tool.name}
              </div>
              <div style={{ color: "#8b92a8", fontSize: "0.85rem", lineHeight: 1.6 }}>
                {tool.desc}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            background: "rgba(15, 15, 25, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 245, 255, 0.2)",
            borderRadius: 16,
            padding: "18px 20px",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            backgroundImage: "radial-gradient(circle at 0% 0%, rgba(0, 245, 255, 0.1), transparent 50%)",
            boxShadow: "0 0 30px rgba(0, 245, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Info size={18} style={{ color: "#00F5FF", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ color: "#F0F6FC", fontWeight: 600, marginBottom: 5, fontSize: "0.92rem" }}>
              Come iniziare
            </div>
            <div style={{ color: "#a8b2d1", fontSize: "0.87rem", lineHeight: 1.75 }}>
              Studia ogni strumento nella sua sezione dedicata, poi metti in pratica
              nel <strong style={{ color: "#00F5FF" }}>Laboratorio Terminale</strong> dove
              un assistente virtuale ti accompagnerà passo dopo passo.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;