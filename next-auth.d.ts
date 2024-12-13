import { DefaultSession } from "next-auth";

// Extend the SessionUser interface
declare module "next-auth" {
  interface SessionUser {
    userId: string;
  }

  // Extend the Session interface
  interface Session {
    user: SessionUser & DefaultSession["user"];
  }
}
