import { redirect } from "next/navigation";
import { getCurrentUser } from "./session";

export class AuthorizationError extends Error {
  statusCode: number;

  constructor(message = "คุณไม่มีสิทธิ์เข้าถึงส่วนนี้ (Forbidden)", statusCode = 403) {
    super(message);
    this.name = "AuthorizationError";
    this.statusCode = statusCode;
  }
}

export class AuthenticationError extends Error {
  statusCode: number;

  constructor(message = "กรุณาเข้าสู่ระบบก่อนทำรายการ (Unauthorized)", statusCode = 401) {
    super(message);
    this.name = "AuthenticationError";
    this.statusCode = statusCode;
  }
}

/**
 * Server-side guard for authenticated pages.
 * Redirects to /login if unauthenticated.
 */
export async function requireAuth(redirectTo = "/login") {
  const user = await getCurrentUser();
  if (!user) {
    redirect(redirectTo);
  }
  return user;
}

/**
 * Server-side guard for Admin-only pages.
 * If unauthenticated -> redirects to /login.
 * If authenticated but role is not ADMIN -> throws 403 Forbidden error.
 */
export async function requireAdmin(redirectTo = "/login") {
  const user = await getCurrentUser();
  if (!user) {
    redirect(redirectTo);
  }

  if (user.role !== "ADMIN") {
    throw new AuthorizationError("คุณไม่มีสิทธิ์ผู้ดูแลระบบ (Admin role required)", 403);
  }

  return user;
}

/**
 * Pure authorization check for unit testing and API route guards.
 */
export function verifyAdminRole(user: { role?: string } | null | undefined): boolean {
  if (!user) return false;
  return user.role === "ADMIN";
}
