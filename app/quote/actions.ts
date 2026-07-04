"use server";

import { revalidatePath } from "next/cache";

import { addQuoteRequest } from "@/lib/quote-store";
import type { QuoteFormState } from "@/lib/quote-form";

export async function submitQuoteRequest(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const fileUrl = String(formData.get("fileUrl") ?? "").trim();
  const projectType = String(formData.get("projectType") ?? "").trim();
  const material = String(formData.get("material") ?? "").trim();
  const targetDate = String(formData.get("targetDate") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));
  const transactionPeriod = String(formData.get("transactionPeriod") ?? "").trim();
  const serviceDescription = String(
    formData.get("serviceDescription") ?? "Printing Service",
  ).trim();
  const weight = Number(formData.get("weight") ?? 0);
  const pricePerGram = Number(formData.get("pricePerGram") ?? 0);
  const totalPayment = Number(formData.get("totalPayment") ?? 0);

  if (!name || !phone || !fileUrl) {
    return {
      success: false,
      message: "Please fill in name, phone number, and file link.",
    };
  }

  await addQuoteRequest({
    name,
    email,
    phone,
    fileUrl,
    projectType,
    quantity,
    material,
    targetDate,
    notes,
    transactionPeriod,
    serviceDescription,
    weight,
    pricePerGram,
    totalPayment,
  });

  revalidatePath("/admin/requests");

  return {
    success: true,
    message: "Quote request submitted. We will contact you shortly.",
    data: {
      name,
      email,
      phone,
      fileUrl,
      projectType,
      quantity,
      material,
      targetDate,
      notes,
      transactionPeriod,
      serviceDescription,
      weight,
      pricePerGram,
      totalPayment,
    },
  };
}

