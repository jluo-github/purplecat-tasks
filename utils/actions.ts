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
 console.log("userId: ", userId);
 // userId user_2c1jnlc5WVzLI9bwy02t49ZJMEU

 if (!userId) {
  redirect("/");
 }
 return userId;
}

export async function createTaskAction(
 values: CreateAndEditTaskType
): Promise<TaskType | null> {
 // promise to wait for 0.5 second:
 await new Promise((resolve) => setTimeout(resolve, 500));

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

export async function getAllTasksAction({
 search,
 taskStatus,
 page = 1,
 limit = 10,
}: GetAllTasksActionTypes): Promise<{
 tasks: TaskType[];
 count: number;
 page: number;
 totalPages: number;
}> {
 const userId = authenticateAndRedirect();

 try {
  let whereClause: Prisma.taskWhereInput = {
   clerkId: userId,
  };
  if (search) {
   whereClause = {
    ...whereClause,
    OR: [
     {
      title: {
       contains: search,
      },
     },
     {
      note: {
       contains: search,
      },
     },
    ],
   };
  }
  if (taskStatus && taskStatus !== "all") {
   whereClause = {
    ...whereClause,
    status: taskStatus,
   };
  }
  // page: 1, limit: 10
  const skip = (page - 1) * limit;

  const tasks: TaskType[] = await prisma.task.findMany({
   where: whereClause,
   skip,
   take: limit,
   orderBy: {
    createdAt: "desc",
   },
  });

  const count: number = await prisma.task.count({
   where: whereClause,
  });

  const totalPages = Math.ceil(count / limit);

  return { tasks, count, page, totalPages };
 } catch (error) {
  console.error(error);
  return { tasks: [], count: 0, page: 1, totalPages: 0 };
 }
}

export async function deleteTaskAction(id: string): Promise<TaskType | null> {
 const userId = authenticateAndRedirect();

 try {
  const task: TaskType = await prisma.task.delete({
   where: {
    id,
    clerkId: userId,
   },
  });

  return task;
 } catch (error) {
  return null;
 }
}

export async function getSingleTaskAction(
 id: string
): Promise<TaskType | null> {
 let task: TaskType | null = null;
 const userId = authenticateAndRedirect();

 try {
  task = await prisma.task.findUnique({
   where: {
    id,
    clerkId: userId,
   },
  });
 } catch (error) {
  task = null;
 }
 if (!task) {
  redirect("/tasks");
 }
 return task;
}

export async function updateTaskAction(
 id: string,
 values: CreateAndEditTaskType
): Promise<TaskType | null> {
 const userId = authenticateAndRedirect();

 try {
  const task: TaskType = await prisma.task.update({
   where: {
    id,
    clerkId: userId,
   },
   data: {
    ...values,
   },
  });
  return task;
 } catch (error) {
  return null;
 }
}

export async function getStatsAction(): Promise<{
 pending: number;
 interview: number;
 declined: number;
}> {
 const userId = authenticateAndRedirect();

 try {
  const stats = await prisma.task.groupBy({
   where: {
    clerkId: userId,
   },
   by: ["status"],
   _count: {
    status: true,
   },
  });
  // console.log(stats);
  const statsObject = stats.reduce((acc, curr) => {
   acc[curr.status] = curr._count.status;
   return acc;
  }, {} as Record<string, number>);

  const defaultStats = {
   pending: 0,
   declined: 0,
   interview: 0,
   ...statsObject,
  };
  return defaultStats;
 } catch (error) {
  redirect("/tasks");
 }
}

export async function getChartsDataAction(): Promise<
 Array<{ date: string; count: number }>
> {
 const userId = authenticateAndRedirect();
 const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
 try {
  const tasks = await prisma.task.findMany({
   where: {
    clerkId: userId,
    createdAt: {
     gte: sixMonthsAgo,
    },
   },
   orderBy: {
    createdAt: "asc",
   },
  });
  // console.log(tasks);

  let applicationsPerMonth = tasks.reduce((acc, task) => {
   const date = dayjs(task.createdAt).format("MMM YY");

   const existingEntry = acc.find((entry) => entry.date === date);

   if (existingEntry) {
    existingEntry.count += 1;
   } else {
    acc.push({ date, count: 1 });
   }

   return acc;
  }, [] as Array<{ date: string; count: number }>);

  return applicationsPerMonth;
 } catch (error) {
  redirect("/tasks");
 }
}
