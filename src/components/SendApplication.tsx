"use client";
import React, { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Plus, Send, Trash2 } from "lucide-react";
import { deleteJob, sendApplication } from "@/app/actions/action";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import type { JobApplication } from "@prisma/client";


const SendApplication = ({
 
  jobId,
  userId,
  email,
  Name,
  isUserApplied
  
}: {
  
  jobId: string;
  userId: string;
  email:string;
  Name:string;
  isUserApplied: boolean

}) => {
  const [remarks,setRemarks] = useState('Your remarks')
  const [phoneNumber,setPhoneNumber] = useState('your phone number')

  
  
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-500/65" disabled={isUserApplied}>
            Send Application <Plus />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Send application 
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg font-semibold text-black text-center flex flex-col gap-4">
              <div className="flex flex-col gap-2">
              <Label htmlFor="remarks" className="text-white text-lg">Add remarks</Label>
              <Textarea id="remarks" required className="text-white" rows={5} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Add some remarks"/>
              </div>
              <div className="flex flex-col gap-2">

              <Label htmlFor="phoneNumber" className="text-white text-lg">Add Phone number</Label>
              <Input id="phoneNumber" required className="text-white"  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="000-0000-000"/>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="flex gap-2 items-center bg-green-500" onClick={() => sendApplication(userId,jobId,remarks,email,phoneNumber,Name)}>
              Send <Send/>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SendApplication;
