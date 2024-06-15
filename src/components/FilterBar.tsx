"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Label } from "./ui/label";
import PageTitle from "./PageTitle";
import useDebounce from "@/hooks/useDebounce";

const FilterBar = () => {
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500); // Debounce for 1500ms

  const [location, setLocation] = useState("");
  const debouncedLocation = useDebounce(location, 500); // Debounce for 1500ms

  const [greaterThan, setGreaterThan] = useState(0);
  const debouncedGreaterThan = useDebounce(greaterThan, 500); // Debounce for 1500ms

  const [lessThan, setLessThan] = useState(100000);
  const debouncedLessThan = useDebounce(lessThan, 500); // Debounce for 1500ms

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  useEffect(() => {
    router.push(
      `/job-seeker/?page=${Number(
        page
      )}&per_page=${per_page}&jobType=${jobType}&experience=${experience}&search=${search}&location=${location}&lessThan=${lessThan}&greaterThan=${greaterThan}`
    );
  }, [jobType, experience, debouncedSearch, debouncedLocation, debouncedLessThan, debouncedGreaterThan]);
  //   const jobType = searchParams['jobType'] ?? 'full-time'

  return (
    <>
    <PageTitle title="Filter" className="mb-4"/>
    <div className="flex gap-6 flex-wrap justify-center rounded-lg border py-8">
      <div className="flex items-center gap-2">
        <Label className="mb-5">Select Job Type</Label>
        <Select onValueChange={(e) => setJobType(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="full-time">Full-Time</SelectItem>
            <SelectItem value="Student">Student</SelectItem>
            <SelectItem value="halfTime">Half-Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
    <Label 
    className="mb-5">Select Years of experience</Label>
      <Select onValueChange={(e) => setExperience(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Years Of Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="0">0</SelectItem>
          <SelectItem value="0-2">0-2</SelectItem>
          <SelectItem value="2-5">2-5</SelectItem>
          <SelectItem value="5+">5+</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <div className="flex items-center ">
        <Label className="mb-2">Search Job Name</Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search For Job Name"
        />
      </div>
      <div className="flex items-center">
      <Label className="mb-2">Search Job Location</Label>

        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search For Location"
        />
      </div>
      <div className="flex items-center gap-2">
      <Label className="mb-5">Monthly Salary Less Than</Label>

        <Input
          type="number"
          value={lessThan}
          onChange={(e) => setLessThan(Number(e.target.value))}
          placeholder="Salary Greater Than"
          className="w-24"
        />
      </div>
      <div className="flex items-center gap-2">
      <Label className="mb-5">Monthly Salary Greater Than</Label>

        <Input
          type="number"
          value={greaterThan}
          onChange={(e) => setGreaterThan(Number(e.target.value))}
          placeholder="Salary Greater Than"
          className="w-24"
        />
      </div>
    </div>
    </>
  );
};

export default FilterBar;
