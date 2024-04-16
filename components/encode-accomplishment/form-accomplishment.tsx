import React, { useRef, useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import * as z from 'zod';
import { toast } from '../ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AccomplishmentFormSchema } from '@/schemas';
import { Label } from '../ui/label';
import { encodeAccomplishment } from '@/actions/accomplishment/accomplishment';
import { useRouter } from 'next/navigation';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { LoadingSpinner } from '../LoadingSpinner';

interface AccomplishmentFormProps {
    closeDialog: ()=> void;
}

export const AccomplishmentForm = ({closeDialog}:AccomplishmentFormProps) => {
    const session = useSession();
    const [region, setRegion] = useState('');
    const [contractId, setContractId] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [loading, setLoading] = useState(false); // Initialize loading state

    const router = useRouter()


    const form = useForm<z.infer<typeof AccomplishmentFormSchema>>({
        resolver: zodResolver(AccomplishmentFormSchema),
        defaultValues: {
            region: "",
            contractId: "",
            surveyor: session.data?.user?.name || "",
            fileLocation: ""
        }
    })

    const onSubmit = (values: z.infer<typeof AccomplishmentFormSchema>) => {
        setError('');
        setSuccess('');
        setLoading(true); // Set loading state to true
    
        startTransition(() => {
            setLoading(true);
    
            encodeAccomplishment(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
    
                    if (!data.error) {
                        // If there's no error, close the dialog after 2 seconds
                        setTimeout(() => {
                            closeDialog();
                        }, 2000);
                    }else{
                    // set loading to false when the operation errors
                        setLoading(false);

                    }
    
                })
                .catch((error) => {
                    setError('An error occurred while logging in. Error: ' + error);
                    setLoading(false); // Set loading state to false if there's an error
                });
        });
    };
    

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger click event on the file input element
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        console.log("selectedFile: ", selectedFile)
        if (selectedFile) {
            setFile(selectedFile); // Save the File object to state
            form.setValue('fileLocation', selectedFile.name); // Set the file name to the form input value
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <FormField
                    name='region'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Region <FormMessage /></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a region" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Region X">Region X</SelectItem>
                                    <SelectItem value="Region XI">Region XI</SelectItem>
                                    <SelectItem value="Region XIII">Region XIII</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='contractId'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contract ID <FormMessage /> </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder='abc123'
                                    disabled={loading} />
                            </FormControl>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name='fileLocation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>File Location <FormMessage /> </FormLabel>
                            <div className='flex flex-row gap-1'>
                                <FormControl>
                                    <Input
                                        {...field}
                                        readOnly
                                        disabled={loading}
                                    />
                                </FormControl>
                                <Label htmlFor="fileInput">
                                    <Button type='button' onClick={handleBrowseClick} disabled={loading}>...</Button>
                                </Label>

                                <input
                                    id="fileInput"
                                    type="file"
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='surveyor'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Surveyor/Designer <FormMessage /> </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    readOnly
                                    disabled={loading} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormSuccess message={success}/>
                <FormError message={error}/>
                <div className='flex flex-row justify-between'>
                    <Button type="button" variant="outline" onClick={closeDialog} disabled={loading}>Cancel</Button>
                    <div className='flex flex-row gap-1 items-center'>
                    {loading && <LoadingSpinner/>}
                    <Button type="submit" disabled={loading}>Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

