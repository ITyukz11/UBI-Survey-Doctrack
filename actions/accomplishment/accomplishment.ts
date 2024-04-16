import * as z from "zod";
import { AccomplishmentFormSchema } from "@/schemas";
import axios, { AxiosError } from "axios";

interface AccomplishmentResponse {
    success?: string;
    error?: string;
}

export const encodeAccomplishment = async (values: z.infer<typeof AccomplishmentFormSchema>): Promise<AccomplishmentResponse> => {
    const validatedFields = AccomplishmentFormSchema.safeParse(values);

    try {
        if (!validatedFields.success) {
            return { error: "Invalid fields!" };
        } else {
            const response = await axios.post('/api/documents', {
                region: values.region,
                contract_id: values.contractId,
                file_location: values.fileLocation,
                designer: values.surveyor
            });
            console.log('Response from encodeAccomplishment:', response.data);
            // Check if the response contains an error message
            if (response.data.error) {
                // If there's an error message, return it
                return { error: response.data.error };
            } else {
                // If no error message, assume successful registration
                return { success: response.data.success };
            }
        }
    }
    catch (error) {
        // Handle any errors from the API
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const responseData = axiosError.response.data;
                if (responseData && typeof responseData === 'object' && 'message' in responseData && typeof responseData.message === 'string') {
                    return { error: responseData.message };
                }
            }
            return { error: "An error occurred while encoding accomplishment." + axiosError };
        } else {
            return { error: "An error occurred while encoding accomplishment." + error };
        }
    }
};
