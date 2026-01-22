import { NextResponse } from "next/server"; // Use 'import' in Next.js
// Assuming 'users' is defined outside this function or imported
import {users} from "../hello/route"
import { error } from "console";

export async function POST(request) {
  try {
    const { name, email, active } = await request.json();

    // 1. Validation (Check if data is missing)
    if (!name || !email || !active) {
      return NextResponse.json(
        { success: false, error: "Name, email, and age are required" },
        { status: 400 }
      );
    }

    const emailExists = users.find((user) => user.email === email)
    if(emailExists){
        return NextResponse.json({
            success:false,
            error:"email exists"
        })
    }


    // 2. Create the new user object
    const newUser = {
      id: users.length + 1, 
      name: name,
      email: email,
      active:active !== undefined ? active : true
    };

    // 3. Add to the list
    users.push(newUser);

    // 4. Send success response
    return NextResponse.json(
      {
        success: true,
        data: users,
        message: "User Created!",
      },
      { status: 201 }
    );

  } catch (err) {
    // 3. FIX: Send a simple string message instead of the raw error object
    console.error("API Error:", err); // This prints the error in your terminal
    return NextResponse.json(
      { success: false, error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}