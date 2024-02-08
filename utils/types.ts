import * as z from "zod";

export type TaskType = {
 id: string;
 createdAt: Date;
 updatedAt: Date;
 clerkId: string;
 title: string;
 note: string;
 location: string;
 status: string;
 mode: string;
};

export enum TaskStatus {
 Pending = "pending",
 Completed = "completed",
 Canceled = "canceled",
}

export enum TaskMode {
 Urgent = "urgent",
 Important = "important",
 Standard = "standard",
}

export const createAndEditTaskSchema = z.object({
 title: z.string().min(2, {
  message: "title must be at least 2 characters.",
 }),
 note: z.string().min(2, {
  message: "note must be at least 2 characters.",
 }),
 location: z.string().min(2, {
  message: "location must be at least 2 characters.",
 }),
 status: z.nativeEnum(TaskStatus),
 mode: z.nativeEnum(TaskMode),
});

export type CreateAndEditTaskType = z.infer<typeof createAndEditTaskSchema>;
