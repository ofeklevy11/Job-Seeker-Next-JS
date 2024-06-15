import DeleteJobDialog from "@/components/DeleteJob";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { Pen, PenLine, ScrollText, Trash2 } from "lucide-react";
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
    <main className="max-w-[1100px] mx-auto">
      <PageTitle title="My Jobs" />
      <div className="flex flex-col  mt-8 w-[800px] items-center  ">
        {jobsAuthor?.createdJobs.map(
          ({
            id,
            company,
            name,
            description,
            location,
            type,
            salary,
            experience,
            requirements,
            remarks,
            createdAt,
            updatedAt,
          }) => (
            <div
              key={id}
              className="border rounded-lg p-12 flex flex-col gap-5 mb-24  "
            >
              <div className="flex justify-around">
                <div className="border rounded-lg p-5 flex flex-col gap-1 ">
                  <Label className="text-lg">Company name</Label>

                  <p>{company}</p>
                </div>
                <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                  <Label className="text-lg">Job name</Label>

                  <p>{name}</p>
                </div>
                <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                  <Label className="text-lg"> Location</Label>

                  <p>{location}</p>
                </div>
              </div>
              <div className="border rounded-lg p-5 flex flex-col gap-1   ">
                <Label className="text-lg"> Job description</Label>

                <p>{description}</p>
              </div>
              <div className="flex justify-around">
                <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                  <Label className="text-lg"> Job type</Label>

                  <p>{type}</p>
                </div>
                <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                  <Label className="text-lg">Monthly salary</Label>

                  <p>{salary}</p>
                </div>
                <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                  <Label className="text-lg">Experience</Label>
                  <p>{experience}</p>
                </div>
              </div>

              <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                <Label className="text-lg">Requirements</Label>

                <p>{requirements}</p>
              </div>
              <div className="border rounded-lg p-5 flex flex-col gap-1  ">
                <Label className="text-lg">Remarks</Label>

                <p>{remarks}</p>
              </div>
              <p className="text-center pt-5 mt-5 text-lg">
                Posting Date: {createdAt.toLocaleDateString()}
              </p>
              <p className="text-center text-gray-500 ">
                Latest Update Date: {updatedAt.toLocaleDateString()}{" "}
                {updatedAt.toLocaleTimeString()}
              </p>
              <div className="flex gap-6 justify-center">
                <Link href={`/job-poster/my-jobs/${id}`}>
                  <Button className=" flex items-center gap-2  font-bold">
                    Edit <Pen />
                  </Button>
                </Link>
                <Link href={`/job-poster/my-jobs/applications/${id}`}>
                  <Button className=" flex items-center gap-2  font-bold">
                    Show Applications <ScrollText />
                  </Button>
                </Link>
                <DeleteJobDialog
                  jobId={id}
                  dialogTitle="Are you sure?"
                  dialogContent="This action will permanently delete the job. take caution."
                />
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default page;
