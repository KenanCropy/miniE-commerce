
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEamil } from "@/data/user";

export default{
    providers: [
        Credentials({
            async authorize(credentials){
                const validateFields = LoginSchema.safeParse(credentials)
                if(validateFields.success){
                    const {email,password} = validateFields.data;

                    const user = await getUserByEamil(email);
                    if(!user || !user.password) return null;

                    const passwordMatch = await compare(
                        password,
                        user.password
                    );

                    if(passwordMatch){
                        return user
                    };
                }

                return null;
            }
        })
    ],
    trustHost: true
} satisfies NextAuthConfig