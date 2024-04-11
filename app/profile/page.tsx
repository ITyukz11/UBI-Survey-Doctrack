    'use client'
    import React, { startTransition, useState } from 'react'
    import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { useSession } from 'next-auth/react';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { ProfileSchema } from '@/schemas';
    import * as z from 'zod';

    interface ProfileProps {}

    const Profile = (props: ProfileProps) => {
        const session = useSession();
        const [loading, setLoading] = useState(false); // Initialize loading state
        const [error, setError] = useState<string | undefined>("");
        const [success, setSuccess] = useState<string | undefined>("");

        const form = useForm<z.infer<typeof ProfileSchema>>({
            resolver: zodResolver(ProfileSchema),
            defaultValues: {
                fullname:session.data?.user?.name || '',
                email:session.data?.user?.email || '',
                password: '',
                passwordConfirmation:'',
            }
        })  

        const onSubmit = (values: z.infer<typeof ProfileSchema>) => {

            setError('');
            setSuccess('');
            setLoading(true); // Set loading state to true

            startTransition(() => {
                setLoading(true)

                // login(values)
                //     .then((data) => {
                //         setError(data.error);
                //         setSuccess(data.success);
                //         setLoading(false); // Set loading state to false when login request completes

                //         if (!data.error) {
                //             router.push('/'); // Redirect to '/' if there's no error (login is successful)
                //         }

                //     })
                //     .catch((error) => {
                //         setError('An error occurred while logging in. Error: ' + error);
                //         setLoading(false); // Set loading state to false if there's an error
                //     });
            });
        }

    return (
        <div className='flex justify-center mx-5 lg:mx-24'>
            <Form {...form}>
                <form
                    autoComplete='off'
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 bg-white rounded-xl p-8 w-96 shadow-xl "
                >
                    <FormLabel className='flex justify-center text-xl w-full'>Profile  </FormLabel>
                    <FormField
                        name='fullname'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fullname  </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}                                    
                                        disabled={loading}
                                        name={`fullname-${Math.random().toString(36).substring(7)}`} // Random to avoid autofill attribute
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='email'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="false"
                                        {...field}
                                        disabled={loading} 
                                        name={`email-${Math.random().toString(36).substring(7)}`} // Random to avoid autofill attribute
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                        <FormField
                        name='password'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete='new-password' 
                                        {...field}
                                        type='password'
                                        disabled={loading} 
                                        name={`password-${Math.random().toString(36).substring(7)}`} // Random to avoid autofill attribute
                                        />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='passwordConfirmation'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password  </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type='password'
                                        autoComplete='new-password'
                                        name={`passwordConfirmation-${Math.random().toString(36).substring(7)}`} // Random to avoid autofill attribute
                                        disabled={loading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className='w-full' type="submit" disabled={loading}>Update</Button>
                </form>
            </Form>
        </div>
    )
    }

    export default Profile