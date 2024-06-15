"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  jobLength: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  jobLength,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex gap-2 my-12">
      <button
        className={`bg-blue-500 flex items-center gap-2 text-white p-3 rounded-lg font-bold hover:bg-blue-500/80 transition-all duration-300 ${
          !hasPrevPage && "bg-gray-500/50 font-normal hover:bg-gray-500/50"
        }`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `/job-seeker/?page=${Number(page) - 1}&per_page=${per_page}`
          );
        }}
      >
        <ArrowLeft /> prev page
      </button>

      <div className="flex items-center border rounded-full p-2 mx-2 bg-blue-500/80">
        {page} / {Math.ceil(jobLength / Number(per_page))}
      </div>

      <button
        className={`bg-blue-500 flex items-center gap-2 text-white p-3 rounded-lg font-bold hover:bg-blue-500/80 transition-all duration-300 ${
          !hasNextPage && "bg-gray-500/50 font-normal hover:bg-gray-500/50"
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `/job-seeker/?page=${Number(page) + 1}&per_page=${per_page}`
          );
        }}
      >
        next page <ArrowRight />
      </button>
    </div>
  );
};

export default PaginationControls;
