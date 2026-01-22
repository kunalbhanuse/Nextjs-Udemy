

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/hello")
  const json = await res.json()
  // console.log("json :- ",json)
  const users = json.data
  // console.log("users :-",users)

  
  return (
    <div>
      {users.map( (user) => (
        <div key={user.id} className="mb-2 p-2 border rounded">
          <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>


    // <div>
    //   {users}
    // </div>
  );
}
