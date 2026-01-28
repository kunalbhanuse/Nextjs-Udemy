"use server";
import Contact from "@/models/Contact";
import dbConnect from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createContact(formData) {
  try {
    await dbConnect();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return {
        success: "false",
        error: "All field are required",
      };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return {
      success: true,
      message: "Contact Created Succefully",
      //   data: contact,
      contactId: contact._id.toString(),
    };
  } catch (error) {
    console.error("Error Creating Contact", error);
    return {
      success: false,
      error: "Something went wrong plese try again",
    };
  }
}

export async function getContact() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));
  } catch (error) {
    console.error("Error,fetching contact :", error);
    return [];
  }
}

export async function updateContact(contactID, status) {
  console.log(status);

  try {
    await dbConnect();
    await Contact.findByIdAndUpdate(contactID, { status });
    revalidatePath("/contacts");

    return { success: true };
  } catch (error) {
    console.error("Error updating contact status :", error);
    return { success: false, error: "failed to update status" };
  }
}
