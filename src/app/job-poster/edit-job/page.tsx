import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { Pen, PenLine } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  if (session.user.type !== "jobPoster") {
    redirect("/");
  }

  const jobsAuthor = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      createdJobs: true,
    },
  });


  return (
    <main className="max-w-[1100px] mx-auto ">
      <PageTitle title="Edit Jobs" />
      <div className="flex gap-8  flex-wrap  mt-20 w-full items-center  ">
        {jobsAuthor?.createdJobs.map(
          ({
            id,
            company,
            name,
            
            createdAt,
            updatedAt
          }) => (
            <div key={id} className="border rounded-lg p-5 flex flex-col gap-4 mb-8  ">
              <div className="border rounded-lg p-5 flex flex-col gap-1 ">
                <Label className="text-lg">Company name</Label>

                <p>{company}</p>
              </div>
              <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                <Label className="text-lg">Job name</Label>

                <p>{name}</p>
              </div>
             
              <p className="text-center pt-5 mt-5 text-lg">
                Posting Date: {createdAt.toLocaleDateString()}
              </p>
              <p className="text-center text-gray-500 max-w-[300px] ">
                Latest Update Date: {updatedAt.toLocaleDateString()} {updatedAt.toLocaleTimeString()}
              </p>
              <Link href={`/job-poster/my-jobs/${id}`} >
              <Button className="w-24 flex items-center gap-2 mx-auto font-bold">
              Edit <Pen/>
              </Button>
              </Link>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default page;
