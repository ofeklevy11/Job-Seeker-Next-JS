import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { getSession } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PageTitle from "@/components/PageTitle";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createJob } from "@/app/actions/action";

const page = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  if (session.user.type !== "jobPoster") {
    redirect("/");
  }

  return (
    <div className="flex-1">
      <PageTitle title="Create Job" className="mt-12" />
      <form
        action={createJob}
        className="max-w-[500px] mx-auto mt-12 flex flex-col gap-4"
      >
        <Label htmlFor="company">Company name</Label>

        <Input name="company" id="company" required placeholder="Microsoft" />
        <Label htmlFor="location">Location </Label>

        <Input
          name="location"
          id="location"
          required
          placeholder="USA Chicago"
        />
        <Label htmlFor="name">Job Name</Label>

        <Input name="name" id="name" required placeholder="C++ Developer" />

        <Label htmlFor="amount">Monthly salary </Label>

        <Input
          type="number"
          name="salary"
          required
          id="amount"
          placeholder="10000"
        />
        <Label>Years of experience</Label>
        <Select name="experience" required>
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
        <Select name="type" required>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder="The type of job
"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time </SelectItem>
            <SelectItem value="Student">Student</SelectItem>
            <SelectItem value="halfTime">Half-time</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="requirements">Requirements</Label>

        <Textarea
          name="requirements"
          id="requirements"
          placeholder="Strong background in Javascript , HTML , CSS , Bachelor degree in Computer Science or Software Engineering."
          rows={6}
          required
        />
        <Label htmlFor="description">Job description</Label>

        <Textarea
          name="description"
          id="description"
          placeholder="Tech Innovations Inc. is at the forefront of cutting-edge technology solutions, dedicated to transforming industries and enhancing user experiences. We believe in fostering a collaborative environment where innovation thrives, and we are looking for talented individuals to join our dynamic team."
          rows={6}
          required
        />
        <Label htmlFor="remarks">Remarks</Label>

        <Textarea
          name="remarks"
          id="remarks"
          placeholder="Young team of aspiring developers with exit opportunity and great people to learn from! , great working conditions and work life balance. "
          rows={6}
          required
        />
        <Input
          className="hidden"
          readOnly
          name="creatorId"
          type="string"
          value={session.user.id}
        ></Input>
        <Button className="mx-auto px-6 mt-2 font-bold">submit</Button>
      </form>
    </div>
  );
};

export default page;
