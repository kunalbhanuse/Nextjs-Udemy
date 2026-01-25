import NoteClient from "@/components/NoteClient";
import dbConnect from "@/lib/db";
import Image from "next/image";
import Note from "@/models/Note";


async function getNotes (){
   await dbConnect()
const notes = await Note.find({}).sort({createdAt: -1}).lean()

// causing Error Only plain object can be passsed to clien components
// return notes.map((note)=> (
//   {
//     ...note,
//     id:note._id.toString()
//   }))
// }

return notes.map(note => ({
    _id: note._id.toString(),           
    title: note.title,
    content: note.content,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }))
}





export default async function Home() {
const notes = await getNotes()
console.log(notes);

  return (
    <div className="container mx=auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notes App</h1>
      <NoteClient initialNote={notes}/>
     
    </div>
  );
}
