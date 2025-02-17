import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

interface AuthOptions {
  providers: any[];
  session: {
    strategy: SessionStrategy;
  };
  secret: string;
  callbacks?: {
    redirect: ({ baseUrl }: { baseUrl: string }) => Promise<string>;
  };
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret",
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
