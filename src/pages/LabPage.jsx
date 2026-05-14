import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, BookOpen, CheckCircle } from "lucide-react";
import { TUTOR_STEPS, BINWALK_OUTPUT, STRINGS_OUTPUT, BASE64_PAYLOAD } from "../constants";
import TypingText from "../components/TypingText";

const COLOR_MAP = {
  input:   "#F0F6FC",
  output:  "#9ca3af",
  success: "#00F5FF",
  error:   "#f5576c",
  warn:    "#fee140",
  info:    "#8b5cf6",
  cmd:     "#d4d4d8",
};

const PROGRESS_LABELS = ["Binwalk", "Strings", "Base64"];

function LabPage() {
  const [history, setHistory]             = useState([]);
  const [input, setInput]                 = useState("");
  const [step, setStep]                   = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [tutorTyping, setTutorTyping]     = useState(true);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const tutor    = TUTOR_STEPS[Math.min(step, TUTOR_STEPS.length - 1)];
  const addLines = (lines) => setHistory((h) => [...h, ...lines]);

  const handleCommand = (raw) => {
    const cmd = raw.trim();
    addLines([{ type: "input", text: cmd }]);
    if (!cmd) return;

    if (cmd === "clear") { setHistory([]); return; }

    if (cmd === "help") {
      addLines([
        { type: "info", text: "Comandi disponibili in questo laboratorio:" },
        { type: "cmd",  text: "  binwalk evidenza.bin        → analizza il file binario" },
        { type: "cmd",  text: "  strings evidenza.bin        → cerca stringhe leggibili" },
        { type: "cmd",  text: `  echo "..." | base64 -d      → decodifica una stringa Base64` },
        { type: "cmd",  text: "  clear                       → pulisce il terminale" },
        { type: "cmd",  text: "  help                        → mostra questo messaggio" },
      ]);
      return;
    }

    if (cmd === "binwalk evidenza.bin") {
      addLines([{ type: "output", text: BINWALK_OUTPUT }]);
      if (step === 0) {
        setCompletedSteps((s) => new Set(s).add(0));
        setTimeout(() => { setStep(1); setTutorTyping(true); }, 700);
      }
      return;
    }

    if (cmd === "strings evidenza.bin") {
      addLines([{ type: "output", text: STRINGS_OUTPUT }]);
      if (step === 1) {
        setCompletedSteps((s) => new Set(s).add(1));
        setTimeout(() => { setStep(2); setTutorTyping(true); }, 700);
      }
      return;
    }

    if (cmd.includes("base64 -d") && cmd.includes(BASE64_PAYLOAD.slice(0, 18))) {
      addLines([{ type: "success", text: "CTF{4cademy_l1nux_2024}" }]);
      if (step === 2) {
        setCompletedSteps((s) => new Set(s).add(2));
        setTimeout(() => { setStep(3); setTutorTyping(true); }, 700);
      }
      return;
    }

    if (cmd.startsWith("binwalk") && !cmd.includes("evidenza.bin")) {
      addLines([{ type: "warn", text: "Manca il file da analizzare. Prova: binwalk evidenza.bin" }]);
      return;
    }
    if (cmd.startsWith("strings") && !cmd.includes("evidenza.bin")) {
      addLines([{ type: "warn", text: "Manca il file da analizzare. Prova: strings evidenza.bin" }]);
      return;
    }

    addLines([
      { type: "error", text: `Comando non riconosciuto: '${cmd}'` },
      { type: "info",  text: "Prova a seguire il suggerimento del tutor, oppure digita 'help'." },
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") { handleCommand(input); setInput(""); }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <FlaskConical size={22} style={{ color: "#fee140" }} />
          <h2 style={{ color: "#F0F6FC", fontWeight: 700, fontSize: "1.3rem", fontFamily: "'JetBrains Mono', monospace" }}>
            Laboratorio Terminale
          </h2>
          <div style={{ display: "flex", gap: 10, marginLeft: "auto", flexWrap: "wrap" }}>
            {PROGRESS_LABELS.map((label, i) => (
              <div
                key={i}
                style={{
                  background: completedSteps.has(i) ? "rgba(0, 245, 255, 0.15)" : "rgba(15, 15, 25, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: completedSteps.has(i) ? "1px solid rgba(0, 245, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.05)",
                  color: completedSteps.has(i) ? "#00F5FF" : "#8b92a8",
                  fontSize: "0.75rem",
                  padding: "4px 12px",
                  borderRadius: 999,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.4s",
                  fontWeight: 500,
                }}
              >
                {completedSteps.has(i) && <CheckCircle size={12} />}
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main panel */}
        <div className="lab-main" style={{ display: "flex", gap: 16, height: 580 }}>

          {/* Terminal */}
          <div
            style={{
              flex: 1,
              background: "rgba(10, 10, 18, 0.85)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minWidth: 0,
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(0, 245, 255, 0.05) 100%)",
                borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f5576c" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fee140" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#00F5FF" }} />
              <span style={{ color: "#00F5FF", fontSize: "0.78rem", marginLeft: 12, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>
                utente@forensics-lab: ~
              </span>
            </div>

            {/* Output */}
            <div
              style={{ flex: 1, overflowY: "auto", padding: "16px 18px", fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: "0.82rem", lineHeight: 1.8, cursor: "text" }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.length === 0 && (
                <div style={{ color: "#4b5563" }}>
                  Digita <span style={{ color: "#00F5FF" }}>help</span> per vedere i comandi, oppure segui il suggerimento del tutor.
                </div>
              )}
              {history.map((line, i) => (
                <div key={i} style={{ marginBottom: 2 }}>
                  {line.type === "input" ? (
                    <span>
                      <span style={{ color: "#00F5FF" }}>utente@forensics-lab</span>
                      <span style={{ color: "#F0F6FC" }}>:</span>
                      <span style={{ color: "#8b5cf6" }}>~</span>
                      <span style={{ color: "#F0F6FC" }}>$ </span>
                      <span style={{ color: "#F0F6FC" }}>{line.text}</span>
                    </span>
                  ) : (
                    <pre style={{ color: COLOR_MAP[line.type] || "#9ca3af", whiteSpace: "pre-wrap", margin: 0, fontFamily: "inherit", wordBreak: "break-word" }}>
                      {line.text}
                    </pre>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div style={{ borderTop: "1px solid rgba(139, 92, 246, 0.2)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, background: "rgba(0, 0, 0, 0.2)" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", whiteSpace: "nowrap", userSelect: "none" }}>
                <span style={{ color: "#00F5FF" }}>utente@forensics-lab</span>
                <span style={{ color: "#f4f4f5" }}>:</span>
                <span style={{ color: "#8b5cf6" }}>~</span>
                <span style={{ color: "#f4f4f5" }}>$</span>
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck="false"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#F0F6FC", fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: "0.82rem", caretColor: "#00F5FF" }}
              />
            </div>
          </div>

          {/* Tutor Panel */}
          <div
            className="tutor-panel"
            style={{
              width: 320,
              background: "rgba(15, 15, 25, 0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: 18,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Tutor header */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(0, 245, 255, 0.1) 100%)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #00F5FF 0%, #8b5cf6 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, boxShadow: "0 4px 16px rgba(0, 245, 255, 0.4)",
                }}
              >
                <BookOpen size={15} style={{ color: "white" }} />
              </div>
              <div>
                <div style={{ color: "#F0F6FC", fontWeight: 600, fontSize: "0.85rem" }}>Assistente Lab</div>
                <div style={{ color: "#00F5FF", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
                  online
                </div>
              </div>
            </div>

            {/* Tutor body */}
            <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
              {/* Progress bar */}
              <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                {TUTOR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1, height: 4, borderRadius: 99,
                      background: i < step ? "linear-gradient(90deg, #00F5FF, #8b5cf6)" : i === step ? "rgba(0, 245, 255, 0.3)" : "rgba(255, 255, 255, 0.05)",
                      transition: "background 0.5s",
                      boxShadow: i <= step ? "0 0 8px rgba(0, 245, 255, 0.4)" : "none",
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ color: "#00F5FF", fontWeight: 600, fontSize: "0.85rem", marginBottom: 12 }}>
                    {tutor.title}
                  </div>
                  <div style={{ color: "#a8b2d1", fontSize: "0.82rem", lineHeight: 1.85 }}>
                    {tutorTyping ? (
                      <TypingText key={`tutor-${step}`} text={tutor.message} speed={15} onDone={() => setTutorTyping(false)} />
                    ) : (
                      <span style={{ whiteSpace: "pre-line" }}>{tutor.message}</span>
                    )}
                  </div>

                  {tutor.hint && !tutorTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        marginTop: 18,
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(0, 245, 255, 0.2)",
                        borderRadius: 12,
                        padding: "10px 13px",
                        boxShadow: "0 0 20px rgba(0, 245, 255, 0.1)",
                      }}
                    >
                      <div style={{ color: "#6b7280", fontSize: "0.7rem", marginBottom: 6 }}>Prossimo passo:</div>
                      <code style={{ color: "#00F5FF", fontSize: "0.74rem", fontFamily: "'JetBrains Mono', monospace", wordBreak: "break-all" }}>
                        {tutor.hint}
                      </code>
                    </motion.div>
                  )}

                  {step === 3 && !tutorTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{
                        marginTop: 20,
                        background: "linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                        border: "1px solid rgba(0, 245, 255, 0.3)",
                        borderRadius: 14,
                        padding: "16px 14px",
                        textAlign: "center",
                        boxShadow: "0 0 30px rgba(0, 245, 255, 0.2)",
                      }}
                    >
                      <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>🎓</div>
                      <div style={{ color: "#00F5FF", fontWeight: 700, fontSize: "0.9rem" }}>Percorso completato</div>
                      <div style={{ color: "#8b92a8", fontSize: "0.75rem", marginTop: 6, lineHeight: 1.6 }}>
                        Hai imparato 3 strumenti forensi fondamentali
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default LabPage;