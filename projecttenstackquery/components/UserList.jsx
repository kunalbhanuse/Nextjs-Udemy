"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function featchUser() {
  const response = await fetch("/api/users");

  return response.json();
}

function UserList() {
  const {
    data: users,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: featchUser,
  });
  if (isLoading) {
    return <div>Loading users, please wait...</div>;
  }

  // --- 3. THE ERROR GUARD COMES HERE ---
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-2 px-3 py-3  ">
      {users.map((user) => (
        <div key={user.id} className="bg-gray-300  rounded-2xl py-2 px-3">
          <h2 className="font-semibold text-black">{user.name}</h2>
          <h3 className="font-semibold text-black">{user.email}</h3>
        </div>
      ))}
    </div>
  );
}

export default UserList;
