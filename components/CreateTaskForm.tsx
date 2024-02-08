"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import {
 TaskStatus,
 TaskMode,
 createAndEditTaskSchema,
 CreateAndEditTaskType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "./FormComponents";

const CreateTaskForm = () => {
 // 1. Define your form.
 const form = useForm<CreateAndEditTaskType>({
  resolver: zodResolver(createAndEditTaskSchema),

  defaultValues: {
   title: "",
   note: "",
   location: "",
   status: TaskStatus.Pending,
   mode: TaskMode.Urgent,
  },
 });

 const queryClient = useQueryClient();
 const { toast } = useToast();
 const router = useRouter();

 const { mutate, isPending } = useMutation({
  mutationFn: (values: CreateAndEditTaskType) => createTaskAction(values),

  onSuccess: (data) => {
   if (!data) {
    // alert("there was an error");
    toast({
     description: "there was an error",
    });
    return;
   }
   // alert("task created");
   toast({ description: "task created" });
   queryClient.invalidateQueries({ queryKey: ["tasks"] });
   queryClient.invalidateQueries({ queryKey: ["stats"] });
   queryClient.invalidateQueries({ queryKey: ["charts"] });

   router.push("/tasks");
   // form.reset();
  },
 });

 // 2. Define a submit handler.
 function onSubmit(values: CreateAndEditTaskType) {
  mutate(values);
  // console.log(values);
 }

 return (
  <Form {...form}>
   <form
    className='bg-muted p-8 rounded'
    onSubmit={form.handleSubmit(onSubmit)}>
    <h2 className='capitalize font-semibold text-4xl mb-6'>Add Task</h2>

    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3  items-start'>
     {/*  */}
     {/* position */}
     <CustomFormField name='title' control={form.control} />
     {/* company */}
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
      {isPending ? "Loading..." : "Create Task"}
     </Button>
    </div>
   </form>
  </Form>
 );
};
export default CreateTaskForm;
