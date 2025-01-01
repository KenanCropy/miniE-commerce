import NextAuth, { DefaultSession, type Session }  from "next-auth"
//import authConfig from "./auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter"
import { db } from "@/lib/db";
import authConfig from "./auth.config";
//import { db } from "./lib/db";
//import { getUserById } from "./data/user";
//import { UserRole } from "@prisma/client";
//import { getAccountByUserId } from "./data/account";


//  declare module "next-auth" {
//    interface Session {
//      user:{
//        role: UserRole,
//        id: string,
//      }
//    }
//  }

//  export type ExtendUser = DefaultSession["user"] & {
//    role : UserRole,
//    isTwoFactorEnabled: boolean,
//    id: string,
//    isOAuth: boolean
//  };

//  declare module "next-auth"{
//    interface Session{
//       user: ExtendUser,

//    }
//  }


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages:{
    signIn: "/login",
    error: "/error"
  },
  events: {
    // async linkAccount({user}){
    //   await db.user.update({
    //     where:{id:user.id},
    //     data: {emailVerified: new Date()}
    //   })
    // }
  },
  callbacks: {
    async session({ session, token }:{session: Session, token?: any}) {

      if( session.user){
        session.user.name = token.name; 
        session.user.email = token.email;
        session.user.id = token.sub;
      }

      return session

    },
    async jwt({ token, user }) {
      
      if (user) {
        token.sub = user.id; 
      }
  
      return token;

    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
});