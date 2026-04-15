"use client";

import { signInWithEmailAndPassword, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { firebaseAuth, firestore } from "@/lib/firebase";

export async function authenticateAdmin(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  console.log("asdas");
  const user = userCredential.user;

  // Check if user is an admin
  const isAdmin = await checkAdminStatus(user.email);
  if (!isAdmin) {
    throw new Error("Access denied: User is not an admin");
  }

  return user;
}

async function checkAdminStatus(email: string | null): Promise<boolean> {
  if (!email) return false;

  try {
    const adminDoc = await getDoc(doc(firestore, "admins", email));
    return adminDoc.exists();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

