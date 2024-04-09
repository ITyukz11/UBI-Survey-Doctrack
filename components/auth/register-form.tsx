'use client'
import { CardWrapper } from "./card-warpper"
import { useState, useTransition } from "react";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import axios from "axios";
import { useRouter } from "next/navigation";


export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false); // Initialize loading state

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const router = useRouter(); // Initialize useRouter

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            fullname: "",
            key:""
        }
    })

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        if(values.key=="123456"){
            setError("")
            setSuccess("")
            startTransition(() => {
                setLoading(true)
                register(values)
                    .then((data) => {
                        setError(data.error)
                        setSuccess(data.success)
    
                        setTimeout(() => {
                            if (!data.error) {
                              router.push('/auth/login'); 
                            }
                            setLoading(false)
                          }, 2000); // Delay for 2 seconds                      
                    });
            })
        }else{
            setError('Invalid key!')
        }
    }

    return (
        <div className=" w-96">
            <CardWrapper
                headerLabel="Create an account"
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/login"
                loading={loading}
                showSocial>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                        <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fullname</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Sam M. Montaner"
                                                disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="nidoramas@example.com"
                                                disabled={loading}
                                                autoComplete="off" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                <FormField
                                control={form.control}
                                name="key"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Authorization Key</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                                disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                        <Button
                            typeof="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            Create an account
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>

    )
}