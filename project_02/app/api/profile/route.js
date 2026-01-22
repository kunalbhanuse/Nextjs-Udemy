import { response } from "express";
import { headers } from "next/headers";
import { NextResponse } from "next/server";



export async function GET(request){
    const requestHeader = await headers()
const headerResponse =  requestHeader.get("Authorization")

console.log(headerResponse)



   const  response = NextResponse.json({
        success:true,
        data:"hello world form profile"
        
    })

    response.headers.set("X-powerd","katappa....")

    return response

    
}