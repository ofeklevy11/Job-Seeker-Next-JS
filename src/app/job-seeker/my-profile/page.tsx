import PageTitle from "@/components/PageTitle";
import SignOut from "@/components/SignOut";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/db";
import { getSession } from "@/lib/helpers";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }
  return (
    <div>
      <PageTitle title="My Profile" />
      <div className="rounded-lg border p-12 mt-12  grid grid-cols-4 gap-12">
        <div className=" flex flex-col gap-2 border rounded-lg p-6">
          <Label className="text-lg font-semi">User email: </Label>
          {user.email}
        </div>
        <div className=" flex flex-col gap-2 border rounded-lg p-6">
          <Label className="text-lg font-semi">User Type: </Label>
          {user.type}
        </div>
        <div className=" flex flex-col gap-2 border rounded-lg p-6">
          <Label className="text-lg font-semi">User Name: </Label>
          {user.name}
        </div>
        <div className=" flex flex-col gap-2 border rounded-lg p-6">
          <Label className="text-lg font-semi">
            SignUp Date:
          </Label>
          {`User Created On: ${user.createdAt.toLocaleDateString()} ${user.createdAt.toLocaleTimeString()}`}{" "}
        </div>

      </div>
        <SignOut/>
    </div>
  );
};

export default page;
