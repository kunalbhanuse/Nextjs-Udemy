import { getContact, updateContact } from "@/actions";
import React from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

async function ContactList() {
  const contacts = await getContact();
  //   console.log(contacts);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className=" text-2xl font-bold"> Contact Message</h2>
        <Badge variant="secondary">{contacts.length} Message</Badge>
      </div>
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-4">
            <Mail className="h-12 w-12 text-shadow-muted-foreground mb-4" />
            <h3 className="text-ls font-semibold mb-2 ">No Message Yet</h3>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact._id}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{contact.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      from : {contact.name} ({contact.email})
                    </p>
                  </div>
                  <Badge
                    variant={contact.status === "new" ? "default" : "secondary"}
                  >
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 ">
                  {contact.message}
                </p>
                <div className="flex items-center justify-between pt-4 border-t-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    {contact.status === "new" && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact._id, "read");
                        }}
                      >
                        <Button variant="outline" size="sm" type="submit">
                          Mark as Read
                        </Button>
                      </form>
                    )}
                    {contact.status === "read" && (
                      <form
                        action={async () => {
                          "use server";
                          await updateContact(contact._id, "replied");
                        }}
                      >
                        <Button variant="outline" size="sm" type="submit">
                          {" "}
                          Mark as Replied
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;
