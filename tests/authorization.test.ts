import { describe, it, expect } from "vitest";
import { verifyAdminRole, AuthorizationError } from "@/lib/auth/authorization";

describe("Server-Side Authorization Guards", () => {
  it("9. Unauthenticated or standard USER role is denied admin access", () => {
    // Unauthenticated (null)
    expect(verifyAdminRole(null)).toBe(false);

    // Standard User
    const standardUser = { id: "usr_123", email: "user@test.com", role: "USER" };
    expect(verifyAdminRole(standardUser)).toBe(false);

    // Custom non-admin role
    const guestUser = { id: "usr_456", email: "guest@test.com", role: "GUEST" };
    expect(verifyAdminRole(guestUser)).toBe(false);
  });

  it("10. Verified ADMIN role is granted admin access", () => {
    const adminUser = { id: "admin_999", email: "admin@nexttools.co", role: "ADMIN" };
    expect(verifyAdminRole(adminUser)).toBe(true);
  });

  it("11. AuthorizationError produces 403 Forbidden status code", () => {
    const error = new AuthorizationError("คุณไม่มีสิทธิ์ผู้ดูแลระบบ", 403);
    expect(error.statusCode).toBe(403);
    expect(error.name).toBe("AuthorizationError");
  });
});
