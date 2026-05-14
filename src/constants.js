export const BASE64_PAYLOAD = "Q1RGezRjYWRlbXlfbDFudXhfMjAyNH0=";
// decodes to: CTF{4cademy_l1nux_2024}

export const TUTOR_STEPS = [
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

export const BINWALK_OUTPUT = `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             ELF, 64-bit LSB executable, x86-64
1024          0x400           LZMA compressed data, properties: 0x6D
8192          0x2000          Squashfs filesystem, little endian
24576         0x6000          PNG image, 640 x 480
45231         0xB0AF          JPEG image data, JFIF standard 1.01`.trim();

export const STRINGS_OUTPUT = `/lib/x86_64-linux-gnu/libc.so.6
GLIBC_2.17
__gmon_start__
config.json
admin
password_backup.txt
forensics-lab-evidence
${BASE64_PAYLOAD}
/var/log/syslog
ERROR: checksum mismatch`.trim();

export const NAV_ITEMS = [
  { id: "home",    label: "Home" },
  { id: "binwalk", label: "Binwalk" },
  { id: "strings", label: "Strings" },
  { id: "base64",  label: "Base64" },
  { id: "lab",     label: "Laboratorio" },
  { id: "credits", label: "Crediti" },
];
