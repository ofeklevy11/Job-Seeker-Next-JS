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
import { deleteApplication } from '@/app/actions/action'
  

const DeleteApplication = ({id} : {id:string}) => {
  return (
    <div>
        <AlertDialog >
  <AlertDialogTrigger asChild>
  <Button variant={"destructive"} className=" flex items-center gap-2  font-bold ">
              Delete <Trash2 className=""/>
              </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle className='text-xl'>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription className='text-lg font-semibold text-black text-center'>
        This action will permanently delete the application. <br/> you can not retrive it in the future!
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteApplication(id)}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  )
}

export default DeleteApplication