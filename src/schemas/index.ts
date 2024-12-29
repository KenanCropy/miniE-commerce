import * as z from "zod"


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string({
        message: "Password is required"
    }).min(6,{
        message: "Minumum 6 characters required"
    }),
});


export const RegisterSchema = z.object({
    name: z.string().trim().min(3,{
        message: "Must be longer than 3 characters"
    }),
    email: z.string().trim().email({
        message: "Email is required"
    }),
    password: z.string({
        message: "Password is required"
    }).trim().min(6,{
        message: "Minumum 6 characters required"
    }),
})