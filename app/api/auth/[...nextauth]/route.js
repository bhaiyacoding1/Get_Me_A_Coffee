import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import connectDB from '@/db/connectDb';
import User from '@/models/User';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await connectDB();
        
        // Check if the user already exists in the database
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          // Create a new user
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
        return true;
      }
      return false;  // This handles other providers if added in the future
    },
    async session({ session, user, token }) {
      await connectDB(); // Ensure database connection
      
      // Find the user in the database
      const dbUser = await User.findOne({ email: session.user.email });
      
      // Add the username to the session object
      session.user.name = dbUser?.username || session.user.name; // Fallback to existing session name
      
      return session;
    },
  }
});

export { authoptions as GET, authoptions as POST }
