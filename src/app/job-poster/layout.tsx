import CreatorPanel from "@/components/CreatorPanel";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";



export default async function JobCreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
 
  
  return (
    <main className="flex">
      <CreatorPanel />
      {children}
    </main>
  );
}
