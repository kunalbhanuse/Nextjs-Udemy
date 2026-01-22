import { cookies } from "next/headers"
import { NextResponse } from "next/server"


export async function GET(request){
    // const theme = request.cookies.get("theme")

const cookiesStore = await cookies()
// const result = cookiesStore.get("pagePerSlide")
    // console.log("Cookies",result)

    cookiesStore.set("score","40")

    return NextResponse.json({
        message:"Cookies Set"
    })

        
}