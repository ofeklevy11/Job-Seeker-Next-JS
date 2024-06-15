"use client";
import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";
import {
  BookCheck,
  CirclePlus,
  CircleUser,
  MessagesSquare,
  Network,
  Pencil,
  UserCheck,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const JobSeekerNav = ({ userType }: { userType: string }) => {
  
  const pathname = usePathname();
  const jobPosterLinks = [
    {
      href: "/job-seeker",
      label: "Find Job",
      icon: <CirclePlus />,
    },
    {
      href: "/job-seeker/my-applications",
      label: "My Applications",
      icon: <BookCheck />,
    },
    {
      href: "/job-seeker/contact-us",
      label: "Contact Us",
      icon: <MessagesSquare />,
    },
    {
      href: "/job-seeker/my-profile",
      label: "My Profile",
      icon: <CircleUser />,
    },
  ];
  return (
    <nav className=" bg-blue-500/35 px-6 flex   gap-6  py-4 mb-12 rounded-lg mt-4 ">
      <Logo />
      {jobPosterLinks.map(({ href, label, icon }) => (
        <Link
          key={label}
          className={cn(
            "flex gap-3 items-center text-lg font-semibold  hover:text-teal-500 p-2 px-4 transition-all duration-300",
            pathname === href ? "font-extrabold text-teal-500" : ""
          )}
          href={href}
        >
          {label} {icon}
        </Link>
      ))}
      {userType === "jobPoster" ? (
        <Link
          href={"/job-poster/create-job"}
          className={
            "flex gap-3 items-center text-lg font-semibold  hover:text-teal-500 p-2 px-4 transition-all duration-300"
          }
        >Creator Panel <UserCheck/></Link>
      ) : null}
    </nav>
  );
};

export default JobSeekerNav;
