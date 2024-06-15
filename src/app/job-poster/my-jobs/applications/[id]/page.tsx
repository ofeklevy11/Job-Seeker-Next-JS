import DeleteApplication from "@/components/DeleteApplication";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();

  if (!session) {

    redirect("/login");
  }
  if (session.user.type !== "jobPoster") {
    redirect("/");
  }

  const applications = await prisma.jobApplication.findMany({
    where: {
      jobId: params.id,
    },
  });

  const job = await prisma.job.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!job) {
    throw new Error("no job found");
  }

  return (
    <main className="max-w-[1100px] mx-auto ">

    <div className="flex flex-col items-center">
      <PageTitle title={`Applications for ${job.name} ${job.company}`} className="mb-8" />
      <main className="grid grid-cols-3 gap-8">
        {applications.map(({ email, name, phoneNumber, remarks, id }) => (
          <div key={id} className="flex flex-col gap-1 border rounded-lg p-5 max-w-[380px]">
            <p className="font-semibold text-lg" >
              {" "}
              Applicator Name: <span className="font-normal text-lg">{name}</span>
            </p>
            <p className="font-semibold text-lg" >
              {" "}
              Applicator Email: <span className="font-normal text-lg">{email}</span>
            </p>
            <p className="font-semibold text-lg" >
              {" "}
              Applicator Phone Number:{" "}
              <span className="font-normal text-lg">
                {phoneNumber !== "your phone number"
                  ? phoneNumber
                  : "Applicator did not add phone number."}
              </span>
            </p>
            <p className="font-semibold text-lg" >
              Applicator Remarks:
              {" "}
              <span className="font-normal text-lg">
                {remarks !== "Your remarks"
                  ? remarks
                  : "Applicator did not add remarks."}
              </span>
            </p>
            <div className="flex justify-center mt-4"><DeleteApplication id={id} /></div>
            
          </div>
        ))}
      </main>
    </div>
    </main>
  );
};

export default page;
