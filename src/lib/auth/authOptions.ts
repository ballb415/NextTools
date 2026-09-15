import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/credits/creditManager";

if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "next-tools-default-build-secret-key-32-chars-long";
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@nexttools.co" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("กรุณากรอกอีเมลและรหัสผ่าน");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user || !user.password) {
          throw new Error("ไม่พบบัญชีผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("รหัสผ่านไม่ถูกต้อง");
        }

        // Ensure wallet exists
        await getOrCreateWallet(user.id);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          plan: user.plan,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user.role as "USER" | "ADMIN") || "USER";
        token.plan = (user.plan as "FREE" | "PRO") || "FREE";
      } else {
        const userId = (token.id as string) || (token.sub as string);
        if (userId) {
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, plan: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role as "USER" | "ADMIN";
            token.plan = dbUser.plan as "FREE" | "PRO";
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      const userId = (token.id as string) || (token.sub as string);
      if (session.user && userId) {
        session.user.id = userId;
        session.user.role = (token.role as "USER" | "ADMIN") || "USER";
        session.user.plan = (token.plan as "FREE" | "PRO") || "FREE";

        // Query fresh wallet balance
        const wallet = await prisma.creditWallet.findUnique({
          where: { userId },
          select: { balance: true },
        });
        session.user.credits = wallet ? wallet.balance : 0;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Create wallet and log audit log
      if (user.id) {
        await getOrCreateWallet(user.id);
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "USER_REGISTERED",
            metadata: JSON.stringify({ email: user.email, provider: "oauth" }),
          },
        });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "local-development-nextauth-secret-key-32-chars-long",
};
