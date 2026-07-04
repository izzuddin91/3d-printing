"use client";

import { signInWithEmailAndPassword, User } from "firebase/auth";

import { firebaseAuth } from "@/lib/firebase";

type AdminAuthResult = {
  user: User;
  idToken: string;
};

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminAuthResult> {
  const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
  const user = userCredential.user;

  const idToken = await user.getIdToken();

  return { user, idToken };
}

