'use client'
import { useSession } from '@/hooks/useSession';
import { redirect } from 'next/navigation';
import React from 'react'

const page = () => {
    const session = useSession()
        
    if (!session) {
      redirect("/login");
    }
    

  return (
    <div><h1>test</h1>
        {session}
        </div>
  )
}

export default page