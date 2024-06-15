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
  if (session.user.type !== "jobPoster") {
    redirect("/");
  }
  const userId = session.user.id;
 

  const jobs = await prisma.job.findMany({
    where: {
        creatorId: userId
    },
    include: {
        applications:true
    }
  })
 
  
  
  

  
  return (
    <main className="max-w-[1100px] mx-auto ">

        <PageTitle title='All Applications'/>
    <div className='grid grid-cols-3 grid-rows-3 mt-8 gap-4'>
        {jobs.map((job) => (
        <div key={job.id} className='border rounded-lg p-6 flex flex-col gap-4'>
          <div>Job: {job.name}</div>
          {job.applications.length > 0 ? (
            job.applications.map(({appliedAt,email,name,phoneNumber,remarks,id}) => (
              <div key={id} className='flex flex-col gap-4'>
                <p>Applicant Email: {email}</p>
                <p>Applicant Name: {name}</p>
                <p>Applicant Phone Number: {phoneNumber !== 'your phone number' ? phoneNumber : 'Applicant did not left a phone number.'}</p>
                <p>Applied At: {` ${appliedAt?.toLocaleDateString()} ${appliedAt?.toLocaleTimeString()}`}</p>
                <p>Applicator remarks: {remarks !== 'Your remarks' ? remarks : 'Applicant did not left any remarks.' }</p>
              </div>
            ))
          ) : (
            <p>No applications yet.</p>
          )}
        </div>
      ))}
    </div>
    </main>
  )
}

export default page