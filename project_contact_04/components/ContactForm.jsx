"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { createContact } from "@/actions/index.js";
import { useRouter } from "next/navigation";

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function onSubmit(formData) {
    setIsSubmitting(true);
    setMessage("");

    const result = await createContact(formData);
    console.log(result);

    if (result.success) {
      const form = document.getElementById("contact-form");
      form.reset();
      router.push("/contact");
    } else {
      setMessage(result.error || "something went wrong");
    }
    setIsSubmitting(false);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conta us</CardTitle>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`mb-6 p-4 rounded ${message.includes("success") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            {message}
          </div>
        )}

        <form id="contact-form" action={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              required
              disabled={isSubmitting}
              className="min-h-[120px]"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;
