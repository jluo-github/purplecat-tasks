"use client";
import TaskCard from "./TaskCard";
import { useSearchParams } from "next/navigation";
import { getAllTasksAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ButtonContainer from "./ButtonContainer";
import ComplexButtonContainer from "./ComplexButtonContainer";
import { redirect } from "next/navigation";

const TasksList = () => {
 const searchParams = useSearchParams();

 const search = searchParams.get("search") || "";
 const taskStatus = searchParams.get("taskStatus") || "all";
 const pageNumber = Number(searchParams.get("page")) || 1;

 const { data, isPending } = useQuery({
  queryKey: ["tasks", search ?? "", taskStatus, pageNumber],

  queryFn: () =>
   getAllTasksAction({
    search,
    taskStatus,
    page: pageNumber,
   }),
 });

 const tasks = data?.tasks || [];

 const count = data?.count || 0;
 const page = data?.page || 0;
 const totalPages = data?.totalPages || 0;

 if (isPending) return <h2 className='text-xl'>Please Wait...</h2>;

 if (tasks.length < 1) {
  // redirect("/add-task");
  <h2 className='text-xl'>No tasks found, please create one.</h2>;
 }

 return (
  <>
   {" "}
   <div className='flex items-center justify-between mb-8'>
    <h2 className='text-lg font-semibold capitalize '>
     {count} {count === 0 ? "task found, please create one." : "tasks found"}
    </h2>
    {totalPages < 2 ? null : (
     <ButtonContainer currentPage={page} totalPages={totalPages} />
     //  <ComplexButtonContainer currentPage={page} totalPages={totalPages} />
    )}
   </div>
   {/*button: */}
   <div className='grid md:grid-cols-2  gap-8'>
    {tasks.map((task) => {
     return <TaskCard key={task.id} task={task} />;
    })}
   </div>
  </>
 );
};
export default TasksList;
