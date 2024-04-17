import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt';
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

export async function POST(request: Request) {
  try {
    // Check internet connectivity
    const isConnected = await checkInternetConnectivity();

    if (!isConnected) {
      return NextResponse.json({ error: 'No internet connection' });
    }

    const { fullname, email, password } = await request.json();

    console.log('api/auth/register route: ', { fullname, email, password });

    // Check if the email already exists in the database
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUser.rows.length > 0) {
      // If the email already exists, return an error response
      return NextResponse.json({ error: 'Email already exists' });
    }

    // Hash the password  
    const hashedPassword = await hash(password, 10);

    // Insert the new user if the email is not duplicate
    const response = await sql`
      INSERT INTO users (fullname, email, password)
      VALUES (${fullname}, ${email}, ${hashedPassword});
    `;

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
