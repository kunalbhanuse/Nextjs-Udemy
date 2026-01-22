import { NextResponse } from 'next/server'



export const users = [
  { id: 1, name: "Riya",  email: "riya@test.com",  active: true },
  { id: 2, name: "Aman",  email: "aman@test.com",  active: false },
  { id: 3, name: "Neha",  email: "neha@test.com",  active: true },
  { id: 4, name: "Rahul", email: "rahul@test.com", active: true },
  { id: 5, name: "Pooja", email: "pooja@test.com", active: false },
  { id: 6, name: "Kunal", email: "kunal@test.com", active: true }
]

export async function GET(request) {
  try {

   const searchParam = request.nextUrl.searchParams

   const name = searchParam.get("name")
   const active = searchParam.get("active")
  //  console.log("name :-",name)
  //  console.log("active :-",active)

   let filterUsers = users
   if(name){
    filterUsers = filterUsers.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
   }

   


    return NextResponse.json({
      success: true,
      data: filterUsers,
      total: filterUsers.length
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
