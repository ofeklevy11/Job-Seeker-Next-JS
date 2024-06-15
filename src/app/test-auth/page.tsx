import { getSession } from '@/lib/helpers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
    const session = await getSession();

    if (!session) {
      redirect("/login");
    }

  return (
    <div><h1>test</h1>
        {JSON.stringify(session)}
        <p>user id : {session.user.id}</p>
        </div>
  )
}

export default page