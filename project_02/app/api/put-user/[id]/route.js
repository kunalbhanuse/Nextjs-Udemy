import { NextResponse } from 'next/server'
import {users}  from "../../hello/route"


export async function PUT(request,{params}){
    try{
const {id} = await params;
const userId = parseInt(id)

const userIndex = users.findIndex(u => u.id === userId)

if(userIndex === -1){
    return NextResponse.json({
        success: false,
        errro: "User not Found..."},{status:404})
}

const {name,email,active} = await request.json()

users[userIndex]={
    id:userId,
    name:name,
    email:email,
    active:active
}

return NextResponse.json ({
    success:true,
    data:users[userIndex],
    message:"user succefully modified"

})
}catch(error){
    return NextResponse.json({
        success : false,
        error:"failed to update user"
    },{status:404})
}

} 