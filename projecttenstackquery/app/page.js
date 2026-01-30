import Userform from "@/components/Userform";
import UserList from "@/components/UserList";

export default function Home() {
  return (
    <div className=" container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl text-center mb-8 font-bold">Tenstack Query</h1>
      <div>
        <div className=" rounded-3xl grid gap-4 ">
          <UserList />
          <Userform />
        </div>
      </div>
    </div>
  );
}
