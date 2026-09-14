import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getServerAuthSession();
  return session?.user ?? null;
}
