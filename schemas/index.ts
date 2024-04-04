import * as z from "zod";
 
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password:z.string().min(1, {
        message:"Password is required"
    })
})

export const RegisterSchema = z.object({
    fullname: z.string().min(1, {
        message: "Fullname is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password:z.string().min(6, {
        message:"Minimum 6 characters required"
    }),
    key:z.string().min(6, {
        message:"Ask your administrator for the key!"
    }),
 
})