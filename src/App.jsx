import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Binary, FlaskConical, Star, Home,
  CheckCircle, Cpu, Search, Code2, Copy, Info,
} from "lucide-react";

/* ═══════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════ */

const BASE64_PAYLOAD = "Q1RGezRjYWRlbXlfbDFudXhfMjAyNH0=";
// decodes to: CTF{4cademy_l1nux_2024}

const TUTOR_STEPS = [
  {
    id: 0,
    title: "Benvenuto nel laboratorio",
    message:
      "Ciao! Oggi analizzeremo insieme un file sospetto chiamato evidenza.bin.\n\nInizia usando binwalk per vedere se il file contiene dati incorporati nascosti:\n\n→  binwalk evidenza.bin",
    hint: "binwalk evidenza.bin",
  },
  {
    id: 1,
    title: "Ottimo lavoro! 🎉",
    message:
      "Hai scoperto che il file contiene dati compressi e un filesystem nascosto.\n\nOra prova a usare strings per cercare testo leggibile all'interno:\n\n→  strings evidenza.bin",
    hint: "strings evidenza.bin",
  },
  {
    id: 2,
    title: "Perfetto! Continua così.",
    message:
      "Hai trovato diverse stringhe interessanti. Nota quella che termina con == — è codificata in Base64.\n\nLe stringhe con = o == alla fine nascondono spesso dati leggibili. Prova a decodificarla:\n\n→  echo \"" +
      BASE64_PAYLOAD +
      "\" | base64 -d",
    hint: `echo "${BASE64_PAYLOAD}" | base64 -d`,
  },
  {
    id: 3,
    title: "Analisi completata! 🎓",
    message:
      "Eccellente! Hai completato un flusso di analisi forense reale:\n\n✓ Identificato dati nascosti con binwalk\n✓ Estratto stringhe con strings\n✓ Decodificato un payload Base64\n\nQueste sono le tecniche fondamentali usate nelle indagini digitali professionali.",
    hint: null,
  },
];

const BINWALK_OUTPUT = `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             ELF, 64-bit LSB executable, x86-64
1024          0x400           LZMA compressed data, properties: 0x6D
8192          0x2000          Squashfs filesystem, little endian
24576         0x6000          PNG image, 640 x 480
45231         0xB0AF          JPEG image data, JFIF standard 1.01`.trim();

const STRINGS_OUTPUT = `/lib/x86_64-linux-gnu/libc.so.6
GLIBC_2.17
__gmon_start__
config.json
admin
password_backup.txt
forensics-lab-evidence
${BASE64_PAYLOAD}
/var/log/syslog
ERROR: checksum mismatch`.trim();

/* ═══════════════════════════════════════════
   TYPING TEXT COMPONENT
═══════════════════════════════════════════ */

function TypingText({ text, speed = 16, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setDisplayed("");
    setIdx(0);
  }, [text]);

  useEffect(() => {
    if (idx >= text.length) {
      onDone && onDone();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed((p) => p + text[idx]);
      setIdx((i) => i + 1);
    }, speed);
    return () => clearTimeout(t);
  }, [idx, text, speed, onDone]);

  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {displayed}
      {idx < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "#00F5FF",
            verticalAlign: "text-bottom",
            animation: "blink 1s step-end infinite",
          }}
        />
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════
   COMMAND CARD
═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   SECTION WRAPPER
═══════════════════════════════════════════ */

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3
        style={{
          color: "#F0F6FC",
          fontWeight: 600,
          fontSize: "1rem",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 4,
            height: 16,
            background: "linear-gradient(135deg, #00F5FF 0%, #8b5cf6 100%)",
            display: "inline-block",
            borderRadius: 2,
            flexShrink: 0,
            boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
          }}
        />
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */

function HomePage({ setSection }) {
  const tools = [
    {
      id: "binwalk",
      icon: <Binary size={22} />,
      name: "Binwalk",
      desc: "Analisi e identificazione di file binari e firmware",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "strings",
      icon: <Search size={22} />,
      name: "Strings",
      desc: "Ricerca di testo leggibile nei file",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: "base64",
      icon: <Code2 size={22} />,
      name: "Base64",
      desc: "Decodifica di dati codificati e payload",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      id: "lab",
      icon: <FlaskConical size={22} />,
      name: "Laboratorio",
      desc: "Pratica guidata con terminale interattivo",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
  ];

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
          <p
            style={{
              color: "#a8b2d1",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
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
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
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
              <div
                style={{
                  color: "#F0F6FC",
                  fontWeight: 600,
                  fontSize: "1.02rem",
                  marginBottom: 6,
                }}
              >
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

/* ═══════════════════════════════════════════
   TOOL PAGE (shared layout)
═══════════════════════════════════════════ */

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
                backgroundImage: `radial-gradient(circle at ${i % 2 === 0 ? '100%' : '0%'} 0%, rgba(139, 92, 246, 0.06), transparent 60%)`,
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

/* ═══════════════════════════════════════════
   BINWALK PAGE
═══════════════════════════════════════════ */

function BinwalkPage() {
  return (
    <ToolPage
      title="Binwalk"
      icon={<Binary size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      tagline="Analisi di file binari e firmware"
      whatIs={`Binwalk è uno strumento open-source progettato per analizzare, identificare ed estrarre dati nascosti all'interno di file binari.

Funziona scansionando il file alla ricerca di firme magiche (magic bytes) — sequenze di byte che identificano il tipo di dato incorporato — e le mostra con il loro offset all'interno del file.

È uno degli strumenti più usati dagli analisti forensi e dai ricercatori di sicurezza per capire rapidamente cosa contiene un file sospetto.`}
      forensicUse={[
        {
          title: "File nascosti in immagini",
          desc: "Identifica file ZIP, RAR o eseguibili nascosti dentro immagini PNG o JPEG — una tecnica chiamata steganografia.",
        },
        {
          title: "Estrazione di filesystem da firmware",
          desc: "Analizza ROM e firmware di router, telecamere e dispositivi IoT per trovare filesystem, kernel o file di configurazione.",
        },
        {
          title: "Analisi di file sospetti",
          desc: "Permette di capire immediatamente se un file è 'quello che sembra' oppure nasconde dati aggiuntivi.",
        },
      ]}
      commands={[
        { command: "binwalk file.bin", description: "Scansione base", example: "binwalk evidenza.bin" },
        { command: "binwalk -e file.bin", description: "Estrai i contenuti", example: "binwalk -e firmware.bin" },
        { command: "binwalk -B file.bin", description: "Mostra entropia", example: "binwalk -B sospetto.bin" },
        { command: "binwalk --dd='.*' file.bin", description: "Estrai tutti i tipi", example: "binwalk --dd='.*' dump.bin" },
      ]}
    />
  );
}

/* ═══════════════════════════════════════════
   STRINGS PAGE
═══════════════════════════════════════════ */

function StringsPage() {
  return (
    <ToolPage
      title="Strings"
      icon={<Search size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      tagline="Estrazione di testo leggibile dai file"
      whatIs={`Il comando strings estrae tutte le sequenze di caratteri stampabili presenti in un file binario. È uno degli strumenti più semplici ma più potenti dell'analisi forense.

Qualsiasi file — immagine, eseguibile, database — può contenere testo "nascosto": URL, password, messaggi, percorsi di sistema. Con strings puoi vederli tutti in pochi secondi, senza dover aprire un editor esadecimale.

Di default estrae stringhe di almeno 4 caratteri, ma la lunghezza minima è configurabile.`}
      forensicUse={[
        {
          title: "Password hardcoded",
          desc: "Sviluppatori a volte lasciano credenziali direttamente nel codice compilato — strings le individua immediatamente.",
        },
        {
          title: "Testo in file corrotti o cifrati",
          desc: "Anche se un file è danneggiato o parzialmente cifrato, spesso contiene sezioni di testo ancora leggibili.",
        },
        {
          title: "Token, URL e percorsi di sistema",
          desc: "API key, indirizzi di server, path di sistema e messaggi di debug: tutto emerge con strings.",
        },
      ]}
      commands={[
        { command: "strings file.bin", description: "Estrazione base", example: "strings evidenza.bin" },
        { command: "strings -n 8 file.bin", description: "Almeno 8 caratteri", example: "strings -n 8 firmware.bin" },
        { command: "strings -a file.bin", description: "Scansiona tutto il file", example: "strings -a dump.bin" },
        { command: "strings file | grep -i pass", description: "Filtra per parola chiave", example: "strings malware.exe | grep -i pass" },
      ]}
    />
  );
}

/* ═══════════════════════════════════════════
   BASE64 PAGE
═══════════════════════════════════════════ */

function Base64Page() {
  return (
    <ToolPage
      title="Base64"
      icon={<Code2 size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      tagline="Decodifica di dati codificati e payload"
      whatIs={`Base64 è un metodo di codifica (non crittografia!) che trasforma dati binari in una stringa di caratteri ASCII. È comunemente usato per trasmettere dati in contesti che supportano solo testo.

È riconoscibile perché usa solo lettere (A-Z, a-z), cifre (0-9), + e /, e termina spesso con uno o due simboli = (padding).

Nelle analisi forensi, trovare stringhe Base64 è molto comune: payload di malware, file di configurazione, comunicazioni tra sistemi compromessi — spesso si presentano come lunghe stringhe con == finale.`}
      forensicUse={[
        {
          title: "Payload codificati in malware",
          desc: "Malware e script malevoli nascondono spesso il codice reale in Base64 per eludere i sistemi antivirus.",
        },
        {
          title: "Riconoscere le stringhe Base64",
          desc: "La terminazione con = o == è il segnale più evidente. Anche l'assenza di caratteri speciali è un indizio.",
        },
        {
          title: "Messaggi e comunicazioni offuscate",
          desc: "Sistemi compromessi usano spesso Base64 come strato di offuscamento per comunicare dati in chiaro.",
        },
      ]}
      commands={[
        { command: 'echo "dGVzdA==" | base64 -d', description: "Decodifica stringa", example: 'echo "dGVzdA==" | base64 -d' },
        { command: "base64 -d file.txt", description: "Decodifica da file", example: "base64 -d encoded.txt" },
        { command: 'echo "testo" | base64', description: "Codifica testo", example: 'echo "forensics" | base64' },
        { command: "base64 -d -i file.b64", description: "Ignora caratteri non validi", example: "base64 -d -i payload.b64" },
      ]}
    />
  );
}

/* ═══════════════════════════════════════════
   LAB / TERMINAL PAGE
═══════════════════════════════════════════ */

function LabPage() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [tutorTyping, setTutorTyping] = useState(true);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const tutor = TUTOR_STEPS[Math.min(step, TUTOR_STEPS.length - 1)];

  const addLines = (lines) => setHistory((h) => [...h, ...lines]);

  const handleCommand = (raw) => {
    const cmd = raw.trim();
    addLines([{ type: "input", text: cmd }]);
    if (!cmd) return;

    // ── clear ──
    if (cmd === "clear") { setHistory([]); return; }

    // ── help ──
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

    // ── binwalk evidenza.bin ──
    if (cmd === "binwalk evidenza.bin") {
      addLines([{ type: "output", text: BINWALK_OUTPUT }]);
      if (step === 0) {
        setCompletedSteps((s) => new Set(s).add(0));
        setTimeout(() => { setStep(1); setTutorTyping(true); }, 700);
      }
      return;
    }

    // ── strings evidenza.bin ──
    if (cmd === "strings evidenza.bin") {
      addLines([{ type: "output", text: STRINGS_OUTPUT }]);
      if (step === 1) {
        setCompletedSteps((s) => new Set(s).add(1));
        setTimeout(() => { setStep(2); setTutorTyping(true); }, 700);
      }
      return;
    }

    // ── base64 -d (flexible match) ──
    if (cmd.includes("base64 -d") && cmd.includes(BASE64_PAYLOAD.slice(0, 18))) {
      addLines([{ type: "success", text: "CTF{4cademy_l1nux_2024}" }]);
      if (step === 2) {
        setCompletedSteps((s) => new Set(s).add(2));
        setTimeout(() => { setStep(3); setTutorTyping(true); }, 700);
      }
      return;
    }

    // ── partial guidance ──
    if (cmd.startsWith("binwalk") && !cmd.includes("evidenza.bin")) {
      addLines([{ type: "warn", text: "Manca il file da analizzare. Prova: binwalk evidenza.bin" }]);
      return;
    }
    if (cmd.startsWith("strings") && !cmd.includes("evidenza.bin")) {
      addLines([{ type: "warn", text: "Manca il file da analizzare. Prova: strings evidenza.bin" }]);
      return;
    }

    // ── unknown ──
    addLines([
      { type: "error", text: `Comando non riconosciuto: '${cmd}'` },
      { type: "info",  text: "Prova a seguire il suggerimento del tutor, oppure digita 'help'." },
    ]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const colorMap = {
    input:   "#F0F6FC",
    output:  "#9ca3af",
    success: "#00F5FF",
    error:   "#f5576c",
    warn:    "#fee140",
    info:    "#8b5cf6",
    cmd:     "#d4d4d8",
  };

  const progressLabels = ["Binwalk", "Strings", "Base64"];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <FlaskConical size={22} style={{ color: "#fee140" }} />
          <h2
            style={{
              color: "#F0F6FC",
              fontWeight: 700,
              fontSize: "1.3rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Laboratorio Terminale
          </h2>
          <div style={{ display: "flex", gap: 10, marginLeft: "auto", flexWrap: "wrap" }}>
            {progressLabels.map((label, i) => (
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

          {/* ── Terminal ── */}
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
              <span
                style={{
                  color: "#00F5FF",
                  fontSize: "0.78rem",
                  marginLeft: 12,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 500,
                }}
              >
                utente@forensics-lab: ~
              </span>
            </div>

            {/* Output area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 18px",
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: "0.82rem",
                lineHeight: 1.8,
                cursor: "text",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.length === 0 && (
                <div style={{ color: "#4b5563" }}>
                  Digita{" "}
                  <span style={{ color: "#00F5FF" }}>help</span>{" "}
                  per vedere i comandi, oppure segui il suggerimento del tutor.
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
                    <pre
                      style={{
                        color: colorMap[line.type] || "#9ca3af",
                        whiteSpace: "pre-wrap",
                        margin: 0,
                        fontFamily: "inherit",
                        wordBreak: "break-word",
                      }}
                    >
                      {line.text}
                    </pre>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div
              style={{
                borderTop: "1px solid rgba(139, 92, 246, 0.2)",
                padding: "12px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.82rem",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
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
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#F0F6FC",
                  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                  fontSize: "0.82rem",
                  caretColor: "#00F5FF",
                }}
              />
            </div>
          </div>

          {/* ── Tutor Panel ── */}
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
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00F5FF 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 4px 16px rgba(0, 245, 255, 0.4)",
                }}
              >
                <BookOpen size={15} style={{ color: "white" }} />
              </div>
              <div>
                <div style={{ color: "#F0F6FC", fontWeight: 600, fontSize: "0.85rem" }}>
                  Assistente Lab
                </div>
                <div style={{ color: "#00F5FF", fontSize: "0.72rem", display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5FF", boxShadow: "0 0 8px #00F5FF" }} />
                  online
                </div>
              </div>
            </div>

            {/* Tutor body */}
            <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
              {/* Step progress bar */}
              <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
                {TUTOR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 99,
                      background:
                        i < step
                          ? "linear-gradient(90deg, #00F5FF, #8b5cf6)"
                          : i === step
                          ? "rgba(0, 245, 255, 0.3)"
                          : "rgba(255, 255, 255, 0.05)",
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
                  <div
                    style={{
                      color: "#00F5FF",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      marginBottom: 12,
                    }}
                  >
                    {tutor.title}
                  </div>

                  <div style={{ color: "#a8b2d1", fontSize: "0.82rem", lineHeight: 1.85 }}>
                    {tutorTyping ? (
                      <TypingText
                        key={`tutor-${step}`}
                        text={tutor.message}
                        speed={15}
                        onDone={() => setTutorTyping(false)}
                      />
                    ) : (
                      <span style={{ whiteSpace: "pre-line" }}>{tutor.message}</span>
                    )}
                  </div>

                  {/* Hint card */}
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
                      <div style={{ color: "#6b7280", fontSize: "0.7rem", marginBottom: 6 }}>
                        Prossimo passo:
                      </div>
                      <code
                        style={{
                          color: "#00F5FF",
                          fontSize: "0.74rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          wordBreak: "break-all",
                        }}
                      >
                        {tutor.hint}
                      </code>
                    </motion.div>
                  )}

                  {/* Completion badge */}
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
                      <div
                        style={{ color: "#00F5FF", fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        Percorso completato
                      </div>
                      <div
                        style={{
                          color: "#8b92a8",
                          fontSize: "0.75rem",
                          marginTop: 6,
                          lineHeight: 1.6,
                        }}
                      >
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

/* ═══════════════════════════════════════════
   CREDITS PAGE
═══════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════
   NAVIGATION + MAIN APP
═══════════════════════════════════════════ */

const NAV_ITEMS = [
  { id: "home",    label: "Home",        icon: <Home size={15} /> },
  { id: "binwalk", label: "Binwalk",     icon: <Binary size={15} /> },
  { id: "strings", label: "Strings",     icon: <Search size={15} /> },
  { id: "base64",  label: "Base64",      icon: <Code2 size={15} /> },
  { id: "lab",     label: "Laboratorio", icon: <FlaskConical size={15} /> },
  { id: "credits", label: "Crediti",     icon: <Star size={15} /> },
];

export default function App() {
  const [section, setSection] = useState("home");

  const renderSection = () => {
    switch (section) {
      case "home":    return <HomePage setSection={setSection} />;
      case "binwalk": return <BinwalkPage />;
      case "strings": return <StringsPage />;
      case "base64":  return <Base64Page />;
      case "lab":     return <LabPage />;
      case "credits": return <CreditsPage />;
      default:        return <HomePage setSection={setSection} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #1a0f2e 0%, #0a0512 50%, #000000 100%)",
        color: "#F0F6FC",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background mesh */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 245, 255, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)
          `,
          pointerEvents: "none",
          animation: "meshMove 20s ease-in-out infinite",
        }}
      />

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        ::-webkit-scrollbar-thumb { 
          background: linear-gradient(135deg, #8b5cf6, #00F5FF);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(135deg, #a78bfa, #22d3ee);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes meshMove {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @media (max-width: 768px) {
          .lab-main {
            flex-direction: column !important;
            height: auto !important;
          }
          .tutor-panel {
            width: 100% !important;
          }
        }

        button { font-family: inherit; }
      `}</style>

      {/* ── Navigation Bar ── */}
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
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}