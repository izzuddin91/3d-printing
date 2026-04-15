import type { QuoteRequest } from "@/lib/types";

export type QuoteFormState = {
    success: boolean;
    message: string;
    data?: Partial<QuoteRequest>;
};

export const initialQuoteFormState: QuoteFormState = {
    success: false,
    message: "",
    data: undefined,
};