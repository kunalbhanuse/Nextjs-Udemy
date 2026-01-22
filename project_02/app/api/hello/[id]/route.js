import { NextResponse } from 'next/server'

import {users}  from "../route"
import { error } from 'console'

export async function GET(request,{params}) {

    const {id} = await params
    const userId = parseInt(id)

    const user = users.find((u)=> u.id === userId)

  try {
    if (!user) {
      // ✅ CORRECT: Wrap in NextResponse.json
      return NextResponse.json(
        { success: false, error: "User does not exist" },
        { status: 404 })}
    
    return NextResponse.json({
      success: true,
      data: user,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "failed to load the data"
      },
      { status: 500 }
    )
  }
}
