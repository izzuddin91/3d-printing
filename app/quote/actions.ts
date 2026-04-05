"use server";

import { redirect } from "next/navigation";

import { saveQuote } from "@/lib/quote-store";
import { projectTypes } from "@/lib/site-data";
import type { QuoteRequest } from "@/lib/types";

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitQuote(formData: FormData): Promise<void> {
  const name = getText(formData, "name");
  const email = getText(formData, "email");
  const phone = getText(formData, "phone");
  const projectType = getText(formData, "projectType");
  const quantity = Number(getText(formData, "quantity"));
  const material = getText(formData, "material");
  const targetDate = getText(formData, "targetDate");
  const notes = getText(formData, "notes");

  if (!name || !email || !phone || !projectType || !material || !Number.isFinite(quantity) || quantity < 1) {
    redirect("/quote?error=invalid-input");
  }

  if (!isValidEmail(email)) {
    redirect("/quote?error=invalid-email");
  }

  if (!projectTypes.includes(projectType as (typeof projectTypes)[number])) {
    redirect("/quote?error=invalid-project-type");
  }

  const quote: QuoteRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    projectType,
    quantity,
    material,
    targetDate,
    notes,
  };

  await saveQuote(quote);
  redirect("/quote?submitted=1");
}

