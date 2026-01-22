import { NextResponse } from 'next/server'
import {users}  from "../../hello/route"

export async function PATCH(request,{params}){
    try{
    const {id} = await params
    const userID = parseInt(id)

    const userIndex = users.findIndex(u => u.id === userID)

    if(userIndex === -1){
        return NextResponse.json({
            success : false,
            error: "faild to locate user"
        },{status:404})
    }

    const body = await request.json()
    
    users[userIndex] ={
        ...users[userIndex],
        ...body,
        id:userIndex
    }

    return NextResponse.json({
        success:true,
        data: users[userIndex],
        message:"User Patch succesful",

    })
} catch(error){
    return NextResponse.json({
        success:false,
        error:"faild to Patch Data"
    },{status:500})
}

}