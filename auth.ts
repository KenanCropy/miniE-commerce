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
    async signIn({ user, account }) {
      console.log("session geldi",user);

      //allow OAuth wigout email verification
      
      //const existingUser = await getUserById(user.id!);
        
        
    //   if(existingUser.isTwoFactorEnabled){
    //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        
    //     if(!twoFactorConfirmation) return false;

    //     await db.twoFactorConfirmatoin.delete({
    //       where: {id: twoFactorConfirmation.id}
    //     });
    //   }
      
      return true
    },
    async session({ session, token }:{session: Session, token?: any}) {

    //   if(token.sub && session.user){
    //     session.user.id = token.sub;
    //   }

    //   if(token.role && session.user){
    //     session.user.role = token.role as UserRole; // role'da aldığımız hatayı üst tarafta düzelttik
    //   }

    if( session.user){
    //     session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean // role'da aldığımız hatayı üst tarafta düzelttik
      session.user.name = token.name; // altta yaptığımız update işlemi değişikliği burada aktararak işlemi tamamlıyoruz
      session.user.email = token.email;// altta yaptığımız update işlemi değişikliği burada aktararak işlemi tamamlıyoruz
    //     session.user.isOAuth = token.isOAuth as boolean;
    }

      return session
    },
    async jwt({ token }) {
      
    //   if(!token.sub) return token;

    //   const existingUser = await getUserById(token.sub);

    //   if(!existingUser) return token;

    //   const existingAccount = await getAccountByUserId(
    //     existingUser.id
    //   )


    //   token.name = existingUser.name;// kullanıcı name değiştirince güncellemeninin hemen yansıması için
    //   token.email = existingUser.email;// kullanıcı name değiştirince güncellemeninin hemen yansıması için
    //   token.role = existingUser.role;

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
});