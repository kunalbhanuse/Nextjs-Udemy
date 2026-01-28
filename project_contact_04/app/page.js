import dbConnect from "@/lib/db";
import ContactForm from "../components/ContactForm";
import ContactList from "@/components/ContactList";

export default async function Home() {
  dbConnect();
  return (
    <main className="mai-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Server Action Demo</h1>
          <p className="text-xl text-gray-600 max--2xl mx-auto">
            Contact Form with Mongodb and revalidation
          </p>
        </div>
        <ContactForm />
        {/* <ContactList /> */}
      </div>
    </main>
  );
}
