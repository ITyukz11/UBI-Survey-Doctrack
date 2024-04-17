import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import fetch from 'node-fetch'; // Import fetch for making HTTP requests

// Function to check internet connectivity
async function checkInternetConnectivity() {
  try {
    const response = await fetch('https://dns.google/resolve?name=example.com&type=A');
    return response.ok;
  } catch (error) {
    return false;
  }
}
export const login = async (values: z.infer<typeof LoginSchema>) => {
  try {
       // Check internet connectivity
       const isConnected = await checkInternetConnectivity();

       if (!isConnected) {
        return { error: 'No internet connection' };
       }
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log("RESULT: ", result);

    if (result && result.error) {
      return { error: "Invalid Credentials!" };
    }

    return { success: "Success!" };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
