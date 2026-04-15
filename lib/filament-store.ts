import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

import { firestore } from "@/lib/firebase";
import type { FilamentPrice } from "@/lib/types";

type NewFilamentPrice = Omit<FilamentPrice, "id" | "createdAt" | "updatedAt">;

export async function addFilamentPrice(input: NewFilamentPrice): Promise<FilamentPrice> {
    const filament: FilamentPrice = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...input,
    };

    try {
        await addDoc(collection(firestore, "filament-prices"), filament);
        return filament;
    } catch (error) {
        console.error("Error adding filament price to Firestore:", error);
        throw new Error("Failed to save filament price");
    }
}

export async function getFilamentPrices(): Promise<FilamentPrice[]> {
    try {
        const q = query(collection(firestore, "filament-prices"), orderBy("name"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as FilamentPrice);
    } catch (error) {
        console.error("Error fetching filament prices from Firestore:", error);
        return [];
    }
}

export async function updateFilamentPrice(
    id: string,
    updates: Partial<NewFilamentPrice>
): Promise<void> {
    try {
        const q = query(
            collection(firestore, "filament-prices"),
            where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Filament price not found");
        }

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
            ...updates,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error updating filament price:", error);
        throw new Error("Failed to update filament price");
    }
}

export async function deleteFilamentPrice(id: string): Promise<void> {
    try {
        const q = query(
            collection(firestore, "filament-prices"),
            where("id", "==", id)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("Filament price not found");
        }

        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting filament price:", error);
        throw new Error("Failed to delete filament price");
    }
}