import UpdateJob from "@/components/updateJob";
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

  const jobId = params.id;

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (job?.creatorId !== session.user.id) {
    throw new Error("Not authorized to see this job");
  }

  if (!job) {
    throw new Error("Job Not Found");
  }

  return (
      <UpdateJob jobId={jobId} job={job} />
  );
};

export default page;
