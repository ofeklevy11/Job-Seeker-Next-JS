import { submitContact } from '@/app/actions/action'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getSession } from '@/lib/helpers'
import { SendHorizonal } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  return (
    <div>
        <div className=" max-w-[1220px] mx-auto">
        <div className="grid grid-cols-2 py-12">
          <div className="text-center flex flex-col gap-10 ">
            <PageTitle
              title="Contact us"
              className="text-4xl"
            />
            <h4 className="text-xl">
              Feel free to contact us at any moment! <br /> We are here for you.
            </h4>
            <p className='text-lg'>Our phone number: 050-2611-930</p>
            <p className='text-lg'>Our Email: jobseeker@support.mail</p>
            <p className='text-lg'>Our Adress: Niv David 4, Beer-Sheva.</p>
           
          </div>
          <div>
              <PageTitle title='Send us message'/>
          <div className='text-center flex flex-col gap-1 mt-12 border rounded-lg p-8'>
            <form action={submitContact} className='flex flex-col gap-3'>
              
                <Label className=''>Your Name</Label>
                <Input name='name' required placeholder='Ofek Levy'/>

                <Label className=''>Phone Number</Label>

              <Input name='phone' required placeholder='0502611930'/>
              <Label className=''>Your Email</Label>

              <Input name='email' required placeholder='ofek@gmail.com'/>
              <Label className=''>Your Message</Label>

              <Textarea name='message' required rows={8} placeholder='Enter Your Message...'/>
              <Button className='flex gap-2 mt-5 items-center mx-auto font-semibold bg-green-500 hover:bg-green-500/65'>Submit <SendHorizonal/></Button>
            </form>
          </div>
          </div>
    </div>
    </div>
    </div>
  )
}

export default page