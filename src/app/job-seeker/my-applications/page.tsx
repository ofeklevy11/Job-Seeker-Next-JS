import PageTitle from '@/components/PageTitle';
import prisma from '@/lib/db';
import { getSession } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const applications = await prisma.jobApplication.findMany({
    where:{
      userId
    },
    include: {
      job:true
    }
  })
  console.log(applications);
  
  return (
    <div>
      <PageTitle title='My Applications' />
      <div className='flex flex-col items-center mt-8 '>
        {applications.map(({appliedAt,job,remarks,id,phoneNumber})=> (
            
            <div key={id} className="w-[950px] border p-10 flex flex-col gap-5 rounded-xl mb-12  ">
              <header className="flex justify-between items-center">
                Job Name: {job.name}{" "}
              
              </header>
              <div className="grid grid-cols-3 gap-3 items-center justify-between ">
                <p className="font-semibold">
                  Company:<span className="font-normal"> {job.company}</span>
                </p>
                <p className="font-semibold">
                  Location: <span className="font-normal"> {job.location}</span>
                </p>
                <p className="font-semibold">
                  Experience:{" "}
                  <span className="font-normal">
                    {" "}
                    {job.experience} Years of experience
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 items-center justify-between ">
                <p className="font-semibold">
                  Monthly Salary:<span className="font-normal"> {job.salary}</span>
                </p>
                <p className="font-semibold">
                  Job Type: <span className="font-normal"> {job.type}</span>
                </p>
                <p className="text-zinc-400">
                  {" "}
                  Posted Date: {job.createdAt.toLocaleDateString()}{" "}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Job Description</h3>
                <p>{job.description}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Job Requirements</h3>
                <p>{job.requirements}</p>
              </div>
              <div className="flex flex-col gap-3 ">
                <h3 className="text-xl font-semibold">Remarks</h3>
                <p>{job.remarks}</p>
              </div>
              <div className='grid grid-cols-2'>
                <p className='text-lg'>The remarks i have left: <span className='text-base font-semibold'>{remarks !== 'Your remarks' ? remarks : 'You didnt left any remarks.'}</span></p>
                <p className='text-lg'>The Phone number i have left: <span className='text-base font-semibold'>{phoneNumber !== 'your phone number' ? phoneNumber : 'You didnt left a phone number. '}</span></p>
              </div>
               <div className="border rounded-lg p-2 bg-green-500/60"><p className="text-lg font-semibold text-center"> {`Applied to this job on: ${appliedAt?.toLocaleDateString()} ${appliedAt?.toLocaleTimeString()}`}</p></div>
            </div>
          
        ))}
      </div>
    </div>
  )
}

export default page