"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs";
import {
 TaskType,
 CreateAndEditTaskType,
 createAndEditTaskSchema,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

function authenticateAndRedirect(): string {
 const { userId } = auth();
 console.log("userId", userId);
 // userId user_2c1jnlc5WVzLI9bwy02t49ZJMEU

 if (!userId) {
  redirect("/");
 }
 return userId;
}

export async function createTaskAction(
 values: CreateAndEditTaskType
): Promise<TaskType | null> {
 await new Promise((resolve) => setTimeout(resolve, 1000));
 const userId = authenticateAndRedirect();
 try {
  createAndEditTaskSchema.parse(values);
  const task: TaskType = await prisma.task.create({
   data: {
    ...values,

    clerkId: userId,
   },
  });
  return task;
 } catch (error) {
  console.error(error);
  return null;
 }
}

type GetAllTasksActionTypes = {
 search?: string;
 taskStatus?: string;
 page?: number;
 limit?: number;
};
