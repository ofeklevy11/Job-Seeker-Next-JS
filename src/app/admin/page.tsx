import JobSeekerNav from '@/components/JobSeekerNav';
import PageTitle from '@/components/PageTitle';
import { Label } from '@/components/ui/label';
import prisma from '@/lib/db';
import { getSession } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const session = await getSession();

  const userId = session.user.id;

  const isAdmin = userId === process.env.ADMIN_USER_ID!
  if (!isAdmin) {
    redirect("/");

  }

  const user = await prisma.user.findFirst({
    where:{
      id:userId
    }
  })


  const contacts = await prisma.contact.findMany()

  if(!user){
    return
  }
  
  return (
    <div className='max-w-[1220px] mx-auto py-16'>
              <JobSeekerNav userType={user.type}/>

      <PageTitle title='Admin Panel' className='text-4xl'/>
      <div className='border rounded-lg p-12 my-24 '>
      <PageTitle title='New Contacts' className='mt-0 mb-8 '/>
      <div className='grid grid-cols-2 gap-8'>
        {contacts.map(({email,id,message,name,phoneNumber})=> (
          <div key={id} className='text-center border rounded-lg p-6'>
            <Label>Contact Name</Label>
            <p className='mb-6'>{name}</p>
            <Label>Contact Email</Label>
            <p className='mb-6'>{email}</p>
            <Label>Contact phone Number</Label>
            <p className='mb-6'>{phoneNumber}</p>
            <Label>Contact Message</Label>
            <p className='mb-6'>{message}</p>
          </div>
        ))}
      </div>
      </div>

    </div>
  )
}

export default page