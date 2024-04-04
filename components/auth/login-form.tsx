'use client'
import { CardWrapper } from "./card-warpper"
import { useState, useTransition } from "react";
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";


export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
        setError("")
        setSuccess("")
        startTransition(()=>{
            login(values)
            .then((data)=>{
                setError(data.error)
                setSuccess(data.success)
            });
        })

        //Pwde axios diri
        //axios.post("/your/api/router", values).then .get etc
    }
    
    return (
        <div className=" w-96">
       <CardWrapper
            headerLabel="This is for UBI Survey Department only!"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
             
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="nidoramas@example.com"
                                disabled={isPending}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="password"
                    render={({field})=> (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                placeholder="******"
                                type="password"
                                disabled={isPending}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                </div>
                <FormSuccess message={success}/>
                <FormError message={error}/>
                <Button
                    typeof="submit"
                    className="w-full"
                    disabled={isPending}
                >
                    Login
                </Button>
            </form>
          </Form>
        </CardWrapper>
        </div>
 
    )
}