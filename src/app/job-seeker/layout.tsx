import CreatorPanel from "@/components/CreatorPanel";
import JobSeekerNav from "@/components/JobSeekerNav";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";



export default async function JobCreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  if(!session) {
    redirect('/login')
  }
  const userId = session.user.id
  const user = await prisma.user.findFirst({
    where:{
      id:userId
    }
  })
  if(!user) {
    redirect('login')
  }
  return (
    <main className=" max-w-[1220px] mx-auto">
        <JobSeekerNav userType={user.type}/>
      {children}
    </main>
  );
}
