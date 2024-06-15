'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { deleteJob } from '@/app/actions/action'
  

const DeleteJobDialog = ({dialogTitle,dialogContent,jobId} : {dialogTitle:string,dialogContent:string,jobId:string}) => {
  return (
    <div>
        <AlertDialog >
  <AlertDialogTrigger asChild>
  <Button variant={"destructive"} className=" flex items-center gap-2  font-bold">
              Delete <Trash2 className=""/>
              </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className='text-xl'>{dialogTitle}</AlertDialogTitle>
      <AlertDialogDescription className='text-lg font-semibold text-black text-center'>
        {dialogContent}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteJob(jobId)}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default DeleteJobDialog