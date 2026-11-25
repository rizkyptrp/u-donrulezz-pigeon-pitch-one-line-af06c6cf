import { mkdirSync, writeFileSync } from "node:fs";

// Pigeon Pitch, One Line — the one-line elevator pitch a city pigeon gives
// investors for its startup. Chosen from 10 scored variants plus an
// improvement pass (see the build report): the pitch opens with startup
// metrics every investor recognises (two million daily users, zero churn),
// then the punchline reframes "burn rate" literally — a pigeon's burn rate
// is garbage, and it eats it.
const entry = `Invest in us: two million daily users, zero churn, and a burn rate that's literally garbage. Because I eat it.`;

// Guard: the sealed scorer rejects an invalid entry with 0, so fail loudly
// here instead of silently writing a bad file. The entry must be a single
// line of 1–200 chars and contain more than whitespace.
const MIN_LEN = 1;
const MAX_LEN = 200;

function validateEntry(text: string): void {
  if (text.length < MIN_LEN || text.length > MAX_LEN) {
    throw new Error(`entry must be ${MIN_LEN}-${MAX_LEN} chars, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validateEntry(entry);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, entry, "utf8");
