"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/helpers";
import { revalidatePath } from "next/cache";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const type = formData.get("type") as string;
  if (!email || !password || !type) {
    throw new Error("password or email is invalid");
  }
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      type,
    },
  });
  redirect("/");
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("password or email is invalid");
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("No user found");
  }

  const match = bcrypt.compareSync(password, user.password);
  if (match) {
    const expires = new Date(Date.now() + 5000 * 1000);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });
    cookies().set("session-client", user.id, { expires });
  }

  redirect("/");
}

export async function createJob(formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const salary =
    formData.get("salary") !== null ? Number(formData.get("salary")) : 0;
  const requirements = formData.get("requirements") as string;
  const remarks = formData.get("remarks") as string;
  const experience = formData.get("experience") as string;
  const creatorId = formData.get("creatorId") as string;

  if (
    !name ||
    !salary ||
    !requirements ||
    !remarks ||
    !experience ||
    !creatorId ||
    !company
  ) {
    throw new Error("Please provide all fields");
  }

  await prisma.job.create({
    data: {
      company,
      name,
      location,
      type,
      description,
      salary,
      experience,
      requirements,
      remarks,

      creatorId,
    },
  });

  redirect("/job-poster/my-jobs");
}

export async function updateJob(
  jobId: string,
  companyName: string,
  jobName: string,
  jobLocation: string,
  jobType: string,
  jobDescription: string,
  jobSalary: number,
  jobExperience: string,
  jobRequirements: string,
  jobRemarks: string
) {
  if (
    !jobId ||
    !companyName ||
    !jobName ||
    !jobSalary ||
    !jobExperience ||
    !jobRequirements ||
    !jobRemarks ||
    !jobLocation ||
    !jobType ||
    !jobDescription
  ) {
    throw new Error("please provide all fields");
  }
  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      company: companyName,
      name: jobName,
      location: jobLocation,
      type: jobType,
      description: jobDescription,
      salary: jobSalary,
      experience: jobExperience,
      requirements: jobRequirements,
      remarks: jobRemarks,
    },
  });
  redirect("/job-poster/my-jobs");
}

export async function deleteJob(id: string) {
  if (!id) {
    throw new Error("This job cannot be found.");
  }

  await prisma.job.delete({
    where: {
      id,
    },
  });

  revalidatePath("/job-poster/my-jobs");
}

export async function sendApplication(
  userId: string,
  jobId: string,
  remarks: string = "No remark added by applicator.",
  email:string,
  phoneNumber:string,
Name:string
) {
  if (!jobId || !userId) {
    throw new Error("Error sending application please try again later.");
  }

  await prisma.jobApplication.create({
    data: {
      userId,
      jobId,
      remarks,
      email,
      phoneNumber,
      name:Name
    },
  });

  revalidatePath("/job-seeker");
}

export async function deleteApplication(id:string){
  if(!id) {
    throw new Error('Cannot delete this application please try again later.')
  }
  await prisma.jobApplication.delete({
    where:{
      id
    }
  })

  revalidatePath(`/job-poster/my-jobs/applications/${id}`)
}

export async function submitContact(formData:FormData){
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  await prisma.contact.create({
    data:{
      name,
      email,
      phoneNumber:phone,
      message
    }
  })

  redirect('/job-seeker')
}

