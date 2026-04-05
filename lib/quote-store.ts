import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import type { QuoteRequest } from "@/lib/types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "quotes.json");

async function readQuotes(): Promise<QuoteRequest[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as QuoteRequest[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveQuote(quote: QuoteRequest): Promise<void> {
  const existing = await readQuotes();
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify([quote, ...existing], null, 2), "utf8");
}

