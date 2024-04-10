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

export const AccomplishmentFormSchema = z.object({
    region: z.string().min(1, { message: "Please select a region *" }),
    contractId: z.string().min(1, { message: "Contract ID is required *" }),
    surveyor: z.string().min(1,{message: "Surveyor/Designer is required *"}),
    fileLocation: z.string().min(1,{message: "File Location is required *"})
});
