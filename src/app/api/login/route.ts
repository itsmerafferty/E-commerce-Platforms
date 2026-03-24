import { NextResponse } from "next/server";
import { getUsers } from "@/lib/db"; // Ensure db.ts exports getUsers

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const users = getUsers(); // Get the array from your JSON file

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ 
      message: "Login successful", 
      user: { name: user.name, email: user.email } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}