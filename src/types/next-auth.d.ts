import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      plan: "FREE" | "PRO";
      credits?: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string;
    plan?: string;
    credits?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN";
    plan?: "FREE" | "PRO";
  }
}
