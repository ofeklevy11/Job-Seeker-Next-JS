'use client'
import type { Job } from "@prisma/client";
import React, { useState } from "react";
import PageTitle from "./PageTitle";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "@/hooks/useSession";
import { useRouter } from 'next/navigation'
import { useCookies } from "next-client-cookies";
import { updateJob } from "@/app/actions/action";
import { PenLine, Save } from "lucide-react";

const UpdateJob = ({ jobId, job }: { jobId: string; job: Job }) => {
    const [jobName,setJobName] = useState(job.name)
    const [companyName,setCompanyName] = useState(job.company)
    const [jobSalary,setJobSalary] = useState(job.salary)
    const [jobExperience,setJobExperience] = useState(job.experience)
    const [jobRequirements,setJobRequirements] = useState(job.requirements)
    const [jobRemarks,setJobRemarks] = useState(job.remarks)
    const [jobLocation,setJobLocation] = useState(job.location)
    const [jobType,setJobType] = useState(job.type)
    const [jobDescription,setJobDescription] = useState(job.description)
  
    const session = useSession()
    const router = useRouter()
    const cookies = useCookies()
        
        
    if (!session) {
      router.push("/");
    cookies.remove('session-client')
    }

    if(!job) {
        throw new Error('No job found')
    }
  return (
    <div className="flex-1">
      <PageTitle title="Edit Job" className="mt-12" />

        <div  className="w-[800px] mx-auto   mt-12 flex flex-col gap-4">
     
        <Label htmlFor="company">Company name</Label>

        <Input
          name="company"
          id="company"
          required
          placeholder="Microsoft"
          value={companyName}
          onChange={(e)=> setCompanyName(e.target.value)}
        />
     
        <Label htmlFor="location">Location </Label>

        <Input
          name="location"
          id="location"
          required
          placeholder="Microsoft"
          value={jobLocation}
          onChange={(e)=> setJobLocation(e.target.value)}
        />
        <Label htmlFor="name">Job Name</Label>

        <Input
          name="name"
          id="name"
          required
          placeholder="C++ Developer"
          value={jobName}
          onChange={(e)=> setJobName(e.target.value)}
        />

        <Label htmlFor="amount">Monthly salary </Label>

        <Input
          type="number"
          name="salary"
          required
          id="amount"
          placeholder="10000"
          value={jobSalary}
          onChange={(e)=> setJobSalary(Number(e.target.value))}
        />
        <Label>Years of experience</Label>
        <Select name="experience" value={jobExperience} onValueChange={(e) => setJobExperience(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Years of experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">0 </SelectItem>
            <SelectItem value="0-2">0-2</SelectItem>
            <SelectItem value="2-5">2-5</SelectItem>
            <SelectItem value="5+">5+</SelectItem>
          </SelectContent>
        </Select>
        <Label>Job type</Label>
        <Select name="type" value={jobType} onValueChange={(e) => setJobType(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Years of experience" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value="full-time">Full-time </SelectItem>
            <SelectItem value="Student">Student</SelectItem>
            <SelectItem value="halfTime">Half-time</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="description">Description</Label>

        <Textarea
          name="description"
          id="description"
          placeholder="Strong background in Javascript , HTML , CSS , Bachelor degree in Computer Science or Software Engineering."
          rows={6}
          required
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Label htmlFor="remarks">Requirements</Label>

        <Textarea
          name="requirements"
          id="requirements"
          placeholder="Strong background in Javascript , HTML , CSS , Bachelor degree in Computer Science or Software Engineering."
          rows={6}
          required
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
        />
        <Label htmlFor="remarks">Remarks</Label>

        <Textarea
          name="remarks"
          id="remarks"
          placeholder="Young team of aspiring developers with exit opportunity and great people to learn from! , great working conditions and work life balance. "
          rows={6}
          required
          value={jobRemarks}
          onChange={(e) => setJobRemarks(e.target.value)}
        />
        
        <Button  className="mx-auto px-6 bg-green-500 hover:bg-green-500/65 transition-all duration-300 mt-2 font-bold flex items-center gap-2" onClick={() => updateJob(jobId,companyName,jobName,jobLocation,jobType, jobDescription,jobSalary,jobExperience,jobRequirements,jobRemarks)}>Save Changes <Save/></Button>
    </div>
    </div>
  )
}

export default UpdateJob;
