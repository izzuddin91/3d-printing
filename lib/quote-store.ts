import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";
import type { QuoteRequest } from "@/lib/types";

type NewQuoteRequest = Omit<QuoteRequest, "id" | "createdAt">;

type QuoteRequestFilters = {
  transactionDate?: string;
  fromDate?: string;
  toDate?: string;
};

type QuoteRequestUpdate = Partial<
  Omit<
    QuoteRequest,
    "docId" | "id" | "createdAt"
  >
>;

type RevenueEntry = {
  id: string;
  docId?: string;
  monthKey: string;
  monthLabel: string;
  totalPayment: number;
  overheadCost: number;
  description: string;
  mySharePercent: number;
  partnerSharePercent: number;
  createdAt: string;
};

function normalizeQuoteRequest(raw: Partial<QuoteRequest>): QuoteRequest {
  const quantity = raw.quantity ?? 0;
  const weight = raw.weight ?? 0;
  const pricePerGram = raw.pricePerGram ?? 0;
  const totalPayment = raw.totalPayment ?? 0;

  return {
    docId: raw.docId ? String(raw.docId) : undefined,
    id: String(raw.id ?? ""),
    createdAt: String(raw.createdAt ?? ""),
    name: raw.name ? String(raw.name) : undefined,
    email: raw.email ? String(raw.email) : undefined,
    phone: raw.phone ? String(raw.phone) : undefined,
    fileUrl: raw.fileUrl ? String(raw.fileUrl) : undefined,
    projectType: raw.projectType ? String(raw.projectType) : undefined,
    quantity: Number.isFinite(Number(quantity)) ? Number(quantity) : 0,
    material: raw.material ? String(raw.material) : undefined,
    targetDate: raw.targetDate ? String(raw.targetDate) : undefined,
    notes: raw.notes ? String(raw.notes) : undefined,
    transactionPeriod: raw.transactionPeriod ? String(raw.transactionPeriod) : undefined,
    serviceDescription: raw.serviceDescription ? String(raw.serviceDescription) : undefined,
    weight: Number.isFinite(Number(weight)) ? Number(weight) : 0,
    pricePerGram: Number.isFinite(Number(pricePerGram)) ? Number(pricePerGram) : 0,
    totalPayment: Number.isFinite(Number(totalPayment)) ? Number(totalPayment) : 0,
  };
}

export async function addQuoteRequest(input: NewQuoteRequest): Promise<QuoteRequest> {
  const request: QuoteRequest = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  try {
    const snapshot = await addDoc(collection(firestore, "quotes"), request);
    return {
      ...request,
      docId: snapshot.id,
    };
  } catch (error) {
    console.error("Error adding quote request to Firestore:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to save quote request: ${error.message}`);
    }

    throw new Error("Failed to save quote request");
  }
}

export async function getQuoteRequests(filters?: QuoteRequestFilters): Promise<QuoteRequest[]> {
  try {
    const quotesCollection = collection(firestore, "quotes");
    const transactionDate = filters?.transactionDate;
    const fromDate = filters?.fromDate;
    const toDate = filters?.toDate;

    const q = transactionDate
      ? query(quotesCollection, where("transactionPeriod", "==", transactionDate))
      : fromDate || toDate
        ? query(
          quotesCollection,
          ...(fromDate ? [where("transactionPeriod", ">=", fromDate)] : []),
          ...(toDate ? [where("transactionPeriod", "<=", toDate)] : []),
          orderBy("transactionPeriod", "desc"),
        )
        : query(quotesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const normalized = querySnapshot.docs.map((snapshot) => {
      const data = snapshot.data() as Partial<QuoteRequest>;
      return normalizeQuoteRequest({
        ...data,
        docId: snapshot.id,
        id: data.id ?? snapshot.id,
      });
    });

    if (transactionDate || fromDate || toDate) {
      return normalized.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    return normalized;
  } catch (error) {
    console.error("Error fetching quote requests from Firestore:", error);
    // Return empty array during build time or when Firestore is not available
    return [];
  }
}

export async function getAllQuoteRequests(filters?: QuoteRequestFilters): Promise<QuoteRequest[]> {
  return getQuoteRequests(filters);
}

export async function deleteQuoteRequest(docId: string): Promise<void> {
  try {
    await deleteDoc(doc(firestore, "quotes", docId));
  } catch (error) {
    console.error("Error deleting quote request from Firestore:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete quote request: ${error.message}`);
    }

    throw new Error("Failed to delete quote request");
  }
}

export async function getQuoteRequestByDocId(docId: string): Promise<QuoteRequest | null> {
  try {
    const snapshot = await getDoc(doc(firestore, "quotes", docId));
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data() as Partial<QuoteRequest>;
    return normalizeQuoteRequest({
      ...data,
      docId: snapshot.id,
      id: data.id ?? snapshot.id,
    });
  } catch (error) {
    console.error("Error fetching quote request by doc id:", error);
    return null;
  }
}

export async function updateQuoteRequest(
  docId: string,
  updates: QuoteRequestUpdate,
): Promise<void> {
  const payload: QuoteRequestUpdate = {
    ...updates,
  };

  try {
    await updateDoc(doc(firestore, "quotes", docId), payload);
  } catch (error) {
    console.error("Error updating quote request in Firestore:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update quote request: ${error.message}`);
    }

    throw new Error("Failed to update quote request");
  }
}

export async function addRevenueEntry(input: Omit<RevenueEntry, "id" | "createdAt" | "docId">): Promise<RevenueEntry> {
  const entry: RevenueEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };

  try {
    const snapshot = await addDoc(collection(firestore, "revenue"), entry);
    return {
      ...entry,
      docId: snapshot.id,
    };
  } catch (error) {
    console.error("Error adding revenue entry to Firestore:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to save revenue entry: ${error.message}`);
    }

    throw new Error("Failed to save revenue entry");
  }
}

export async function getRevenueEntries(): Promise<RevenueEntry[]> {
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "revenue"), orderBy("createdAt", "desc")),
    );

    return querySnapshot.docs.map((snapshot) => {
      const data = snapshot.data() as Partial<RevenueEntry>;
      return {
        id: String(data.id ?? snapshot.id),
        docId: snapshot.id,
        monthKey: String(data.monthKey ?? ""),
        monthLabel: String(data.monthLabel ?? ""),
        totalPayment: Number(data.totalPayment ?? 0),
        overheadCost: Number(data.overheadCost ?? 0),
        description: String(data.description ?? ""),
        mySharePercent: Number(data.mySharePercent ?? 0),
        partnerSharePercent: Number(data.partnerSharePercent ?? 0),
        createdAt: String(data.createdAt ?? ""),
      };
    });
  } catch (error) {
    console.error("Error fetching revenue entries from Firestore:", error);
    return [];
  }
}

