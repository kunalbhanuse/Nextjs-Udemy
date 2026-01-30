import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "kunal", email: "kunal@gmail.com" },
  { id: 2, name: "ashish", email: "ashish@gmail.com" },
  { id: 3, name: "prashant", email: "prashat@gmail.com" },
  { id: 4, name: "rajesh", email: "prashat@gmail.com" },
  { id: 5, name: "ram", email: "prashat@gmail.com" },
  { id: 6, name: "krishna", email: "prashat@gmail.com" },
  { id: 7, name: "hari", email: "prashat@gmail.com" },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();
  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email,
  };

  users.push(newUser);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(newUser);
}
