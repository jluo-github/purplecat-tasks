"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
 TaskStatus,
 TaskMode,
 createAndEditTaskSchema,
 CreateAndEditTaskType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "./FormComponents";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getSingleTaskAction, updateTaskAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const EditTaskForm = ({ taskId }: { taskId: string }) => {
 const queryClient = useQueryClient();
 const { toast } = useToast();
 const router = useRouter();

 const { data } = useQuery({
  queryKey: ["task", taskId],
  queryFn: () => getSingleTaskAction(taskId),
 });

 const { mutate, isPending } = useMutation({
  mutationFn: (values: CreateAndEditTaskType) =>
   updateTaskAction(taskId, values),
  onSuccess: (data) => {
   if (!data) {
    toast({
     description: "there was an error",
    });
    return;
   }
   toast({ description: "task updated" });
   queryClient.invalidateQueries({ queryKey: ["tasks"] });
   queryClient.invalidateQueries({ queryKey: ["task", taskId] });
   queryClient.invalidateQueries({ queryKey: ["stats"] });
   router.push("/tasks");
   // form.reset();
  },
 });

 // 1. Define form.
 const form = useForm<CreateAndEditTaskType>({
  resolver: zodResolver(createAndEditTaskSchema),
  defaultValues: {
   title: data?.title || "",
   note: data?.note || "",
   location: data?.location || "",
   status: (data?.status as TaskStatus) || TaskStatus.Pending,
   mode: (data?.mode as TaskMode) || TaskMode.Urgent,
  },
 });

 // 2. Define a submit handler.
 function onSubmit(values: CreateAndEditTaskType) {
  mutate(values);
 }

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onSubmit)}
    className='bg-muted p-8 rounded'>
    <h2 className='capitalize font-semibold text-4xl mb-6'>edit task</h2>
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
     {/* title */}
     <CustomFormField name='title' control={form.control} />
     {/* note */}
     <CustomFormField name='note' control={form.control} />
     {/* location */}
     <CustomFormField name='location' control={form.control} />

     {/* task status */}
     <CustomFormSelect
      name='status'
      control={form.control}
      labelText='task status'
      items={Object.values(TaskStatus)}
     />
     {/* task  type */}
     <CustomFormSelect
      name='mode'
      control={form.control}
      labelText='task mode'
      items={Object.values(TaskMode)}
     />

     <Button type='submit' className='self-end capitalize' disabled={isPending}>
      {isPending ? "Updating..." : "Edit Task"}
     </Button>
    </div>
   </form>
  </Form>
 );
};
export default EditTaskForm;
