import { ScanEye } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="text-2xl font-bold flex items-center  ">
      Job<span className="text-teal-500  ">Seeker </span>
      <ScanEye className="ml-1 h-10 w-10 text-teal-500" />
    </Link>
  );
};

export default Logo;
