'use client'

import { useRouter } from 'next/navigation';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface ShowAlertProps {
    label: string
}

export const ShowAlert = ({ label }: ShowAlertProps) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/auth/login');
    };

    return (
        <Alert variant="destructive" className="z-50 absolute top-8 w-[25%] bg-yellow-50">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {label} 
                <button onClick={handleRedirect}> Go to login</button>
            </AlertDescription>
        </Alert>
    )
}
