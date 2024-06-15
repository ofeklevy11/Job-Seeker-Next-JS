"use client";
import React from "react";
import PageTitle from "./PageTitle";
import Link from "next/link";
import { CirclePlus, Network, Pencil, UserCheck, UserCircle, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import SignOut from "./SignOut";

const CreatorPanel = () => {
  
  const pathname = usePathname();
  const jobPosterLinks = [
    {
      href: "/job-poster/create-job",
      label: "Create Job",
      icon: <CirclePlus />,
    },
    {
      href: "/job-poster/edit-job",
      label: "Edit Job",
      icon: <Pencil />,
    },
    {
      href: "/job-poster/my-jobs",
      label: "My Jobs",
      icon: <Network />,
    },
    {
      href: "/job-poster/my-jobs/applications",
      label: "All Applications",
      icon: <UserPlus />,
    },
    {
      href: "/job-seeker/my-profile",
      label: "My Profile",
      icon: <UserCircle />,
    },
  ];
  return (
    <nav className="w-[300px] bg-blue-500/35 px-6 flex flex-col gap-8  py-12 h-screen  ">
        <Logo />
      <PageTitle title="Creator Panel" className="text-3xl" />
      {jobPosterLinks.map(({ href, label, icon }) => (
        <Link
          key={label}
          className={cn(
            "flex gap-4 items-center text-xl font-semibold border rounded-lg bg-teal-500/25 hover:bg-teal-500/80 p-4 transition-all duration-300",
            pathname === href ? "bg-teal-500/80" : ""
          )}
          href={href}
        >
          {label} {icon}
        </Link>
      ))}
      
    </nav>
  );
};

export default CreatorPanel;
