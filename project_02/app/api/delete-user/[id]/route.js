import { NextResponse } from 'next/server'
import {users}  from "../../hello/route"


export async function DELETE(request,{params}){
    try {
        const {id} = await params
        const userId = parseInt(id)

        const userIndex = users.findIndex(u => u.id === userId)

        if(userIndex === -1){
            return NextResponse.json({
            success:false,
            error:"user did not located"},{status:404})
        }

        const deleteUser = users[userIndex]
        users.splice(userIndex,1);


        return NextResponse.json({
            sussess:true,
            data:deleteUser,
            message:"user deleted"
        })
        
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            error:"Could not delete user"
        })
        
    }

}