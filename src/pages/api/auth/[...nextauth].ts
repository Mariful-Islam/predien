import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock user lookup
        const user = { id: "1", name: "saad", email: "saad@gmail.com" };
        
        // Add your logic to verify password against database here
        if (credentials?.email === user.email && credentials?.password === "1731") {
          return user;
        }
        return null;
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/admin/login',
},
};

export default NextAuth(authOptions);