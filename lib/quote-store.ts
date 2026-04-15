import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";

import { firestore } from "@/lib/firebase";
import type { QuoteRequest } from "@/lib/types";

type NewQuoteRequest = Omit<QuoteRequest, "id" | "createdAt">;

export async function addQuoteRequest(input: NewQuoteRequest): Promise<QuoteRequest> {
  const request: QuoteRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  try {
    await addDoc(collection(firestore, "quotes"), request);
    return request;
  } catch (error) {
    console.error("Error adding quote request to Firestore:", error);
    throw new Error("Failed to save quote request");
  }
}

export async function getQuoteRequests(): Promise<QuoteRequest[]> {
  try {
    const q = query(collection(firestore, "quotes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as QuoteRequest);
  } catch (error) {
    console.error("Error fetching quote requests from Firestore:", error);
    // Return empty array during build time or when Firestore is not available
    return [];
  }
}

export async function getAllQuoteRequests(): Promise<QuoteRequest[]> {
  return getQuoteRequests();
}

