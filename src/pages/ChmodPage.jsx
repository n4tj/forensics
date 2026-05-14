import { Lock } from "lucide-react";
import ToolPage from "../components/ToolPage";

function ChmodPage() {
  return (
    <ToolPage
      title="Chmod"
      icon={<Lock size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      tagline="Gestione dei permessi su file e directory"
      whatIs={`Chmod (change mode) è il comando Linux per impostare i permessi di accesso a file e directory.\n\nI permessi definiscono chi può leggere (r), scrivere (w) o eseguire (x) un file, e si applicano separatamente al proprietario, al gruppo e agli altri utenti.\n\nIn ambito forense è fondamentale impostare permessi restrittivi sui file di evidenza per preservarne l'integrità e impedire modifiche accidentali.`}
      forensicUse={[
        {
          title: "Protezione delle evidenze",
          desc: "Impostare il file in sola lettura (chmod 400) impedisce modifiche accidentali che potrebbero invalidare la prova digitale.",
        },
        {
          title: "Controllo degli accessi",
          desc: "Limitare l'accesso ai file di dump o log sensibili ai soli utenti autorizzati durante un'indagine.",
        },
        {
          title: "Analisi dei permessi sospetti",
          desc: "Verificare se un file ha permessi insoliti (es. setuid) che potrebbero indicare una backdoor o una compromissione.",
        },
      ]}
      commands={[
        { command: "chmod 600 file",    description: "Solo il proprietario può leggere e scrivere",  example: "chmod 600 evidenza.bin" },
        { command: "chmod 400 file",    description: "Solo lettura per il proprietario",              example: "chmod 400 dump.raw" },
        { command: "chmod 755 file",    description: "Eseguibile da tutti, scrivibile solo dal proprietario", example: "chmod 755 script.sh" },
        { command: "ls -l file",        description: "Visualizza i permessi attuali",                 example: "ls -l evidenza.bin" },
      ]}
    />
  );
}

export default ChmodPage;
