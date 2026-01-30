import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";

export default async function Home() {
  await connectDB();

  return <Button>Welcome to TodoApp</Button>;
}
