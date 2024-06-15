import FilterBar from "@/components/FilterBar";
import PageTitle from "@/components/PageTitle";
import PaginationControls from "@/components/PaginationControls";
import SendApplication from "@/components/SendApplication";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type SearchParams = {
  page?: string;
  per_page?: string;
  jobType?: string;
  experience?: string;
  search?: string;
  location?: string;
  lessThan?: number;
  greaterThan?: number;
};

interface Props {
  searchParams: SearchParams;
}

const page = async ({ searchParams }: Props) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      applications: true,
    },
  });

  if (!user) {
    throw new Error('User Not Found')
  }

  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? "5";
  let jobType = searchParams.jobType ?? "";
  let experience = searchParams.experience ?? "";
  const search = searchParams.search ?? "";
  const location = searchParams.location ?? "";
  const lessThan = searchParams.lessThan ?? 100000;
  const greaterThan = searchParams.greaterThan ?? 0;

  if (jobType === "all") {
    jobType = "";
  }
  if (experience === "all") {
    experience = "";
  }

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  // const cvLink = user?.cvLink
  const jobs = await prisma.job.findMany({
    where: {
      name: {
        contains: search,
      },
      location: {
        contains: location,
      },
      type: {
        contains: jobType,
      },
      salary: {
        gt: Number(greaterThan),
        lt: Number(lessThan),
      },
      experience: {
        contains: experience,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const entries = jobs.slice(start, end);

  return (
    <div className="flex flex-col  items-center ">
      <PageTitle title="Find Job " className="-mt-4 " />
      <FilterBar />

      {entries.map(
        ({
          company,
          createdAt,
          creatorId,
          experience,
          id,
          name,
          remarks,
          requirements,
          salary,
          location,
          type,
          description,
        }) => {
          const application = user.applications.find(
            (application) => application.jobId === id
          );

          const isUserApplied = !!application; // Check if application exists
          const whenUserApplied = application
            ? new Date(application.appliedAt)
            : null;

          return (
            <div
              key={id}
              className="w-[950px] border p-10 flex flex-col gap-5 rounded-xl  mt-12 "
            >
              <header className="flex justify-between items-center">
                {name}{" "}
                <div className="flex flex-col gap-1">
                  <SendApplication
                    jobId={id}
                    userId={userId}
                    email={user.email}
                    Name={user.name}
                    isUserApplied={isUserApplied}
                  />
                  {isUserApplied && (
                    <p>
                      You have already <br /> applied to this job.
                    </p>
                  )}
                </div>
              </header>
              <div className="grid grid-cols-3 gap-3 items-center justify-between ">
                <p className="font-semibold">
                  Company:<span className="font-normal"> {company}</span>
                </p>
                <p className="font-semibold">
                  Location: <span className="font-normal"> {location}</span>
                </p>
                <p className="font-semibold">
                  Experience:{" "}
                  <span className="font-normal">
                    {" "}
                    {experience} Years of experience
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 items-center justify-between ">
                <p className="font-semibold">
                  Monthly Salary:<span className="font-normal"> {salary}</span>
                </p>
                <p className="font-semibold">
                  Job Type: <span className="font-normal"> {type}</span>
                </p>
                <p className="text-zinc-400">
                  {" "}
                  Posted Date: {createdAt.toLocaleDateString()}{" "}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Job Description</h3>
                <p>{description}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Job Requirements</h3>
                <p>{requirements}</p>
              </div>
              <div className="flex flex-col gap-3 ">
                <h3 className="text-xl font-semibold">Remarks</h3>
                <p>{remarks}</p>
              </div>
              {isUserApplied && (
                <div className="border rounded-lg p-2 bg-green-500/60">
                  <p className="text-lg font-semibold text-center">
                    {" "}
                    {`Applied to this job on: ${whenUserApplied?.toLocaleDateString()} ${whenUserApplied?.toLocaleTimeString()}`}
                  </p>
                </div>
              )}
            </div>
          );
        }
      )}
      <PaginationControls
        hasNextPage={end < jobs.length}
        hasPrevPage={start > 0}
        jobLength={jobs.length}
      />
    </div>
  );
};

export default page;
