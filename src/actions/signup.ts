"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt"
import { getUserByEamil } from "@/data/user";
import { db } from "@/lib/db";

export const signup = async (values:z.infer<typeof RegisterSchema>) => {
    
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success){
        return {error : "Invalid fields"};
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEamil(email);
    
    if(existingUser){
        return {error: "Eamil already in use!"};
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    });


    return {success : "Kullanıcı Başaralı bir şekilde oluşturuldu"};

};