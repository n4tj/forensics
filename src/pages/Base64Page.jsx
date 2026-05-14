import { Code2 } from "lucide-react";
import ToolPage from "../components/ToolPage";

function Base64Page() {
  return (
    <ToolPage
      title="Base64"
      icon={<Code2 size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      tagline="Decodifica di dati codificati e payload"
      whatIs={`Base64 è un metodo di codifica (non crittografia!) che trasforma dati binari in una stringa di caratteri ASCII. È comunemente usato per trasmettere dati in contesti che supportano solo testo.\n\nÈ riconoscibile perché usa solo lettere (A-Z, a-z), cifre (0-9), + e /, e termina spesso con uno o due simboli = (padding).\n\nNelle analisi forensi, trovare stringhe Base64 è molto comune: payload di malware, file di configurazione, comunicazioni tra sistemi compromessi — spesso si presentano come lunghe stringhe con == finale.`}
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
        { command: 'echo "dGVzdA==" | base64 -d', description: "Decodifica stringa",          example: 'echo "dGVzdA==" | base64 -d' },
        { command: "base64 -d file.txt",           description: "Decodifica da file",           example: "base64 -d encoded.txt" },
        { command: 'echo "testo" | base64',        description: "Codifica testo",               example: 'echo "forensics" | base64' },
        { command: "base64 -d -i file.b64",        description: "Ignora caratteri non validi",  example: "base64 -d -i payload.b64" },
      ]}
    />
  );
}

export default Base64Page;