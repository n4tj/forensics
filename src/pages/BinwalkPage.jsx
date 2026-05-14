import { Binary } from "lucide-react";
import ToolPage from "../components/ToolPage";

function BinwalkPage() {
  return (
    <ToolPage
      title="Binwalk"
      icon={<Binary size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      tagline="Analisi di file binari e firmware"
      whatIs={`Binwalk è uno strumento open-source progettato per analizzare, identificare ed estrarre dati nascosti all'interno di file binari.\n\nFunziona scansionando il file alla ricerca di firme magiche (magic bytes) — sequenze di byte che identificano il tipo di dato incorporato — e le mostra con il loro offset all'interno del file.\n\nÈ uno degli strumenti più usati dagli analisti forensi e dai ricercatori di sicurezza per capire rapidamente cosa contiene un file sospetto.`}
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
        { command: "binwalk file.bin",         description: "Scansione base",      example: "binwalk evidenza.bin" },
        { command: "binwalk -e file.bin",       description: "Estrai i contenuti",  example: "binwalk -e firmware.bin" },
        { command: "binwalk -B file.bin",       description: "Mostra entropia",     example: "binwalk -B sospetto.bin" },
        { command: "binwalk --dd='.*' file.bin",description: "Estrai tutti i tipi", example: "binwalk --dd='.*' dump.bin" },
      ]}
    />
  );
}

export default BinwalkPage;