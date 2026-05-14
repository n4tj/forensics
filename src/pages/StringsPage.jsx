import { Search } from "lucide-react";
import ToolPage from "../components/ToolPage";

function StringsPage() {
  return (
    <ToolPage
      title="Strings"
      icon={<Search size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      tagline="Estrazione di testo leggibile dai file"
      whatIs={`Il comando strings estrae tutte le sequenze di caratteri stampabili presenti in un file binario. È uno degli strumenti più semplici ma più potenti dell'analisi forense.\n\nQualsiasi file — immagine, eseguibile, database — può contenere testo "nascosto": URL, password, messaggi, percorsi di sistema. Con strings puoi vederli tutti in pochi secondi, senza dover aprire un editor esadecimale.\n\nDi default estrae stringhe di almeno 4 caratteri, ma la lunghezza minima è configurabile.`}
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
        { command: "strings file.bin",          description: "Estrazione base",        example: "strings evidenza.bin" },
        { command: "strings -n 8 file.bin",     description: "Almeno 8 caratteri",     example: "strings -n 8 firmware.bin" },
        { command: "strings -a file.bin",       description: "Scansiona tutto il file", example: "strings -a dump.bin" },
        { command: "strings file | grep -i pass",description: "Filtra per parola chiave",example: "strings malware.exe | grep -i pass" },
      ]}
    />
  );
}

export default StringsPage;