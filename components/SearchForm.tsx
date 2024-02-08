"use client";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "@/utils/types";

const SearchForm = () => {
 // set default values
 const searchParams = useSearchParams();
 const search = searchParams.get("search") || "";
 const taskStatus = searchParams.get("taskStatus") || "all";

 const router = useRouter();
 const pathname = usePathname();
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const search = formData.get("search") as string;
  const taskStatus = formData.get("taskStatus") as string;
  let params = new URLSearchParams();
  params.set("search", search);
  params.set("taskStatus", taskStatus);

  router.push(`${pathname}?${params.toString()}`);
 };

 return (
  <form
   className='bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg'
   onSubmit={handleSubmit}>
   <Input
    type='text'
    placeholder='Search Tasks'
    name='search'
    defaultValue={search}
   />
   <Select defaultValue={taskStatus} name='taskStatus'>
    <SelectTrigger>
     <SelectValue />
    </SelectTrigger>
    <SelectContent>
     {["all", ...Object.values(TaskStatus)].map((taskStatus) => {
      return (
       <SelectItem key={taskStatus} value={taskStatus}>
        {taskStatus}
       </SelectItem>
      );
     })}
    </SelectContent>
   </Select>
   <Button type='submit'>Search</Button>
  </form>
 );
};
export default SearchForm;
