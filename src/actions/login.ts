"use server"

import * as z from "zod"
import { AuthError } from "next-auth";
import { getUserByEamil } from "@/data/user";
import { signIn } from "../../auth";
import { LoginSchema } from "@/schemas"


export const login = async (
    values:z.infer<typeof LoginSchema>,
) => {
    
    const validatedFields = LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error : "Invalid fields"};
    }

   const {email,password} = validatedFields.data;

   const existingUser = await getUserByEamil(email);
   
   if(!existingUser || !existingUser.email || !existingUser.password){
        return {error : "Email is not existing"}
   }

   try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: "/"
        })
   } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error : "Invalid Credentials!"}
                default:
                    return { error : "Something went wrong"}
            }
        }
        throw error;
   }
};