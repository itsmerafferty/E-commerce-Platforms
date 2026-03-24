import { NextResponse } from "next/server";
import { getUsers, saveUser } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const users = getUsers();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    saveUser(newUser);

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}