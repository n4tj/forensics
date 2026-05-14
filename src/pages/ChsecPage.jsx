import { ShieldCheck } from "lucide-react";
import ToolPage from "../components/ToolPage";

function ChsecPage() {
  return (
    <ToolPage
      title="Checksec"
      icon={<ShieldCheck size={24} style={{ color: "white" }} />}
      gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      tagline="Analisi delle protezioni di sicurezza di un binario"
      whatIs={`Checksec è uno strumento che analizza le protezioni di sicurezza compilate all'interno di un eseguibile ELF (Linux).\n\nMostra in modo immediato quali mitigazioni contro exploit sono attive o assenti: canary, NX, PIE, RELRO e altre. Queste protezioni sono fondamentali per determinare la vulnerabilità di un binario ad attacchi come buffer overflow o return-oriented programming.\n\nÈ uno dei primi strumenti da usare quando si analizza un eseguibile sospetto o si affronta una challenge CTF.`}
      forensicUse={[
        {
          title: "Valutazione della superficie di attacco",
          desc: "Un binario senza canary, NX e PIE è altamente vulnerabile — checksec permette di capirlo in un secondo.",
        },
        {
          title: "Analisi di malware",
          desc: "Verificare se un eseguibile malevolo è stato compilato senza protezioni di proposito, tipico di exploit loader o shellcode dropper.",
        },
        {
          title: "CTF e reverse engineering",
          desc: "Determinare quale tecnica di exploit applicare in base alle protezioni presenti o assenti nel binario target.",
        },
      ]}
      commands={[
        { command: "checksec file",              description: "Analisi base delle protezioni",           example: "checksec evidenza.bin" },
        { command: "checksec --file=file",        description: "Sintassi alternativa",                    example: "checksec --file=sospetto.elf" },
        { command: "checksec --process=nome",     description: "Analizza un processo in esecuzione",      example: "checksec --process=nginx" },
        { command: "checksec --format=json file", description: "Output in formato JSON",                  example: "checksec --format=json target.bin" },
      ]}
    />
  );
}

export default ChsecPage;
