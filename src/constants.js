export const CHMOD_OUTPUT = `Permessi attuali di evidenza.bin:
-rwxr-xr-x 1 utente utente 45231 mag 14 07:00 evidenza.bin

Dopo chmod 600 evidenza.bin:
-rw------- 1 utente utente 45231 mag 14 07:00 evidenza.bin`.trim();

export const CHECKSEC_OUTPUT = `[*] '/home/utente/evidenza.bin'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX disabled
    PIE:      No PIE (0x400000)
    RWX:      Has RWX segments`.trim();

export const BINWALK_OUTPUT = `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             ELF, 64-bit LSB executable, x86-64
1024          0x400           LZMA compressed data, properties: 0x6D
8192          0x2000          Squashfs filesystem, little endian
24576         0x6000          PNG image, 640 x 480
45231         0xB0AF          JPEG image data, JFIF standard 1.01`.trim();

export const TUTOR_STEPS = [
  {
    id: 0,
    title: "Benvenuto nel laboratorio",
    message:
      "Ciao! Oggi analizzeremo insieme un file sospetto chiamato evidenza.bin.\n\nInizia controllando i permessi del file con chmod:\n\n→  chmod 600 evidenza.bin",
    hint: "chmod 600 evidenza.bin",
  },
  {
    id: 1,
    title: "Ottimo lavoro! 🎉",
    message:
      "Hai ristretto i permessi del file — ora solo tu puoi leggerlo e scriverlo.\n\nOra usa checksec per analizzare le protezioni di sicurezza del binario:\n\n→  checksec evidenza.bin",
    hint: "checksec evidenza.bin",
  },
  {
    id: 2,
    title: "Perfetto! Continua così.",
    message:
      "Hai identificato le protezioni attive (e mancanti) del binario. NX disabilitato e nessun canary — un file sospetto!\n\nOra usa binwalk per vedere se nasconde dati incorporati:\n\n→  binwalk evidenza.bin",
    hint: "binwalk evidenza.bin",
  },
  {
    id: 3,
    title: "Analisi completata! 🎓",
    message:
      "Eccellente! Hai completato un flusso di analisi forense reale:\n\n✓ Impostato permessi sicuri con chmod\n✓ Analizzato le protezioni con checksec\n✓ Identificato dati nascosti con binwalk\n\nQueste sono le tecniche fondamentali usate nelle indagini digitali professionali.",
    hint: null,
  },
];

export const NAV_ITEMS = [
  { id: "home",     label: "Home" },
  { id: "chmod",    label: "Chmod" },
  { id: "checksec", label: "Checksec" },
  { id: "binwalk",  label: "Binwalk" },
  { id: "lab",      label: "Laboratorio" },
  { id: "credits",  label: "Crediti" },
];