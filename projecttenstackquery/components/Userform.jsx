"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

async function addUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
}

function Userform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: addUser,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      mutation.mutate({ name, email });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add User (mutation example)</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button>{mutation.isPending ? "Adding..." : "Add User"}</Button>
          {mutation.error && (
            <div className="text-red-500 text-sm">
              {" "}
              error:{mutation.error.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

export default Userform;
